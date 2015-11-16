/***** Before */
Rice.Collection.Sale.before.insert(function (userId, doc) {
	var id = doc._id;
	var prefix = doc.branchId + '-';
	doc._id = idGenerator.genWithPrefix(Rice.Collection.Sale, prefix, 12);
	State.set(id, doc);
});
Rice.Collection.Sale.before.update(function (userId, doc, fieldNames, modifier,
	options) {
	modifier.$set = modifier.$set || {};
	if (modifier.$set.saleItems) {
		var saleItems = [];
		_.each(modifier.$set.saleItems, function (obj) {
			if (!_.isNull(obj)) {
				saleItems.push(obj);
			}
		});
		modifier.$set.saleItems = saleItems;
	}
});
//set categoryId for each item
Rice.Collection.Sale.after.insert(function (userId, doc) {
	Meteor.defer(function () {
		Meteor._sleepForMs(1500);
		Meteor.call("mapAccountSale", doc);
	});
});
