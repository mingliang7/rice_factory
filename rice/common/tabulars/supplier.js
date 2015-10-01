// Supplier
Rice.TabularTable.Supplier = new Tabular.Table({
  name: "rice_supplierList",
  collection: Rice.Collection.Supplier,
  pagingType: "full_numbers",
  autoWidth: false,
  columnDefs: [{
    "width": "12px",
    "targets": 0
  }, {
    "width": '120px',
    "targets": 6
  }],
  purchase: [
    ['1', 'desc']
  ],
  columns: [{
    title: '<i class="fa fa-bars"></i>',
    tmpl: Meteor.isClient && Template.rice_supplierAction
  }, {
    data: "_id",
    title: "ID"
  }, {
    data: "name",
    title: "Name"
  }, {
    data: "gender",
    title: "Gender"
  }, {
    data: "address",
    title: "Address"
  }, {
    data: "telephone",
    title: "Telephone"
  }, {
    data: '_purchaseCount',
    title: "Purchase <i class='fa fa-arrow-up'></i>",
    tmpl: Meteor.isClient && Template.rice_purchaseList
  }, {
    data: "photo",
    title: "Photo",
    render: function(val, type, doc) {
      if (_.isUndefined(val)) {
        return null;
      } else {
        var img = Files.findOne(val);
        return lightbox(img.url(), doc._id, doc.name);
      }
    }
  }]
});
