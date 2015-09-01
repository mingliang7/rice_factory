// Declare template
var saleItemTpl = Template.rice_saleSaleItem;

// SaleItems state
saleItemsState = new ReactiveList();
var state = new ReactiveObj({
    qty: 0,
    price: 0,
    cssClassForAddMore: 'disabled'
});

/**
 * SaleItems
 */
saleItemTpl.onCreated(function () {
    saleItemsState.clear();

    // Check form type
    var data = Template.currentData();
    if (!_.isUndefined(data)) {
        _.each(data.saleItems, function (obj, key) {
            obj.indexName = 'saleItems.' + key + '.name';
            obj.indexQty = 'saleItems.' + key + '.qty';
            obj.indexCost = 'saleItems.' + key + '.cost';
            obj.indexLineCost = 'saleItems.' + key + '.line-cost';
            obj.indexProfit = 'saleItems.' + key + '.profit';
            obj.indexPrice = 'saleItems.' + key + '.price';
            obj.indexAmount = 'saleItems.' + key + '.amount';

            saleItemsState.insert(obj.name, obj);
        });
    }
});

saleItemTpl.onRendered(function () {
    saleItemsInputmask();
    var list = []
    var tmpId = {};
    var tmpArr = {};
    var result = Rice.Collection.SaleItem.find().fetch();
    result.forEach(function(item) {
        if(_.isUndefined(tmpArr[item.saleCategoryId])){
            tmpArr[item.saleCategoryId] = [];
        }
        tmpId[item.saleCategoryId] = {
            text: getCategoryName(item.saleCategoryId),
            children: getItem(tmpArr[item.saleCategoryId], item)
        }
    });
    for(var k in tmpId){
        list.push(tmpId[k])
    }
    $('[name="tmpName"]').select2({
        data: list
    });
});

saleItemTpl.helpers({
    tmpAmount: function () {
        var tmpAmountVal = math.round(state.get('qty') * state.get('price'), 2);
        return tmpAmountVal;
    },
    cssClassForAddMore: function () {
        var tmpAmountVal = math.round(state.get('qty') * state.get('price'), 2);
        if (tmpAmountVal > 0) {
            state.set('cssClassForAddMore', '');
        } else {
            state.set('cssClassForAddMore', 'disabled');
        }

        return state.get('cssClassForAddMore');
    },
    saleItems: function () {
        return saleItemsState.fetch();
    },
    total: function () {
        var totalVal = 0;
        _.each(saleItemsState.fetch(), function (o) {
            totalVal += o.amount;
        });

        return totalVal;
    }
});

saleItemTpl.events({
    'keyup [name="tmpQty"]': function (e, t) {
        var qty = t.$('[name="tmpQty"]').val();
        qty = _.isEmpty(qty) ? 0 : parseInt(qty);

        state.set('qty', qty);
    },
    'keyup [name="tmpPrice"]': function (e, t) {
        var price = t.$('[name="tmpPrice"]').val();
        price = _.isEmpty(price) ? 0 : parseFloat(price);

        state.set('price', price);
    },
    'click .addSaleItem': function (e, t) {
        var index = 0;
        var saleItem = {};
        saleItem.name = t.$('[name="tmpName"]').val();
        saleItem.qty = parseInt(t.$('[name="tmpQty"]').val());
        saleItem.price = math.round(parseFloat(t.$('[name="tmpPrice"]').val()), 2);
        saleItem.amount = math.round(saleItem.qty * saleItem.price, 2);

        // Check saleItems exist
        if (saleItemsState.length() > 0) {
            // Check duplicate
            var duplicate = saleItemsState.get(saleItem.name);
            if (!_.isUndefined(duplicate)) {
                saleItem.qty = duplicate.qty + saleItem.qty;
                saleItem.amount = math.round(saleItem.qty * saleItem.price, 2);

                saleItemsState.update(saleItem.name, {
                    qty: saleItem.qty,
                    price: saleItem.price,
                    amount: saleItem.amount
                });

                return false;
            } else {
                index = saleItemsState.last().index + 1;
            }
        }

        saleItem.indexNmae = 'saleItems.' + index + '.name';
        saleItem.indexQty = 'saleItems.' + index + '.qty';
        saleItem.indexPrice = 'saleItems.' + index + '.price';
        saleItem.indexAmount = 'saleItems.' + index + '.amount';

        saleItemsState.insert(saleItem.name, saleItem);
    },
    'blur .addSaleItem': function (e, t) {
        saleItemsInputmask();
    },
    'click .removeSaleItem': function (e, t) {
        var self = this;
        saleItemsState.remove(self.name);
    },
    'keyup .qty': function (e, t) {
        var current = $(e.currentTarget);
        var name = current.parents('div.row.list').find('.name').val();
        var getSaleItem = saleItemsState.get(name);

        console.log(name);

        var qty = parseInt(current.val());
        var amount = math.round(qty * getSaleItem.price, 2);
        saleItemsState.update(name, {
            qty: qty,
            amount: amount
        });
    },
    'keyup .price': function (e, t) {
        var current = $(e.currentTarget);
        var name = current.parents('div.row.list').find('.name').val();
        var getSaleItem = saleItemsState.get(name);

        console.log(name);

        var price = parseFloat(current.val());
        var amount = math.round(getSaleItem.qty * price, 2);
        saleItemsState.update(name, {
            price: price,
            amount: amount
        });
    }
});

/**
 * Input mask
 */
var saleItemsInputmask = function () {
    var tmpQty = $('[name="tmpQty"]');
    var tmpPrice = $('[name="tmpPrice"]');
    var tmpAmount = $('[name="tmpAmount"]');

    var qty = $('.qty');
    var price = $('.price');
    var amount = $('.amount');
    var total = $('[name="total"]');

    Inputmask.currency([tmpPrice, tmpAmount, price, amount, total]);
    Inputmask.integer([tmpQty, qty]);
};

var getCategoryName = function(id){
    return Rice.Collection.SaleCategory.findOne(id).name;
}

var getItem = function(arr, item){
    arr.push({id: item._id, text: item.name});
    return arr;
}