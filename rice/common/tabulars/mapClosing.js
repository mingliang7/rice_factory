Rice.TabularTable.MapClosing = new Tabular.Table({
  name: "accMapClosingList",
  collection: Rice.Collection.MapClosing,
  pagingType: "full_numbers",
  autoWidth: true,
  columnDefs: [{
    "width": "12px",
    "targets": 0
  }],
  columns: [{
    title: '<i class="fa fa-bars"></i>',
    tmpl: Meteor.isClient && Template.acc_mapClosingAction
  }, {
    data: "chartAccountCompare",
    title: "Compare Account"
  }, {
    data: "chartAccount",
    title: "Chart Account"
      // render: function (val, type, doc) {
      //   var result = "";
      //   if (val != null) {
      //     data = Rice.Collection.ChartAccount.findOne({
      //       _id: val
      //     });
      //     result = data.code + " | " + data.name;
      //   }
      //   return result;
      // }
  }],
  order: ['0', 'desc']
});
