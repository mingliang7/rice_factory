Meteor.methods({
    journalEntry: function (data, transaction, branchId) {
        check(data, Object);
        _.defaults(data, {
            journalDate: moment().format('YYYY-MM-DD'),
            branchId: branchId,
            voucherId: "",
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
    }
});