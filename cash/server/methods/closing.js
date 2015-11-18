Meteor.methods({
    findJournal: function (selector) {
        var data = Cash.Collection.Journal.find(selector).fetch();
        return data;
    },
    content: function (curdate, currencyId) {

        var selector = {};
        var openingBalance = Cash.Collection.OpeningClosingBalance.findOne({}, {
            sort: {
                date: -1
            }
        });
        if (openingBalance != null) {
            /* var dateFrom = moment(openingBalance.date).add(1, "days").toDate();*/
            var dateTo = curdate;
            selector.journalDate = {
                $gt: openingBalance.date,
                $lte: dateTo
            };

            selector.currencyId = currencyId;
            selector['transaction.accountDoc.accountTypeId'] = {
                $in: ["40", "50"]
            };
            var profit = 0;

            /*var result = Cash.Collection.Journal.find(selector);*/

            var result = Meteor.call('findJournal', selector);

            var grandTotalIncome = 0;
            var grandTotalExpense = 0;
            result.forEach(function (obj) {
                obj.transaction.forEach(function (ob) {
                    if (ob.accountDoc.accountTypeId == "40") {
                        grandTotalIncome += ob.amount;
                    } else if (ob.accountDoc.accountTypeId == "50") {
                        grandTotalExpense += ob.amount;
                    }
                })
            })


            profit = (grandTotalIncome - grandTotalExpense) + parseFloat(
                    openingBalance.value[currencyId]);
            return profit;
        } else {
            return 0;
        }
    }
})