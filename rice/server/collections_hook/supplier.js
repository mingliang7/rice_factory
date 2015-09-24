/***** Before */
Rice.Collection.Supplier.before.insert(function(userId, doc) {
  var prefix = doc.branchId + '-';
  doc._id = idGenerator.genWithPrefix(Rice.Collection.Supplier,
    prefix, 4);
});
//Rice.Collection.Customer.before.update(function (userId, doc, fieldNames, modifier, options) {
//});
