// Unit
Rice.TabularTable.Unit = new Tabular.Table({
  name: "rice_unitList",
  collection: Rice.Collection.Unit,
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
      tmpl: Meteor.isClient && Template.rice_unitAction
    }, {
      data: "_id",
      title: "ID"
    }, {
      data: "name",
      title: "Name"
    }, {
      data: "shortName",
      title: "Short Name"
    },

  ]
});
