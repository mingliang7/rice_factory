
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
  },
  rice_quickPaymentUpdateTemplate: {
    docToForm: function(doc,ss){
      doc.paymentDate = moment(doc.paymentDate).format('YYYY-MM-DD HH:mm:ss');
      return doc;
    },
    onSuccess: function(formType, result){
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
