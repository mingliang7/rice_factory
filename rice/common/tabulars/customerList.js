// Customer
Rice.TabularTable.CustomerList = new Tabular.Table({
  name: "rice_customerList",
  collection: Rice.Collection.Customer,
  pagingType: "full_numbers",
  autoWidth: false,
  columnDefs: [],
  columns: [{
    data: "_id",
    title: "ID"
  }, {
    data: "name",
    title: "Name"
  }, {
    data: "gender",
    title: "Gender"
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
