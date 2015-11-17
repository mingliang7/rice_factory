Rice.Collection.PurchasePayment.before.insert(function (userId, doc) {
  var prefix = doc.branchId + '-';
  id = doc._id;
  doc._id = idGenerator.genWithPrefix(Rice.Collection.PurchasePayment,
    prefix, 14);
  if (doc.outstandingAmount == 0) {
    doc.status = 'closed';
  } else {
    doc.status = 'active';
  }
  doc.accountId = Meteor.call("mapAccount", doc, 'purchase');
  StatePayment.set(id, doc);
});

Rice.Collection.PurchasePayment.after.insert(function (userId, doc) {
  Meteor.defer(function () {
    Meteor._sleepForMs(1000);
    updatePurchase(doc);
  });
});

Rice.Collection.PurchasePayment.before.update(function (userId, doc, fieldNames,
  modifier, options) {

  if (modifier.$set.outstandingAmount == 0) {
    modifier.$set.status = 'closed';
  } else {
    modifier.$set.status = 'active';
  }
});

Rice.Collection.PurchasePayment.after.update(function (userId, doc) {
  var preDoc = this.previous;
  Meteor.defer(function () {
    updatePurchase(doc, true, preDoc);
    Meteor.call("mapAccountUpdate", doc, 'purchase');
  });
});

Rice.Collection.PurchasePayment.after.remove(function (userId, doc) {
  Meteor.defer(function () {
    removePurchasePaymentFromPurchase(doc);
    Meteor.call('mapAccountRemove', doc.accountId);
  });
});

//for remove
var removePurchasePaymentFromPurchase = function (doc) {

  var purchase = Rice.Collection.Purchase.findOne(doc.purchaseId);
  var paidAmount = purchase.paidAmount - doc.paidAmount;
  var outstandingAmount = purchase.outstandingAmount + doc.paidAmount;
  Rice.Collection.Purchase.direct.update({
    _id: purchase._id
  }, {
    $set: {
      status: 'active',
      statusDate: purchase.purchaseDate,
      paidAmount: paidAmount,
      outstandingAmount: outstandingAmount
    }
  });
};


// for update and insert
var updatePurchase = function (doc, update, oldDoc) {
  var purchase = Rice.Collection.Purchase.findOne(doc.purchaseId);
  var paidAmount, outstandingAmount, selector;
  if (update) {
    console.log('update');
    if (oldDoc.paidAmount > doc.paidAmount) {
      outstandingAmount = doc.dueAmount - doc.paidAmount;
      paidAmount = purchase.paidAmount - (oldDoc.paidAmount - doc.paidAmount);
    } else {
      outstandingAmount = doc.dueAmount - doc.paidAmount;
      paidAmount = purchase.paidAmount + (doc.paidAmount - oldDoc.paidAmount);
    }
  } else {
    console.log('insert');
    paidAmount = purchase.paidAmount + doc.paidAmount;
    outstandingAmount = purchase.outstandingAmount - doc.paidAmount;
  }

  if (outstandingAmount == 0) {
    selector = {
      $set: {
        status: 'closed',
        statusDate: doc.paymentDate,
        paidAmount: paidAmount,
        outstandingAmount: outstandingAmount
      }
    }
  } else {
    selector = {
      $set: {
        status: 'active',
        statusDate: purchase.purchaseDate,
        paidAmount: paidAmount,
        outstandingAmount: outstandingAmount
      }
    }
  }
  return Rice.Collection.Purchase.update({
    _id: doc.purchaseId
  }, selector);
};
