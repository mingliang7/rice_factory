// Address
Rice.TabularTable.Address = new Tabular.Table({
    name: "rice_addressList",
    collection: Rice.Collection.Address,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    sale: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rice_addressAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "_customerCount", title: "Customer Count"}
    ]
});