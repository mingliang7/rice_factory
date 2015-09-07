Rice.Collection.Payment.before.insert(function(userId, doc) {
  var prefix = doc.branchId + '-';
  doc._id = idGenerator.genWithPrefix(Rice.Collection.Payment, prefix, 14);
  if (doc.outstandingAmount == 0) {
    doc.status = 'closed';
  } else {
    doc.status = 'active';
  }

});
Rice.Collection.Payment.after.insert(function(userId, doc) {
  Meteor.defer(function() {
    Meteor._sleepForMs(1000);
    updateSale(doc);
  });
});
var updateSale = function(doc) {
  var sale = Rice.Collection.Sale.findOne(doc.saleId);
  var paidAmount = sale.paidAmount + doc.paidAmount;
  var outstandingAmount = sale.outstandingAmount -  doc.paidAmount;
  var selector;
  if(outstandingAmount == 0 ){
    selector = {
      $set: {
        status: 'closed',
        statusDate: doc.paymentDate,
        paidAmount: paidAmount,
        outstandingAmount: outstandingAmount
      }
    }
  }else{
    selector = {
      $set: {
        paidAmount: paidAmount,
        outstandingAmount: outstandingAmount
      }
    }
  }
  return Rice.Collection.Sale.update({
    _id: doc.saleId
  }, selector);

};
