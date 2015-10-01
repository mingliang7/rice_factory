Rice.Collection.PurchaseCategory = new Mongo.Collection(
	'rice_purchaseCategories');

Rice.Schema.PurchaseCategory = new SimpleSchema({
	name: {
		type: String,
		label: 'Name',
		unique: true
	},
	shortName: {
		type: String,
		label: 'Short Name',
		unique: true
	}
});


Rice.Collection.PurchaseCategory.attachSchema(Rice.Schema.PurchaseCategory);
