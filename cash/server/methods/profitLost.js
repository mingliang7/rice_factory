Meteor.methods({
    getProfitLost: function (selector,baseCurrency,exchangeDate) {

        debugger;
        var arr = [];
        var result = Cash.Collection.Journal.aggregate([

            {$unwind: "$transaction"},
            {
                $match: selector
            },
            { $sort: {"transaction.accountDoc.code":1}},
            {
                $group: {
                    _id: {
                        account: "$transaction.account",
                        name: "$transaction.accountDoc.name",
                        currency: "$currencyId",
                        accountType: "$transaction.accountDoc.accountTypeId",
                        code: "$transaction.accountDoc.code"
                    },
                    result: {$sum: "$transaction.amount"}
                }
            }
        ]);

        result.forEach(function (obj) {
            var re = Meteor.call('exchange',obj._id.currency, baseCurrency, obj.result, exchangeDate);
            arr.push({account: obj._id.account, name: obj._id.name, result: re,accountType: obj._id.accountType,code: obj._id.code});
        });
        arr.sort(compare);
        return arr;
    }

});

function compare(a,b){
    if(a.code< b.code){
        return -1;
    }else if(a.code> b.code){
        return 1;
    }else{
        return 0;
    }
}



