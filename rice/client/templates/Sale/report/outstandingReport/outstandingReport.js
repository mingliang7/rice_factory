var state = new ReactiveObj();

Template.rice_outstandingReport.onCreated(function() {
  createNewAlertify('listCustomer', 'zoom');
});
Template.rice_outstandingReport.onRendered(function() {
  state.set('customerId', {
    _id: 'All',
    name: 'All'
  });
  datePicker();
});
Template.outstandingCustomerList.helpers({
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
Template.outstandingCustomerList.events({
  "click tbody > tr": function(event, template) {
    var dataTable = $(event.target).closest('table').DataTable();
    var rowData = dataTable.row(event.currentTarget).data();
    state.set('customerId', rowData);
    $('.outstandingCustomerList').modal('hide');
    // alertify.listCustomer().close();
  }
});

Template.rice_outstandingReport.events({
  "click .select-customer": function(event, template) {
    // alertify.listCustomer(fa('list-alt', 'Customer'), renderTemplate(
    //   Template.collapseTabular)).maximize();
  },
  "change [name='type']": function(event) {
    var currentValue = $(event.currentTarget).val();
    state.set('customerId', {
      _id: 'All',
      name: 'All'
    });
    state.set('type', currentValue);
  }
});

Template.rice_outstandingReport.helpers({
  customerId: function() {
    return state.get('customerId');
  }

});
Template.rice_outstandingReport.events({
  "click .reset": function(event, template) {
    state.set('customerId', {
      _id: 'All',
      name: 'All'
    });
    clearSelect2($('[name="exchange"]'));
  },
  'click [name="customer"]': function() {
    state.set('customerId', {
      _id: 'All',
      name: 'All'
    });
  },
  'click .clear-customer': function() {
    state.set('customerId', {
      _id: 'All',
      name: 'All'
    });
  }
});
Template.rice_outstandingReport.onDestroyed(function() {
  state.set([], {});
});
var datePicker = function() {
  var date = $('[name="date"]');
  DateTimePicker.dateTime(date);
};



Template.rice_outstandingReportGen.helpers({
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
    Fetcher.retrieve('data', 'rice_outstandingReport', params);
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
