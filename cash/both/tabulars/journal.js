/*
 Tabular
 */
Cash.TabularTable.Journal = new Tabular.Table({
    name: "cashJournalList",
    collection: Cash.Collection.Journal,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0},
        {"width": "120px", "targets": 1},
        {"width": "30px", "targets": 2},
        {"width": "30px", "targets": 3}
    ],
    order: [['1', 'desc']],
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.cash_journalAction
        },
        {data: "_id", title: "Id"},
        {
            data: "journalDate", title: "Date",
            render: function (val, type, doc) {
                return moment(val).format("DD/MM/YYYY");
            }
        },
        {
            data: "voucherId", title: "Voucher",
            render: function (val, type, doc) {
                return val.substr(8, val.length)
            }
        },
        {
            data: "staff", title: "Staff",
            render: function (val, type, doc) {
                return Cash.Collection.Staff.findOne({_id: val}).name;
            }
        },
        {data: "memo", title: "Description"},

        {
            data: "total", title: "Amount",
            render: function (val, type, doc) {
                if (val != null) {
                    var currencySymbol = Cpanel.Collection.Currency.findOne({_id: doc.currencyId}).symbol;
                    return currencySymbol + numeral(val).format("0,0.00");
                }
            }
        }
    ],
    /*order: [['0', 'desc']],
     pagingType: "full_numbers",
     columnDefs: [
     {"width": "12px", "targets": 7}
     ],*/
    extraFields: ['currencyId']

});