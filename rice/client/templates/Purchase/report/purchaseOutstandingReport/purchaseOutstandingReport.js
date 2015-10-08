var state = new ReactiveObj();

Template.rice_purchaseOutstandingReport.onCreated(function() {
  createNewAlertify('listSupplier', 'zoom');
});
Template.rice_purchaseOutstandingReport.onRendered(function() {
  state.set('supplierId', {
    _id: 'All',
    name: 'All'
  });
  datePicker();
});
Template.purchaseOutstandingSupplierList.helpers({
  selector: function() {
    var type = state.get('type');
    console.log(type);
    if (type == '') {
      return {};
    } else {
      return {
        type: type
      };
    }
  }
});
Template.purchaseOutstandingSupplierList.events({
  "click tbody > tr": function(event, template) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    state.set('supplierId', rowData);
    $('.purchaseOutstandingSupplierList').modal('hide');
    // alertify.listSupplier().close();
  }
});

Template.rice_purchaseOutstandingReport.events({
  "click .select-supplier": function(event, template) {
    // alertify.listSupplier(fa('list-alt', 'Supplier'), renderTemplate(
    //   Template.collapseTabular)).maximize();
  },
  "change [name='type']": function(event) {
    var currentValue = $(event.currentTarget).val();
    state.set('supplierId', {
      _id: 'All',
      name: 'All'
    });
    state.set('type', currentValue);
  }
});

Template.rice_purchaseOutstandingReport.helpers({
  supplierId: function() {
    return state.get('supplierId');
  }

});
Template.rice_purchaseOutstandingReport.events({
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
Template.rice_purchaseOutstandingReport.onDestroyed(function() {
  state.set([], {});
});
var datePicker = function() {
  var date = $('[name="date"]');
  DateTimePicker.dateTime(date);
};



Template.rice_purchaseOutstandingReportGen.helpers({
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
    Fetcher.retrieve('data', 'rice_purchaseOutstandingReport', params);
    return Fetcher.get('data');
  },
  getStaff: function(id) {
    if (id != 'All') {
      var staff = Rice.Collection.Staffs.findOne(id);
      return id + ' | ' + staff.name;
    } else {
      return id;
    }

  },
  footer: function() {
    var sales = this.content;
    var totalInFooter = ReactiveMethod.call('extractContent', sales);
    return totalInFooter;
  }
});
