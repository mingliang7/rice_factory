
AutoForm.hooks({
  rice_quickPaymentInsertTemplate: {
    before: {
      insert: function(doc) {
        doc.branchId = Session.get('currentBranch');
        return doc;
      }
    },
    onSuccess: function(formType, result) {
      id = Session.get('invioceReportId');
      alertify.success('Successfully');
      alertifyName = Session.get('alertifyName');
      if(alertifyName){
        alertify[alertifyName]().close();
      }else{
        alertify.quickPayment().close();
      }
      if(!_.isUndefined(id)){
        GenReport(id);
        Session.set('invioceReportId', undefined);
      }
      Session.set('alertifyName', undefined);
    },
    onError: function(formType, error) {
      return alertify.error(error.message);
    }
  }
});
