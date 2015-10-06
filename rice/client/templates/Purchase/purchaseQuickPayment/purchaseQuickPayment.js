var datePicker, fillInDetail, selectCustomer, selectInvoice;
Template.rice_purchaseQuickPaymentInsertTemplate.onRendered(function() {
  datePicker(this.data._id);
});
Template.rice_purchaseQuickPaymentUpdateTemplate.onRendered(function() {
  datePicker(this.data._id);
});
Template.rice_purchaseQuickPaymentInsertTemplate.events({
  'keyup [name="paidAmount"]': function() {
    var dueAmount, paidAmount;
    dueAmount = parseFloat($('[name="dueAmount"]').val());
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
      $('[name="outstandingAmount"]').val(dueAmount - parseFloat(
        paidAmount));
    }
  }
});
Template.rice_purchaseQuickPaymentInsertTemplate.helpers({
  getSupplier: function(id) {
    var supplier = ReactiveMethod.call('getSupplier', id);
    return supplier.name;
  },
  sumPaidAmount: function() {
    var doc = this;
    var sumPaidAmount = ReactiveMethod.call('getSumPurchasePayment', doc._id);
    console.log(sumPaidAmount);
    Session.set('sumPaidAmount', sumPaidAmount);
    if (sumPaidAmount === 0) {
      return doc.outstandingAmount;
    } else {
      return sumPaidAmount + doc.outstandingAmount;
    }
  }
});

Template.rice_purchaseQuickPaymentUpdateTemplate.events({
  'keyup [name="paidAmount"]': function() {
    var dueAmount, paidAmount;
    dueAmount = parseFloat($('[name="dueAmount"]').val());
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
      $('[name="outstandingAmount"]').val(dueAmount - parseFloat(
        paidAmount));
      $('[name="sumPaidAmount"]').val(oldSumPaid + parseFloat(paidAmount));

    }
  }
});
Template.rice_purchaseQuickPaymentUpdateTemplate.onRendered(function() {
  Session.set('oldPaidAmount', this.data.paidAmount);
  Session.set('oldSumPaidAmount', this.data.sumPaidAmount);
});
Template.rice_purchaseQuickPaymentUpdateTemplate.helpers({
  getSupplier: function(id) {
    var supplier = ReactiveMethod.call('getSupplier', id);
    return supplier.name;
  },
});
datePicker = function(currentInvoiceId) {
  paymentDate = $('[name="paymentDate"]');
  return DateTimePicker.dateTime(paymentDate);
};
Template.rice_purchaseQuickPaymentUpdateTemplate.onDestroyed(function() {
  Session.set('oldSumPaidAmount', 0);
  Session.set('sumPaidAmount', 0);
});
Template.rice_purchaseQuickPaymentInsertTemplate.onDestroyed(function() {
  Session.set('oldSumPaidAmount', 0);
  Session.set('sumPaidAmount', 0);
});
