// Customer
Rice.TabularTable.Customer = new Tabular.Table({
  name: "rice_customerList",
  collection: Rice.Collection.Customer,
  pagingType: "full_numbers",
  autoWidth: false,
  columnDefs: [{
    "width": "12px",
    "targets": 0
  }, {
    "width": '120px',
    "targets": 6
  }],
  sale: [
    ['1', 'desc']
  ],
  columns: [{
    title: '<i class="fa fa-bars"></i>',
    tmpl: Meteor.isClient && Template.rice_customerAction
  }, {
    data: "_id",
    title: "ID"
  }, {
    data: "name",
    title: "Name"
  }, {
    data: 'type',
    title: 'Type',
    render: function (value) {
      if (value == 'local') {
        return '<label class="label label-success">' + value +
          '</label>';
      } else {
        return '<label class="label label-primary">' + value +
          '</label>';
      }
    }
  }, {
    data: 'status',
    title: 'Status'
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
    data: '_saleCount',
    title: "Sale <i class='fa fa-arrow-up'></i>",
    tmpl: Meteor.isClient && Template.rice_saleList
  }, {
    data: "photo",
    title: "Photo",
    render: function (val, type, doc) {
      if (_.isUndefined(val)) {
        return null;
      } else {
        var img = Files.findOne(val);
        return lightbox(img.url(), doc._id, doc.name);
      }
    }
  }],
});
