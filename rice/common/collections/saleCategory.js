Rice.Collection.SaleCategory = new Mongo.Collection('rice_saleCategories');

Rice.Schema.SaleCategory = new SimpleSchema({
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


Rice.Collection.SaleCategory.attachSchema(Rice.Schema.SaleCategory);