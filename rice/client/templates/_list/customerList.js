Template.customerList.events({
  "click tbody > tr": function(event, template) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    Session.set("customerId", rowData._id);
    // alertify.customerList().close();
    $('.collapseTabular').modal('hide');
  }
});
