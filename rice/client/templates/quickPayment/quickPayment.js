var datePicker, fillInDetail, selectCustomer, selectInvoice;
Template.rice_quickPaymentInsertTemplate.onRendered(function() {
  datePicker(this.data._id);
});
Template.rice_quickPaymentUpdateTemplate.onRendered(function() {
  datePicker(this.data._id);
});
Template.rice_quickPaymentInsertTemplate.events({
  'keyup [name="paidAmount"]': function() {
    var dueAmount, paidAmount;
    dueAmount = parseInt($('[name="dueAmount"]').val());
    var oldSumPaid = Session.get('sumPaidAmount');
    try {
      paidAmount = $('[name="paidAmount"]').val();
    } catch (e) {
      console.log(e);
    }
    if (parseFloat(paidAmount) > dueAmount) {
      $('[name="paidAmount"]').val(dueAmount);
      $('[name="outstandingAmount"]').val(0);
      $('[name="sumPaidAmount"]').val(oldSumPaid + parseFloat(dueAmount));
    } else if (paidAmount === '') {
      $('[name="outstandingAmount"]').val(dueAmount);
    } else {
      $('[name="sumPaidAmount"]').val(oldSumPaid + parseFloat(paidAmount));
      $('[name="outstandingAmount"]').val(dueAmount - parseInt(paidAmount));
    }
  }
});
Template.rice_quickPaymentInsertTemplate.helpers({
  getCustomer: function(id) {
    var customer = ReactiveMethod.call('getCustomerName', id);
    return customer;
  },
  sumPaidAmount: function() {
    var doc = this;
    var sumPaidAmount = ReactiveMethod.call('getSumPayment', doc._id);
    Session.set('sumPaidAmount', sumPaidAmount);
    if(sumPaidAmount === 0){
      return doc.outstandingAmount;
    }else{
      return sumPaidAmount + doc.outstandingAmount;
    }
  }
});

Template.rice_quickPaymentUpdateTemplate.events({
  'keyup [name="paidAmount"]': function() {
    var dueAmount, paidAmount;
    dueAmount = parseInt($('[name="dueAmount"]').val());
    try {
      oldPaidAmount = Session.get('oldPaidAmount');
      oldSumPaidAmount = Session.get('oldSumPaidAmount');
      dueAmount = parseFloat($('[name="dueAmount"]').val());
      paidAmount = $('[name="paidAmount"]').val();
      sumPaidAmount = $('[name="sumPaidAmount"]').val();
      oldSumPaid = oldSumPaidAmount - oldPaidAmount;
    } catch (e) {
      console.log(e);
    }
    if (parseFloat(paidAmount) > dueAmount) {
      $('[name="paidAmount"]').val(dueAmount);
      $('[name="outstandingAmount"]').val(0);
      $('[name="sumPaidAmount"]').val(oldSumPaid + parseFloat(dueAmount));
    } else if (paidAmount === '') {
      $('[name="outstandingAmount"]').val(dueAmount);
    } else {
      $('[name="outstandingAmount"]').val(dueAmount - parseInt(paidAmount));
      $('[name="sumPaidAmount"]').val(oldSumPaid + parseFloat(paidAmount));

    }
  }
});
Template.rice_quickPaymentUpdateTemplate.onRendered(function(){
  Session.set('oldPaidAmount', this.data.paidAmount);
  Session.set('oldSumPaidAmount', this.data.sumPaidAmount);
});
Template.rice_quickPaymentUpdateTemplate.helpers({
  getCustomer: function(id) {
    var customer = ReactiveMethod.call('getCustomerName', id);
    return customer;
  },
});
datePicker = function(currentInvoiceId) {
  paymentDate = $('[name="paymentDate"]');
  return DateTimePicker.dateTime(paymentDate);
};