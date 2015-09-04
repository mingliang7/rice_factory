
AutoForm.hooks({
  ice_quickPaymentInsertTemplate: {
    before: {
      insert: function(doc) {
        doc.branchId = Session.get('currentBranch');
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      id = Session.get('invioceReportId');
      alertify.success('Successfully');
      alertify.quickPayment().close();
      if(!_.isUndefined(id)){
        GenReport(id);
        Session.set('invioceReportId', undefined)
      }
    },
    onError: function(formType, error) {
      return alertify.error(error.message);
    }
  }
});
