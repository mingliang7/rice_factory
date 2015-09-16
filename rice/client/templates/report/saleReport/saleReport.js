Template.rice_saleReport.onCreated(function() {
  Session.set('customerId', undefined);
  createNewAlertify('customerList');
});
Template.rice_saleReport.onRendered(function() {
  datePicker();
});

Template.rice_saleReport.helpers({
  customerId: function() {
    return Session.get('customerId');
  },
  customerName: function() {
    var customerId = Session.get('customerId');
    if (customerId) {
      try {
        var customer = ReactiveMethod.call('getCustomer', customerId);
        return customer.name;
      } catch (e) {}
    } else {
      return false;
    }
  }
});

Template.rice_saleReport.events({
  "click .select-customer": function(event, template) {
    alertify.customerList(fa('list-alt', 'customer'),
      renderTemplate(
        Template.customerList)).maximize();

  },
  'keyup [name="customer"]': function() {
    var currentValue = this.value;
    Session.set('customerId', undefined);
  }
});
var datePicker = function() {
  var date = $('[name="date"]');
  DateTimePicker.dateTimeRange(date);
};

Template.rice_saleReportGen.helpers({
  data: function() {
    var data = FlowRouter.current().queryParams;
    var call = Meteor.callAsync(data.customerId, 'rice_saleReport',
      data);

    if (!call.ready()) {
      return false;
    }
    return call.result();
  },
  saleItems: function() {
    var val = this;
    td = '';
    console.log(val);
    val.saleItems.forEach(function(item) {
      td += '<td>' + item.saleItemId + '</td>';
    });
    return td;
  }
});
