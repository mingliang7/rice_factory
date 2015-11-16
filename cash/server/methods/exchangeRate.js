Meteor.methods({
    exchange : function (curFrom, curTo, amount, date) {
        var ex = Cpanel.Collection.Exchange.findOne({
                base: curTo,
                _id: date
            },
            {
                sort: {_id: -1}
            });

        if (curFrom != curTo) {
            return amount / ex.rates[curFrom];
        } else {
            return amount;
        }
    }
})
