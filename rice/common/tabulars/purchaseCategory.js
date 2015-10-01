// PurchaseCategory
Rice.TabularTable.PurchaseCategory = new Tabular.Table({
  name: "rice_purchaseCategoryList",
  collection: Rice.Collection.PurchaseCategory,
  pagingType: "full_numbers",
  autoWidth: false,
  columnDefs: [{
    "width": "12px",
    "targets": 0
  }],
  purchase: [
    ['1', 'desc']
  ],
  columns: [{
    title: '<i class="fa fa-bars"></i>',
    tmpl: Meteor.isClient && Template.rice_purchaseCategoryAction
  }, {
    data: "_id",
    title: "ID"
  }, {
    data: "name",
    title: "Name"
  }, {
    data: "shortName",
    title: "Short Name"
  }]
});
