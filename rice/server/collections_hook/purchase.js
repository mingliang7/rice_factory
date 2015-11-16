/***** Before */
Rice.Collection.Purchase.before.insert(function (userId, doc) {
  var id = doc._id;
  var prefix = doc.branchId + '-';
  doc._id = idGenerator.genWithPrefix(Rice.Collection.Purchase, prefix, 12);
  State.set(id, doc);
});
Rice.Collection.Purchase.before.update(function (userId, doc, fieldNames,
  modifier,
  options) {
  modifier.$set = modifier.$set || {};
  if (modifier.$set.purchaseItems) {
    var purchaseItems = [];
    _.each(modifier.$set.purchaseItems, function (obj) {
      if (!_.isNull(obj)) {
        purchaseItems.push(obj);
      }
    });
    modifier.$set.purchaseItems = purchaseItems;
  }
});
//set categoryId for each item
Rice.Collection.Purchase.after.insert(function (userId, doc) {
  Meteor.defer(function (argument) {
    Meteor._sleepForMs(1500);
    Meteor.call('mapAccountPurchase', doc);
  });
});
