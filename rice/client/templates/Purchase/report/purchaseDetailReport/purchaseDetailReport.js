var state = new ReactiveObj();

Template.rice_purchaseDetailReport.onCreated(function() {
  createNewAlertify('listSupplier', 'zoom');
});
Template.rice_purchaseDetailReport.onRendered(function() {
  state.set('supplierId', {
    _id: 'All',
    name: 'All'
  });
  datePicker();
});

Template.purchaseDetailSupplierList.helpers({

});
Template.purchaseDetailSupplierList.events({
  "click tbody > tr": function(event, template) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    state.set('supplierId', rowData);
    $('.purchaseDetailSupplierList').modal('hide');
    // alertify.listSupplier().close();
  }
});

Template.rice_purchaseDetailReport.events({});

Template.rice_purchaseDetailReport.helpers({
  supplierId: function() {
    return state.get('supplierId');
  }

});
Template.rice_purchaseDetailReport.onDestroyed(function() {});

Template.rice_purchaseDetailReport.events({
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
Template.rice_purchaseDetailReport.onDestroyed(function() {
  state.set([], {});
});
var datePicker = function() {
  var date = $('[name="date"]');
  DateTimePicker.dateTimeRange(date);
};



Template.rice_purchaseDetailReportGen.helpers({
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
  checkDiscount: function(discount) {
    if (discount == 0) {
      return false
    } else {
      return true;
    }
  },
  getProfit: function(amount, lineCost) {
    return numeral(amount - lineCost).format('0,0.00');
  },
  getItemName: function(id) {
    return Rice.Collection.PurchaseItem.findOne(id).name;
  },
  data: function() {
    var params = FlowRouter.current().queryParams;
    Fetcher.setDefault('data', false);
    Fetcher.retrieve('data', 'rice_purchaseDetailReport', params);
    return Fetcher.get('data');
  }
});
