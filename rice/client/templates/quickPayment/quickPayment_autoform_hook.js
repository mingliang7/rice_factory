AutoForm.hooks({
  rice_quickPaymentInsertTemplate: {
    before: {
      insert: function(doc) {
        doc.branchId = Session.get('currentBranch');
        return doc;
      }
    },
    onSuccess: function(formType, _id) {
      var payNprint = Session.get('payNprint');
      alertify.success('Successfully');
      alertifyName = Session.get('alertifyName');
      if (alertifyName) {
        alertify[alertifyName]().close();
      } else {
        alertify.quickPayment().close();
      }
      if (payNprint) {
        Meteor.call('getSaleIdWithPayment', _id, function(err, saleId) {
          if (saleId) {
            Report.quickInvoice(saleId);
          }
        });
        Session.set('payNprint', undefined);
      }
      Session.set('alertifyName', undefined);
    },
    onError: function(formType, error) {
      return alertify.error(error.message);
    }
  },
  rice_quickPaymentUpdateTemplate: {
    docToForm: function(doc, ss) {
      doc.paymentDate = moment(doc.paymentDate).format(
        'YYYY-MM-DD HH:mm:ss');
      return doc;
    },
    onSuccess: function(formType, result) {
      var alertifyName = Session.get('alertifyName');
      alertify[alertifyName]().close();
      alertify.success('Successfully updated');
      Session.set('alertifyName', undefined);
    },
    onError: function(formType, error) {
      return alertify.error(error.message);
    }
  }

});
