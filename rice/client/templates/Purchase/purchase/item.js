// Declare template
var purchaseItemTpl = Template.rice_purchaseItem;

// PurchaseItems StateItem
purchaseItemsState = new ReactiveList();
StateItem = new ReactiveObj({
  qty: 0,
  price: 0,
  discount: 0,
  subDiscount: 0,
  exchange: 0,
  cssClassForAddMore: 'disabled'
});

/**
 * PurchaseItems
 */

purchaseItemTpl.onCreated(function() {
  purchaseItemsState.clear();
  // Check form type
  var data = Template.currentData();
  if (!_.isUndefined(data)) {
    _.each(data.purchaseItems, function(obj, key) {
      obj.indexName = 'purchaseItems.' + key + '.purchaseItemId';
      obj.indexCate = 'purchaseItems.' + key + '.purchaseCategoryId';
      obj.indexQty = 'purchaseItems.' + key + '.qty';
      obj.indexPrice = 'purchaseItems.' + key + '.price';
      obj.indexAmount = 'purchaseItems.' + key + '.amount';
      obj.indexDiscount = 'purchaseItems.' + key + '.discount';
      purchaseItemsState.insert(obj.purchaseItemId, obj);
    });
  }
});

purchaseItemTpl.onRendered(function() {
  purchaseItemsInputmask();
  var list = []
  var tmpId = {};
  var tmpArr = {};
  var result = Rice.Collection.PurchaseItem.find({}, {
    sort: {
      purchaseCategoryId: 1
    }
  }).fetch();
  result.forEach(function(item) {
    if (_.isUndefined(tmpArr[item.purchaseCategoryId])) {
      tmpArr[item.purchaseCategoryId] = [];
    }
    tmpId[item.purchaseCategoryId] = {
      text: getCategoryName(item.purchaseCategoryId),
      children: getItem(tmpArr[item.purchaseCategoryId], item)
    }
  });
  for (var k in tmpId) {
    list.push(tmpId[k])
  }
  $('[name="tmpName"]').select2({
    data: list
  });
});

purchaseItemTpl.helpers({
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
        2)
    }
    return tmpAmountVal;
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
  purchaseItems: function() {
    return purchaseItemsState.fetch();
  },
  subTotal: function() {
    var totalVal = 0;
    _.each(purchaseItemsState.fetch(), function(o) {
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
      _.each(purchaseItemsState.fetch(), function(o) {
        totalVal += o.amount;
      });
    } else {
      _.each(purchaseItemsState.fetch(), function(o) {
        totalVal += o.amount;
      });
      totalVal = totalVal - subDiscount;
    }

    return totalVal;
  },
  exchange: function() {
    var exchangeObj = StateItem.get('exchange');
    fx.base = exchangeObj.base;
    fx.rates = exchangeObj.rates;
    var totalInDollar = 0;
    var totalVal = 0;
    var subDiscount = StateItem.get('subDiscount');
    if (subDiscount == 0) {
      _.each(purchaseItemsState.fetch(), function(o) {
        totalVal += o.amount;
      });
    } else {
      _.each(purchaseItemsState.fetch(), function(o) {
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
      khmer = numeral(math.round(totalInKhmer, 2)).format('0,0');
      bath = numeral(math.round(totalInBath, 2)).format('0,0');
      return 'KHR: ' + khmer + '<br>' + 'THB: ' + bath;
    }
  },
  getItem: function(id) {
    var item = Rice.Collection.PurchaseItem.findOne(id);
    return item._id + ' | ' + item.name;
  }
});

purchaseItemTpl.events({
  'change [name="tmpName"]': function(e) {
    var id = $(e.currentTarget).val();
    var item = Rice.Collection.PurchaseItem.findOne(id);
    $('[name="tmpCate"]').val(id.slice(0, 3));
    $('[name="tmpPrice"]').val(item.price);
    StateItem.set('price', item.price);
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
    qty = _.isEmpty(qty) ? 0 : parseInt(qty);

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

    StateItem.set('discount', discount)
  },
  'click .addPurchaseItem': function(e, t) {
    var index = 0;
    var purchaseItem = {};
    purchaseItem.name = t.$('[name="tmpName"]').val();
    purchaseItem.purchaseCategoryId = t.$('[name="tmpCate"]').val();
    purchaseItem.tmpName = t.$('[name="tmpName"]').select2('data').text;
    purchaseItem.qty = parseFloat(t.$('[name="tmpQty"]').val());
    purchaseItem.price = math.round(parseFloat(t.$('[name="tmpPrice"]').val()),
      2);
    purchaseItem.amount = math.round(parseFloat(t.$('[name="tmpAmount"]')
      .val()));
    purchaseItem.lineCost = math.round(parseFloat(t.$(
        '[name="tmpLineCost"]')
      .val()));
    var discount = t.$('[name="tmpDiscount"]').val();
    var subDiscount = $('[name="subDiscount"]').val()
    if (subDiscount != '') {
      subDiscount = parseFloat(subDiscount);
      StateItem.set('subDiscount', subDiscount);
    }
    if (discount == '') {
      purchaseItem.discount = 0
    } else {
      purchaseItem.discount = parseFloat(discount);
    }
    // Check purchaseItems exist
    if (purchaseItemsState.length() > 0) {
      // Check duplicate
      var duplicate = purchaseItemsState.get(purchaseItem.name);
      if (!_.isUndefined(duplicate)) {
        purchaseItem.qty = duplicate.qty + purchaseItem.qty;
        purchaseItem.amount = math.round(purchaseItem.qty * purchaseItem.price,
          2);

        purchaseItemsState.update(purchaseItem.name, {
          qty: purchaseItem.qty,
          price: purchaseItem.price,
          amount: purchaseItem.amount,
          lineCost: purchaseItem.lineCost
        });

        return false;
      } else {
        index = purchaseItemsState.last().index + 1;
      }
    }

    purchaseItem.indexName = 'purchaseItems.' + index + '.purchaseItemId';
    purchaseItem.indexCate = 'purchaseItems.' + index +
      '.purchaseCategoryId';
    purchaseItem.indexQty = 'purchaseItems.' + index + '.qty';
    purchaseItem.indexPrice = 'purchaseItems.' + index + '.price';
    purchaseItem.indexDiscount = 'purchaseItems.' + index + '.discount';
    purchaseItem.indexAmount = 'purchaseItems.' + index + '.amount';
    purchaseItem.indexLineCost = 'purchaseItems.' + index + '.lineCost';


    purchaseItemsState.insert(purchaseItem.name, purchaseItem);
  },
  'blur .addPurchaseItem': function(e, t) {
    purchaseItemsInputmask();
  },
  'click .removePurchaseItem': function(e, t) {
    var self = this;
    if (_.isUndefined(self.name)) {
      purchaseItemsState.remove(self.purchaseItemId);
    } else {
      purchaseItemsState.remove(self.name);
    }
    var subDiscount = $('[name="subDiscount"]').val()
    if (subDiscount != '') {
      subDiscount = parseFloat(subDiscount);
      StateItem.set('subDiscount', subDiscount);
    }
  },
  'keyup .qty': function(e, t) {
    var current = $(e.currentTarget);
    var name = current.parents('div.row.purchase-list').find('.name').val();
    var getPurchaseItem = purchaseItemsState.get(name);

    console.log(name);
    console.log(getPurchaseItem);
    var qty = parseInt(current.val());
    var amount = math.round(qty * getPurchaseItem.price, 2);
    purchaseItemsState.update(name, {
      qty: qty,
      amount: amount,
      lineCost: lineCost
    });
  },
  'keyup .price': function(e, t) {
    var current = $(e.currentTarget);
    var name = current.parents('div.row.purchase-list').find('.name').val();
    var getPurchaseItem = purchaseItemsState.get(name);

    console.log(name);

    var price = parseFloat(current.val());
    var amount = math.round(getPurchaseItem.qty * price, 2);
    purchaseItemsState.update(name, {
      price: price,
      amount: amount
    });
  },
  'keyup .discount': function(e, t) {
    var current = $(e.currentTarget);
    var name = current.parents('div.row.purchase-list').find('.name').val();
    var getPurchaseItem = purchaseItemsState.get(name);

    console.log(name);
    var discount = current.val();
    var totalAmount = getPurchaseItem.qty * getPurchaseItem.price
    discount = discount == '' ? 0 : parseFloat(discount);
    var amount = math.round(totalAmount - (totalAmount * discount / 100),
      2);
    purchaseItemsState.update(name, {
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
var purchaseItemsInputmask = function() {
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
  return Rice.Collection.PurchaseCategory.findOne(id).name;
}

var getItem = function(arr, item) {
  arr.push({
    id: item._id,
    text: item._id + ' | ' + item.name
  });
  return arr;
}
