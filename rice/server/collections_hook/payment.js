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

Rice.Collection.Payment.before.update(function(userId, doc, fieldNames, modifier, options) {

  if(modifier.$set.outstandingAmount == 0){
    modifier.$set.status = 'closed';
  }else{
    modifier.$set.status = 'active';
  }
});

Rice.Collection.Payment.after.update(function(userId, doc){
  var preDoc = this.previous;
  Meteor.defer(function(){
    updateSale(doc, true, preDoc);
  });
});

Rice.Collection.Payment.after.remove(function(userId, doc){
  Meteor.defer(function(){
    removePaymentFromSale(doc);
  });
});

//for remove
var removePaymentFromSale = function(doc){

  var sale = Rice.Collection.Sale.findOne(doc.saleId);
  var paidAmount = sale.paidAmount - doc.paidAmount;
  var outstandingAmount = sale.outstandingAmount + doc.paidAmount;
  Rice.Collection.Sale.direct.update({_id: sale._id},
    {
      $set: {
        status: 'active',
        statusDate: sale.saleDate,
        paidAmount: paidAmount,
        outstandingAmount: outstandingAmount
      }
    }
  );
};


// for update and insert
var updateSale = function(doc, update, oldDoc) {
  var sale = Rice.Collection.Sale.findOne(doc.saleId);
  var paidAmount, outstandingAmount, selector;
  if(update){
    console.log('update');
    if(oldDoc.paidAmount > doc.paidAmount){
      outstandingAmount = doc.dueAmount - doc.paidAmount;
      paidAmount = sale.paidAmount  - (oldDoc.paidAmount - doc.paidAmount);
    }else{
      outstandingAmount =  doc.dueAmount - doc.paidAmount;
      paidAmount = sale.paidAmount  +  (doc.paidAmount - oldDoc.paidAmount);
    }
  }else{
    console.log('insert');
    paidAmount = sale.paidAmount + doc.paidAmount;
    outstandingAmount = sale.outstandingAmount -  doc.paidAmount;
  }

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
        status: 'active',
        statusDate: sale.saleDate,
        paidAmount: paidAmount,
        outstandingAmount: outstandingAmount
      }
    }
  }
  return Rice.Collection.Sale.update({
    _id: doc.saleId
  }, selector);
};
