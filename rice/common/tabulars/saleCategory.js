// SaleCategory
Rice.TabularTable.SaleCategory = new Tabular.Table({
    name: "rice_saleCategoryList",
    collection: Rice.Collection.SaleCategory,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [
        {"width": "12px", "targets": 0}
    ],
    sale: [['1', 'desc']],
    columns: [
        {title: '<i class="fa fa-bars"></i>', tmpl: Meteor.isClient && Template.rice_saleCategoryAction},
        {data: "_id", title: "ID"},
        {data: "name", title: "Name"},
        {data: "shortName", title: "Short Name"}
    ]
});