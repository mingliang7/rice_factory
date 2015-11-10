/**
 * Schema
 */
Cash.Schema.BalanceOutStanding = new SimpleSchema({
    branchId: {
        type: String,
        label: "Branch",
        max: 100,
        defaultValue: "All",
        autoform: {
            type: "select2",
            options: function () {
                return Cash.ListForReport.branch();
            }
        }
    },

    date: {
        type: String,
        label: "Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD').format('YYYY-MM-DD');
            return currentDate;
        }
    }
});