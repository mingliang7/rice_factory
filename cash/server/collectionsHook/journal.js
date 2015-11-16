// Customer
var module = 'Cash';

Cash.Collection.Journal.before.insert(function (userId, doc) {
    var transaction = [];
    _.each(doc.transaction, function (obj) {
        if (!_.isNull(obj)) {
            var account= Cash.Collection.ChartAccount.findOne({_id: obj.account},{fields:{name: 1,accountTypeId:1,code:1}});

            obj.accountDoc = account;
            transaction.push(obj);
        }
    });

    doc.transaction = transaction;
});
Cash.Collection.Journal.before.update(function (userId, doc, fieldNames, modifier, options) {
    modifier.$set = modifier.$set || {};
    var transaction = [];
    _.each(modifier.$set.transaction, function (obj) {
        if (!_.isNull(obj)) {
            var account= Cash.Collection.ChartAccount.findOne({_id: obj.account},{fields:{name: 1,accountTypeId:1,code:1}});
            obj.accountDoc = account;
            transaction.push(obj);
        }
    });

    modifier.$set.transaction = transaction;
});
