
Template.rice_payment.onRendered(function(){
  createNewAlertify('saleQuickPayment');
});
Template.rice_payment.helpers({
  selector: function(){
    var customerId = FlowRouter.getParam('customerId');
    var saleId = FlowRouter.getParam('saleId');
    return {customerId: customerId, saleId: saleId};
  },
  saleId: function() {
    var saleId = FlowRouter.getParam('saleId');
    return saleId;
  },
  customer: function(){
    var saleId = FlowRouter.getParam('saleId');
    var sale = ReactiveMethod.call('saleItem', saleId);
    return sale.customerId + ' | ' + sale._customer.name ;
  }
});
Template.rice_payment.events({
  "click .insert": function(event, template){
    var saleId = FlowRouter.getParam('saleId');
    Meteor.call('saleItem', saleId, function(err, result){
      if(result.outstandingAmount == 0 ){
        alertify.warning('Payment #' + result._id + ' has been paid!');
      }else{
        QuickPayment.fireQuickPayment('saleQuickPayment', 'Payment', result);
      }
    });
  },
  'click .update': function() {
      var data = this;
      var id = this._id;
      Meteor.call('checkAvailable', this._id, this.saleId, function(err,result){
        if(result){
          QuickPayment.fireUpdateQuickPayment('saleQuickPayment', 'Edit Payment', data);
        }else{
          alertify.warning('Payment #' + id + ' is not the last record!');
        }
      });
  },
  'click .remove': function() {
    var self = this;
    Meteor.call('checkAvailable', self._id, self.saleId, function(err, result){
      console.log(result)
      if(!result){
        alertify.warning('Sorry payment #' + self._id + ' not the last record!');
      }else{
        alertify.confirm(
            fa("remove", "Sale"),
            "Are you sure to delete [" + self._id + "]?",
            function () {
                Meteor.call('removePayment',self._id, function (err,result) {
                    if (err) {
                        alertify.warning(err);
                    } else {
                        alertify.success("Success");
                    }
                });
            },
            null
        );
      }
    });
  }
});
