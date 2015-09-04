var datePicker, fillInDetail, selectCustomer, selectInvoice;
Template.rice_quickPaymentInsertTemplate.onRendered(function() {
  datePicker(this.data._id);
  setSumPaid('sale', this.data);
});

Template.rice_quickPaymentInsertTemplate.events({
  'keyup [name="paidAmount"]': function() {
    var dueAmount, paidAmount;
    dueAmount = parseInt($('[name="dueAmount"]').val());
    try {
      paidAmount = $('[name="paidAmount"]').val();
      var oldSumPaid = Session.get('sumPaid');
      $('[name="sumPaidAmount"]').val(oldSumPaid + parseFloat(paidAmount));
    } catch (e) {
      console.log(e);
    }
    if (parseFloat(paidAmount) > dueAmount) {
      $('[name="paidAmount"]').val(dueAmount);
      $('[name="outstandingAmount"]').val(0);
    } else if (paidAmount === '') {
      $('[name="outstandingAmount"]').val(dueAmount);
    } else {
      $('[name="outstandingAmount"]').val(dueAmount - parseInt(paidAmount));
    }
  }
});
Template.rice_quickPaymentInsertTemplate.helpers({
  getCustomer: function(id) {
    Meteor.call('getCustomerName', id, function(err, result) {
      if (err) {
        console.log(err);
      }
      if (result) {
        Session.set('customerName', result);
      }
    });
    return Session.get('customerName');
  }
});
datePicker = function(currentInvoiceId) {
  paymentDate = $('[name="paymentDate"]');
  return DateTimePicker.dateTime(paymentDate);
};
var setSumPaid = function(doc) {
  Meteor.call('getSumPayment', doc._id, function(err, data) {
    if (err) {
      console.log(err);
    } else {
      Session.set('sumPaid', data);
    }
  });
  var sumPaid = Session.get('sumPaid') + doc.outstandingAmount;
  console.log(sumPaid);
  $('[name="sumPaidAmount"]').val(sumPaid);
  return Session.set('sumpPaid', Session.get('sumPaid'));
};
