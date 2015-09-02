// Declare template
var saleItemTpl = Template.rice_saleItem;

// SaleItems state
saleItemsState = new ReactiveList();
var state = new ReactiveObj({
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

saleItemTpl.onCreated(function () {
    saleItemsState.clear();
    // Check form type
    var data = Template.currentData();
    if (!_.isUndefined(data)) {
        _.each(data.saleItems, function (obj, key) {
            obj.indexName = 'saleItems.' + key + '.saleItemId';
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

saleItemTpl.onRendered(function () {
    saleItemsInputmask();
    var list = []
    var tmpId = {};
    var tmpArr = {};
    var result = Rice.Collection.SaleItem.find({}, {sort: {saleCategoryId: 1}}).fetch();
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
        var discount = state.get('discount');
        var tmpAmountVal = 0 ;
        debugger
        if(discount == 0) {
            tmpAmountVal = math.round(state.get('qty') * state.get('price'), 2);
            
        }else{
            var price = state.get('price');
            var qty = state.get('qty');
            var amount = math.round(price * qty, 2);
            tmpAmountVal = math.round(amount - ((price * qty) * discount / 100), 2)
        }
        return tmpAmountVal;
    },
    tmpLineCost: function(){
        var cost = state.get('cost');
        var qty = state.get('qty');
        return qty * cost;
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
    subTotal: function () {
        var totalVal = 0;
        _.each(saleItemsState.fetch(), function (o) {
                totalVal += o.amount;
        });
        if(totalVal != 0){
            return totalVal;
        }
    },
    total: function () {
        var totalVal = 0;
        var subDiscount = state.get('subDiscount');
        if(subDiscount == 0 ){
            _.each(saleItemsState.fetch(), function (o) {
                totalVal += o.amount;
            });
        }else{
            _.each(saleItemsState.fetch(), function (o) {
                totalVal += o.amount;
            });
            totalVal = totalVal - subDiscount;
        }

        return totalVal;
    },
    profit: function(){
        var totalLineCost = 0 ;
        var totalVal = 0;
        var subDiscount = state.get('subDiscount');
        if(subDiscount == 0 ){
            _.each(saleItemsState.fetch(), function (o) {
                totalVal += o.amount;
                totalLineCost += o.lineCost;
            });
            return totalVal - totalLineCost;
        }else{
             _.each(saleItemsState.fetch(), function (o) {
                totalVal += o.amount;
                totalLineCost += o.lineCost;
            });
             return (totalVal - totalLineCost) - subDiscount;
        }

    },
    exchange: function(){
        var getExchange = state.get('exchange');
        var getExchangeBase = state.get('exchangeBase');
        var totalInDollar = 0;
        var totalVal = 0;
        var subDiscount = state.get('subDiscount');
        if(subDiscount == 0 ){
            _.each(saleItemsState.fetch(), function (o) {
                totalVal += o.amount;
            });
        }else{
            _.each(saleItemsState.fetch(), function (o) {
                totalVal += o.amount;
            });
            totalVal = totalVal - subDiscount;
        }
        totalInDollar = getExchange * totalVal ;
        if(totalVal != 0 ){
            return 'KHR: ' + numeral(totalVal).format('0,0') + ' USD: ' + numeral(totalInDollar).format('0,0.00');
        }
    }, 
    getItem: function(id){
        var item = Rice.Collection.SaleItem.findOne(id);
        return item._id + ' | ' + item.name;
    }
});

saleItemTpl.events({
    'change [name="tmpName"]': function(e){
        var id = $(e.currentTarget).val();
        var item = Rice.Collection.SaleItem.findOne(id);
        $('[name="tmpPrice"]').val(item.price);
        $('[name="tmpCost"]').val(item.cost);
        state.set('price', item.price);
        state.set('cost', item.cost);
        var exchange = Cpanel.Collection.Exchange.findOne({}, {sort: {dateTime: -1}});
        setTimeout(function(){
            $('[name="exchange"]').select2('val', exchange._id)
            if(exchange.base == 'KHR'){
                state.set('exchange', exchange.rates.USD);
            }else if(exchange.base == 'USD') {
                state.set('exchange', exchange.rates.KHR);
            }
        }, 200);
    },
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
    'keyup [name="tmpDiscount"]': function(e){
        var discount = $(e.currentTarget).val();
        discount = _.isEmpty(discount) ? 0 : parseFloat(discount);

        state.set('discount', discount)
    },
    'click .addSaleItem': function (e, t) {
        var index = 0;
        var saleItem = {};
        saleItem.name = t.$('[name="tmpName"]').val();
        saleItem.tmpName = t.$('[name="tmpName"]').select2('data').text;
        saleItem.qty = parseFloat(t.$('[name="tmpQty"]').val());
        saleItem.cost = parseFloat(t.$('[name="tmpCost"]').val())
        saleItem.price = math.round(parseFloat(t.$('[name="tmpPrice"]').val()), 2);
        saleItem.amount = math.round(parseFloat(t.$('[name="tmpAmount"]').val()));
        saleItem.lineCost = math.round(parseFloat(t.$('[name="tmpLineCost"]').val()));
        var discount = t.$('[name="tmpDiscount"]').val();
        var subDiscount = $('[name="subDiscount"]').val()
        if(subDiscount != ''){
            subDiscount = parseFloat(subDiscount);
            state.set('subDiscount', subDiscount);
        }
        if(discount == ''){
            saleItem.discount = 0 
        }else{
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
        saleItem.indexQty = 'saleItems.' + index + '.qty';
        saleItem.indexPrice = 'saleItems.' + index + '.price';
        saleItem.indexCost = 'saleItems.' + index + '.cost';
        saleItem.indexDiscount = 'saleItems.' + index + '.discount';
        saleItem.indexAmount = 'saleItems.' + index + '.amount';
        saleItem.indexLineCost = 'saleItems.' + index + '.lineCost';


        saleItemsState.insert(saleItem.name, saleItem);
    },
    'blur .addSaleItem': function (e, t) {
        saleItemsInputmask();
    },
    'click .removeSaleItem': function (e, t) {
        var self = this;
        if(_.isUndefined(self.name)){
            saleItemsState.remove(self.saleItemId);
        }else{
            saleItemsState.remove(self.name);
        }
        var subDiscount = $('[name="subDiscount"]').val()
        if(subDiscount != ''){
            subDiscount = parseFloat(subDiscount);
            state.set('subDiscount', subDiscount);
        }
    },
    'keyup .qty': function (e, t) {
        var current = $(e.currentTarget);
        var name = current.parents('div.row.sale-list').find('.name').val();
        var getSaleItem = saleItemsState.get(name);

        console.log(name);
        console.log(getSaleItem);
        var qty = parseInt(current.val());
        var amount = math.round(qty * getSaleItem.price, 2);
        var lineCost = math.round(qty * getSaleItem.cost, 2)
        saleItemsState.update(name, {
            qty: qty,
            amount: amount,
            lineCost: lineCost
        });
    },
    'keyup .price': function (e, t) {
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
    'keyup .discount': function(e, t){
        var current = $(e.currentTarget);
        var name = current.parents('div.row.sale-list').find('.name').val();
        var getSaleItem = saleItemsState.get(name);

        console.log(name);
        var discount = current.val();
        var totalAmount = getSaleItem.qty * getSaleItem.price
        discount = discount == '' ? 0 : parseFloat(discount);
        var amount = math.round(totalAmount- (totalAmount * discount/100), 2);
        saleItemsState.update(name, {
            amount: amount,
            discount: discount
        });
    },
    'keyup [name="subDiscount"]': function(e){
        var value = $(e.currentTarget).val();
        value = value == '' ? 0 : parseFloat(value);
        state.set('subDiscount', value);
    }
});

/**
 * Input mask
 */
var saleItemsInputmask = function () {
    var tmpQty = $('[name="tmpQty"]');
    var tmpPrice = $('[name="tmpPrice"]');
    var tmpAmount = $('[name="tmpAmount"]');
    var tmpDiscount = $('[name="tmpDiscount"]');

    var qty = $('.qty');
    var price = $('.price');
    var amount = $('.amount');
    var total = $('[name="total"]');
    var subTotal = $('[name="subTotal"]')
    Inputmask.currency([tmpPrice, tmpAmount, price, amount, total, subTotal], {prefix: 'R '});
    Inputmask.decimal([tmpQty, qty]);
    Inputmask.percentage(tmpDiscount);
};

var getCategoryName = function(id){
    return Rice.Collection.SaleCategory.findOne(id).name;
}

var getItem = function(arr, item){
    arr.push({id: item._id, text: item._id+ ' | ' + item.name});
    return arr;
}