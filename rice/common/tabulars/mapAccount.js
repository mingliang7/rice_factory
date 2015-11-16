Rice.TabularTable.MapAccount = new Tabular.Table({
  name: "accMapAccountList",
  collection: Rice.Collection.MapAccount,
  pagingType: "full_numbers",
  autoWidth: true,
  columnDefs: [{
    "width": "12px",
    "targets": 0
  }],
  columns: [{
    title: '<i class="fa fa-bars"></i>',
    tmpl: Meteor.isClient && Template.rice_mapAccountAction
  }, {
    data: "chartAccountCompare",
    title: "Compare Account"
  }, {
    data: 'type',
    title: 'Type'
  }],
  order: ['0', 'desc']
});
