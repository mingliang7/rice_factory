var state = new ReactiveObj();

Template.rice_purchasePaymentReport.onCreated(function() {
  createNewAlertify('listSupplier', 'zoom');
});
Template.rice_purchasePaymentReport.onRendered(function() {
  state.set('supplierId', {
    _id: 'All',
    name: 'All'
  });
  datePicker();
});
Template.paymentSupplierList.helpers({});
Template.paymentSupplierList.events({
  "click tbody > tr": function(event, template) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    state.set('supplierId', rowData);
    $('.paymentSupplierList').modal('hide');
    // alertify.listSupplier().close();
  }
});

Template.rice_purchasePaymentReport.events({});

Template.rice_purchasePaymentReport.helpers({
  supplierId: function() {
    return state.get('supplierId');
  }

});
Template.rice_purchasePaymentReport.events({
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
Template.rice_purchasePaymentReport.onDestroyed(function() {
  state.set([], {});
});
var datePicker = function() {
  var date = $('[name="date"]');
  DateTimePicker.dateTimeRange(date);
};



Template.rice_purchasePaymentReportGen.helpers({
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
    Fetcher.retrieve('data', 'rice_purchasePaymentReport', params);
    return Fetcher.get('data');
  },
  getStaff: function(id) {
    if (id != 'All') {
      var staff = Rice.Collection.Staffs.findOne(id);
      return id + ' | ' + staff.name;
    } else {
      return id;
    }

  }
});
