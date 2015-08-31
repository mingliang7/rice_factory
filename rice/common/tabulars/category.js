// Category
Rice.TabularTable.Category = new Tabular.Table({
    name: "rice_categoryList",
    collection: Rice.Collection.Category,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    sale: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rice_categoryAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "shortName", title: "Short Name"}
    ]
});