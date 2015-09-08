
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
      QuickPayment.fireUpdateQuickPayment('saleQuickPayment', 'Edit Payment', data);
  }
});
