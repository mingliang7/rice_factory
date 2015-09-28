/***** Before */
Rice.Collection.Customer.before.insert(function(userId, doc) {
  var prefix = doc.branchId + '-';
  doc._id = idGenerator.genWithPrefix(Rice.Collection.Customer,
    prefix, 4);
});
//Rice.Collection.Customer.before.update(function (userId, doc, fieldNames, modifier, options) {
//});
