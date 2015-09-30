// PurchaseItem
Rice.TabularTable.PurchaseItem = new Tabular.Table({
  name: "rice_purchaseItemList",
  collection: Rice.Collection.PurchaseItem,
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
      tmpl: Meteor.isClient && Template.rice_purchaseItemAction
    }, {
      data: "_id",
      title: "ID"
    }, {
      data: "name",
      title: "Name"
    }, {
      data: "shortName",
      title: "Short Name"
    }, {
      data: "price",
      title: "Price"
    }, {
      data: "purchaseCategoryId",
      title: "SaleCategory ID"
    }

  ]
});
