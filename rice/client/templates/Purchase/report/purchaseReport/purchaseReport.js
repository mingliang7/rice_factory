var state = new ReactiveObj();

Template.rice_purchaseReport.onCreated(function() {
  createNewAlertify('listCustomer', 'zoom');
});
Template.rice_purchaseReport.onRendered(function() {
  state.set('supplierId', {
    _id: 'All',
    name: 'All'
  });
  datePicker();
});

Template.purchaseSupplierList.events({
  "click tbody > tr": function(event, template) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    state.set('supplierId', rowData);
    $('.purchaseSupplierList').modal('hide');
    // alertify.listCustomer().close();
  }
});

Template.rice_purchaseReport.events({});

Template.rice_purchaseReport.helpers({
  supplierId: function() {
    return state.get('supplierId');
  }

});
Template.rice_purchaseReport.onDestroyed(function() {});

Template.rice_purchaseReport.events({
  "click .reset": function(event, template) {
    state.set('supplierId', {
      _id: 'All',
      name: 'All'
    });
    clearSelect2($('[name="exchange"]'));
  },
  'click [name="supplier"]': function() {
    state.set('supplierId', {
      _id: 'All',
      name: 'All'
    });
  },
  'click .clear-supplier': function() {
    state.set('supplierId', {
      _id: 'All',
      name: 'All'
    });
  }
});
Template.rice_purchaseReport.onDestroyed(function() {
  state.set([], {});
});
var datePicker = function() {
  var date = $('[name="date"]');
  DateTimePicker.dateTimeRange(date);
};



Template.rice_purchaseReportGen.helpers({
  options: function() {
    // font size = null (default), bg
    // paper = a4, a5, mini
    // orientation = portrait, landscape
    return {
      //fontSize: 'bg',
      paper: 'a4',
      orientation: 'portrait'
    };
  },
  data: function() {
    var params = FlowRouter.current().queryParams;
    Fetcher.setDefault('data', false);
    Fetcher.retrieve('data', 'rice_purchaseReport', params);
    return Fetcher.get('data');
  }
});
