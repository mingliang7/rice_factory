Rice.Collection.Payment.before.insert(function(userId, doc) {
  var prefix = doc.branchId + '-';
  doc._id = idGenerator.genWithPrefix(Rice.Collection.Payment, prefix, 14);
  if (doc.outstandingAmount) {
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
  var sale = Rice.Collection.Sale.findOne(doc._id);
  var paidAmount = sale.paidAmount + doc.paidAmount;
  var outstandingAmount = sale.outstandingAmount + doc.outstandingAmount;
  Rice.Collection.Sale.update({
    _id: doc._id
  }, {
    $set: {
      paidAmount: paidAmount,
      outstandingAmount: outstandingAmount
    }
  });

};
