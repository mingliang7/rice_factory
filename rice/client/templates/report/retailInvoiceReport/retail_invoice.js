// Dental.ListForReportState = new ReactiveObj();
// /************ Form *************/
// Template.dental_invoiceReport.onCreated(function () {
//     createNewAlertify('exchange');
// });

// Template.dental_invoiceReport.onRendered(function () {
//     var name = $('[name="date"]');
//     DateTimePicker.date(name);
// });

// Template.dental_invoiceReport.events({
//     'click .exchangeAddon': function (e, t) {
//         alertify.exchange(fa("plutoJSONValue(val);s", "Exchange"), renderTemplate(Template.cpanel_exchangeInsert));
//     },
//     'change .patientId': function (e, t) {
//         var patientId = $(e.currentTarget).val();
//         return Dental.ListForReportState.set("patientId", patientId);
//     }

// });
/************ Generate *************/
Template.rice_invoiceReportGen.helpers({
  options: function() {
    // font size = null (default), bg
    // paper = a4, a5, mini
    // orientation = portrait, landscape
    return {
      //fontSize: 'bg',
      paper: 'a5',
      orientation: 'portrait'
    };
  },
  data: function() {
    var id = FlowRouter.getParam('invoiceId');
    var callId = JSON.stringify(id);
    var call = Meteor.callAsync(callId, 'retailInvoice', id);
    if (!call.ready()) {
      return false;
    }

    return call.result();
  },
  check: function(data) {},

  itemName: function(id) {
    var saleItem = ReactiveMethod.call('getSaleItem', id);
    return saleItem.name;
  },
  itemDiscount: function(discount) {
    if (discount === undefined || discount === 0) {
      return '';
    } else {
      return discount;
    }
  }
});

var formatDollar = function(value) {
  return numeral(value).format('0,0.0');
};
var formatKH = function(value) {
  return numeral(value).format('0,0');
};
