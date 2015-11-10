Cash.TabularTable.ChartAccount = new Tabular.Table({
    name: "cashChartAccountList",
    collection: Cash.Collection.ChartAccount,
    pagingType: "full_numbers",
    autoWidth: true,
    columnDefs: [
        {"width": "12px", "targets": 0},
        {"width": "30px", "targets": 1}
    ],
    columns: [
        {
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.cash_chartAccountAction
        },
        {data: "code", title: "Code"},
        {data: "name", title: "Name"},
        {data: "parentId", title: "Parent"},
        //{data: "accountTypeId", title: "Account Type"},
        {
            data: "accountTypeId",
            title: "Account Type",
            render: function (val, type, doc) {
                return Cash.Collection.AccountType.findOne({_id: val}).name;
            }
        }

    ],
    order: ['0', 'desc'],
    pagingType: "full_numbers"
});