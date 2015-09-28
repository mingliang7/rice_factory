// SaleItem
Rice.TabularTable.SaleItem = new Tabular.Table({
  name: "rice_saleItemList",
  collection: Rice.Collection.SaleItem,
  pagingType: "full_numbers",
  autoWidth: false,
  columnDefs: [{
    "width": "12px",
    "targets": 0
  }],
  sale: [
    ['1', 'desc']
  ],
  columns: [{
      title: '<i class="fa fa-bars"></i>',
      tmpl: Meteor.isClient && Template.rice_saleItemAction
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
      data: "cost",
      title: "Cost"
    }, {
      data: "price",
      title: "Price"
    }, {
      data: "saleCategoryId",
      title: "SaleCategory ID"
    }

  ],
  extraFields: ['unit']
});
