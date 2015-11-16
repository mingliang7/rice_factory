Cash.TabularTable.ClosingBalance = new Tabular.Table({
    name: "cashClosingBalanceList",
    collection: Cash.Collection.OpeningClosingBalance,
    pagingType: "full_numbers",
    autoWidth: true,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.cash_closingBalanceAction
        },
        {
            data: "date", title: "Date",
            render: function (val, type, doc) {
                return moment(val).format("DD/MM/YYYY");
            }
        },
        {
            data: "value.KHR", title: "KHR",
            render: function (val, type, doc) {
                return numeral(val).format('0,0.00');
            }
        },
        {
            data: "value.USD", title: "USD",
            render: function (val, type, doc) {
                return numeral(val).format('0,0.00');
            }
        },
        {
            data: "value.THB", title: "THB",
            render: function (val, type, doc) {
                return numeral(val).format('0,0.00');
            }
        },
        {data: "status", title: "Status"},

    ],
    order: ['1', 'desc'],
});