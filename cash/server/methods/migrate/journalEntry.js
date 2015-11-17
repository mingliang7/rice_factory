Meteor.methods({
    journalEntry: function (data, transaction, branchId, journalId) {
        check(data, Object);
        _.defaults(data, {
            journalDate: moment().format('YYYY-MM-DD'),
            branchId: branchId,
            voucherId: ""/*parseInt((Cash.Collection.Journal.findOne({currencyId: data.currencyId},{sort: {voucherId: -1}})).substr(8, 13)) + 1*/,
            staff: "",
            currencyId: "",
            memo: "",
            total: ""
        });

        data.transaction = transaction;

        var date = moment(data.journalDate).format("YYMM");
        var prefix = branchId + "-" + date;
        data._id = idGenerator.genWithPrefix(Cash.Collection.Journal,
            prefix, 6);
        var year = moment(data.journalDate).format("YYYY");
        data.voucherId = branchId + "-" + year + s.pad(data.voucherId, 6, "0");

        return Cash.Collection.Journal.insert(data);
    }, journalUpdate: function (data, transaction, branchId, journalId) {
        check(data, Object);
        _.defaults(data, {
            journalDate: moment().format('YYYY-MM-DD'),
            branchId: branchId,
            voucherId: ""/*parseInt((Cash.Collection.Journal.findOne({currencyId: data.currencyId},{sort: {voucherId: -1}})).substr(8, 13)) + 1*/,
            staff: "",
            currencyId: "",
            memo: "",
            total: ""
        });

        data.transaction = transaction;

        var date = moment(data.journalDate).format("YYMM");
        var prefix = branchId + "-" + date;
        data._id = idGenerator.genWithPrefix(Cash.Collection.Journal,
            prefix, 6);
        var year = moment(data.journalDate).format("YYYY");
        data.voucherId = branchId + "-" + year + s.pad(data.voucherId, 6, "0");

        return Cash.Collection.Journal.update(journalId, {$set: data});
    }, journalRemove: function (journalId) {
        return Cash.Collection.Journal.remove(journalId);
    }
});