// Sale
Rice.TabularTable.Sale = new Tabular.Table({
    name: "rice_saleList",
    collection: Rice.Collection.Sale,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    sale: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rice_saleAction},
        {data: "_id", title: "ID"},
        {data: "saleDate", title: "Date"},
        {data: "total", title: "Total"},
        {data: "des", title: "Description"}
        //{data: "customerId", title: "Customer ID"},
        //{
        //    data: "_customer",
        //    title: "Customer Info",
        //    render: function (val, type, doc) {
        //        return JSON.stringify(val, null, ' ');
        //    }
        //}
    ]
});