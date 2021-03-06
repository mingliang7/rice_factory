// Declare template
var saleItemTpl = Template.rice_saleItem;

// SaleItems StateItem
saleItemsState = new ReactiveList();
StateItem = new ReactiveObj({
  qty: 0,
  price: 0,
  discount: 0,
  subDiscount: 0,
  cost: 0,
  exchange: 0,
  cssClassForAddMore: 'disabled'
});

/**
 * SaleItems
 */

saleItemTpl.onCreated(function() {
  saleItemsState.clear();
  // Check form type
  var data = Template.currentData();
  if (!_.isUndefined(data)) {
    _.each(data.saleItems, function(obj, key) {
      obj.indexName = 'saleItems.' + key + '.saleItemId';
      obj.indexCate = 'saleItems.' + key + '.saleCategoryId';
      obj.indexQty = 'saleItems.' + key + '.qty';
      obj.indexCost = 'saleItems.' + key + '.cost';
      obj.indexLineCost = 'saleItems.' + key + '.lineCost';
      obj.indexPrice = 'saleItems.' + key + '.price';
      obj.indexAmount = 'saleItems.' + key + '.amount';
      obj.indexDiscount = 'saleItems.' + key + '.discount';
      saleItemsState.insert(obj.saleItemId, obj);
    });
  }
});

saleItemTpl.onRendered(function() {
  saleItemsInputmask();
  var list = []
  var tmpId = {};
  var tmpArr = {};
  var result = Rice.Collection.SaleItem.find({}, {
    sort: {
      saleCategoryId: 1
    }
  }).fetch();
  result.forEach(function(item) {
    if (_.isUndefined(tmpArr[item.saleCategoryId])) {
      tmpArr[item.saleCategoryId] = [];
    }
    tmpId[item.saleCategoryId] = {
      text: getCategoryName(item.saleCategoryId),
      children: getItem(tmpArr[item.saleCategoryId], item)
    }
  });
  for (var k in tmpId) {
    list.push(tmpId[k])
  }
  $('[name="tmpName"]').select2({
    data: list
  });
});

saleItemTpl.helpers({
  tmpAmount: function() {
    var discount = StateItem.get('discount');
    var tmpAmountVal = 0;
    if (discount == 0) {
      tmpAmountVal = math.round(StateItem.get('qty') * StateItem.get(
        'price'), 2);

    } else {
      var price = StateItem.get('price');
      var qty = StateItem.get('qty');
      var amount = math.round(price * qty, 2);
      tmpAmountVal = math.round(amount - ((price * qty) * discount / 100),
        2);
    }
    return tmpAmountVal;
  },
  tmpLineCost: function() {
    var cost = StateItem.get('cost');
    var qty = StateItem.get('qty');
    return qty * cost;
  },
  cssClassForAddMore: function() {
    var tmpAmountVal = math.round(StateItem.get('qty') * StateItem.get(
      'price'), 2);
    if (tmpAmountVal > 0) {
      StateItem.set('cssClassForAddMore', '');
    } else {
      StateItem.set('cssClassForAddMore', 'disabled');
    }

    return StateItem.get('cssClassForAddMore');
  },
  saleItems: function() {
    return saleItemsState.fetch();
  },
  subTotal: function() {
    var totalVal = 0;
    _.each(saleItemsState.fetch(), function(o) {
      totalVal += o.amount;
    });
    if (totalVal) {
      return totalVal;
    }
  },
  total: function() {
    var totalVal = 0;
    var subDiscount = StateItem.get('subDiscount');
    if (subDiscount == 0) {
      _.each(saleItemsState.fetch(), function(o) {
        totalVal += o.amount;
      });
    } else {
      _.each(saleItemsState.fetch(), function(o) {
        totalVal += o.amount;
      });
      totalVal = totalVal - subDiscount;
    }

    return totalVal;
  },
  profit: function() {
    var totalLineCost = 0;
    var totalVal = 0;
    var subDiscount = StateItem.get('subDiscount');
    if (subDiscount == 0) {
      _.each(saleItemsState.fetch(), function(o) {
        totalVal += o.amount;
        totalLineCost += o.lineCost;
      });
      return totalVal - totalLineCost;
    } else {
      _.each(saleItemsState.fetch(), function(o) {
        totalVal += o.amount;
        totalLineCost += o.lineCost;
      });
      return (totalVal - totalLineCost) - subDiscount;
    }

  },
  exchange: function() {
    var exchangeObj = StateItem.get('exchange');
    fx.base = exchangeObj.base;
    fx.rates = exchangeObj.rates;
    var totalInDollar = 0;
    var totalVal = 0;
    var subDiscount = StateItem.get('subDiscount');
    if (subDiscount == 0) {
      _.each(saleItemsState.fetch(), function(o) {
        totalVal += o.amount;
      });
    } else {
      _.each(saleItemsState.fetch(), function(o) {
        totalVal += o.amount;
      });
      totalVal = totalVal - subDiscount;
    }
    totalInKhmer = fx.convert(totalVal, {
      from: 'USD',
      to: 'KHR'
    });
    totalInBath = fx.convert(totalVal, {
      from: 'USD',
      to: 'THB'
    });
    if (totalVal !== 0) {
      khmer = math.round(totalInKhmer, 2);
      bath = math.round(totalInBath, 2);
      return 'KHR: ' + numeral(khmer).format('0,0') + '<br>THB: ' +
        numeral(bath).format('0,0');
    }
  },
  getItem: function(id) {
    var item = Rice.Collection.SaleItem.findOne(id);
    return item._id + ' | ' + item.name;
  }
});

saleItemTpl.events({
  'change [name="tmpName"]': function(e) {
    var id = $(e.currentTarget).val();
    var item = Rice.Collection.SaleItem.findOne(id);
    $('[name="tmpCate"]').val(id.slice(0, 3));
    $('[name="tmpPrice"]').val(item.price);
    $('[name="tmpCost"]').val(item.cost);
    StateItem.set('price', item.price);
    StateItem.set('cost', item.cost);
    var exchange = Cpanel.Collection.Exchange.findOne({}, {
      sort: {
        dateTime: -1
      }
    });
    setTimeout(function() {
      $('[name="exchange"]').select2('val', exchange._id);
      StateItem.set('exchange', exchange);
    }, 200);
  },
  'keyup [name="tmpQty"]': function(e, t) {
    var qty = t.$('[name="tmpQty"]').val();
    qty = _.isEmpty(qty) ? 0 : parseFloat(qty);

    StateItem.set('qty', qty);
  },
  'keyup [name="tmpPrice"]': function(e, t) {
    var price = t.$('[name="tmpPrice"]').val();
    price = _.isEmpty(price) ? 0 : parseFloat(price);

    StateItem.set('price', price);
  },
  'keyup [name="tmpDiscount"]': function(e) {
    var discount = $(e.currentTarget).val();
    discount = _.isEmpty(discount) ? 0 : parseFloat(discount);
    StateItem.set('discount', discount);
  },
  'click .addSaleItem': function(e, t) {
    var index = 0;
    var saleItem = {};
    saleItem.name = t.$('[name="tmpName"]').val();
    saleItem.saleCategoryId = t.$('[name="tmpCate"]').val();
    saleItem.tmpName = t.$('[name="tmpName"]').select2('data').text;
    saleItem.qty = parseFloat(t.$('[name="tmpQty"]').val());
    saleItem.cost = math.round(parseFloat(t.$('[name="tmpCost"]').val()),
      2);
    saleItem.price = math.round(parseFloat(t.$('[name="tmpPrice"]').val()),
      2);
    saleItem.amount = math.round(parseFloat(t.$('[name="tmpAmount"]').val()),
      2);
    saleItem.lineCost = math.round(parseFloat(t.$(
        '[name="tmpLineCost"]')
      .val()), 2);
    var discount = t.$('[name="tmpDiscount"]').val();
    var subDiscount = $('[name="subDiscount"]').val();
    if (subDiscount != '') {
      subDiscount = parseFloat(subDiscount);
      StateItem.set('subDiscount', subDiscount);
    }
    if (discount == '') {
      saleItem.discount = 0
    } else {
      saleItem.discount = parseFloat(discount);
    }
    // Check saleItems exist
    if (saleItemsState.length() > 0) {
      // Check duplicate
      var duplicate = saleItemsState.get(saleItem.name);
      if (!_.isUndefined(duplicate)) {
        saleItem.qty = duplicate.qty + saleItem.qty;
        saleItem.amount = math.round(saleItem.qty * saleItem.price, 2);
        saleItem.lineCost = math.round(saleItem.qty * saleItem.cost, 2);
        saleItemsState.update(saleItem.name, {
          qty: saleItem.qty,
          price: saleItem.price,
          amount: saleItem.amount,
          lineCost: saleItem.lineCost
        });

        return false;
      } else {
        index = saleItemsState.last().index + 1;
      }
    }

    saleItem.indexName = 'saleItems.' + index + '.saleItemId';
    saleItem.indexCate = 'saleItems.' + index + '.saleCategoryId';
    saleItem.indexQty = 'saleItems.' + index + '.qty';
    saleItem.indexPrice = 'saleItems.' + index + '.price';
    saleItem.indexCost = 'saleItems.' + index + '.cost';
    saleItem.indexDiscount = 'saleItems.' + index + '.discount';
    saleItem.indexAmount = 'saleItems.' + index + '.amount';
    saleItem.indexLineCost = 'saleItems.' + index + '.lineCost';


    saleItemsState.insert(saleItem.name, saleItem);
  },
  'blur .addSaleItem': function(e, t) {
    saleItemsInputmask();
  },
  'click .removeSaleItem': function(e, t) {
    var self = this;
    if (_.isUndefined(self.name)) {
      saleItemsState.remove(self.saleItemId);
    } else {
      saleItemsState.remove(self.name);
    }
    var subDiscount = $('[name="subDiscount"]').val();
    if (subDiscount != '') {
      subDiscount = parseFloat(subDiscount);
      StateItem.set('subDiscount', subDiscount);
    }
  },
  'keyup .qty': function(e, t) {
    var current = $(e.currentTarget);
    var name = current.parents('div.row.sale-list').find('.name').val();
    var getSaleItem = saleItemsState.get(name);

    console.log(name);
    console.log(getSaleItem);
    var qty = parseFloat(current.val());
    var amount = math.round(qty * getSaleItem.price, 2);
    var lineCost = math.round(qty * getSaleItem.cost, 2);
    saleItemsState.update(name, {
      qty: qty,
      amount: amount,
      lineCost: lineCost
    });
  },
  'keyup .price': function(e, t) {
    var current = $(e.currentTarget);
    var name = current.parents('div.row.sale-list').find('.name').val();
    var getSaleItem = saleItemsState.get(name);

    console.log(name);

    var price = parseFloat(current.val());
    var amount = math.round(getSaleItem.qty * price, 2);
    saleItemsState.update(name, {
      price: price,
      amount: amount
    });
  },
  'keyup .discount': function(e, t) {
    var current = $(e.currentTarget);
    var name = current.parents('div.row.sale-list').find('.name').val();
    var getSaleItem = saleItemsState.get(name);

    console.log(name);
    var discount = current.val();
    var totalAmount = getSaleItem.qty * getSaleItem.price;
    discount = discount == '' ? 0 : parseFloat(discount);
    var amount = math.round(totalAmount - (totalAmount * discount / 100),
      2);
    saleItemsState.update(name, {
      amount: amount,
      discount: discount
    });
  },
  'keyup [name="subDiscount"]': function(e) {
    var value = $(e.currentTarget).val();
    value = value == '' ? 0 : parseFloat(value);
    StateItem.set('subDiscount', value);
  }
});

/**
 * Input mask
 */
var saleItemsInputmask = function() {
  var tmpQty = $('[name="tmpQty"]');
  var tmpPrice = $('[name="tmpPrice"]');
  var tmpAmount = $('[name="tmpAmount"]');
  var tmpDiscount = $('[name="tmpDiscount"]');

  var qty = $('.qty');
  var price = $('.price');
  var amount = $('.amount');
  var total = $('[name="total"]');
  var subTotal = $('[name="subTotal"]');
  var totalInDollar = $('[name="totalInDollar"]');
  Inputmask.currency([tmpPrice, tmpAmount, price, amount, total, subTotal], {
    prefix: '$ '
  });
  Inputmask.currency([totalInDollar], {
    prefix: '$ '
  });
  Inputmask.decimal([tmpQty, qty]);
  Inputmask.percentage(tmpDiscount);
};

var getCategoryName = function(id) {
  return Rice.Collection.SaleCategory.findOne(id).name;
};

var getItem = function(arr, item) {
  var unit = Rice.Collection.Unit.findOne(item.unit).shortName;
  arr.push({
    id: item._id,
    text: item._id + ' | ' + item.name + ' (' + unit + ')'
  });
  return arr;
};
