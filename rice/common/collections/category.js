Rice.Collection.Category = new Mongo.Collection('rice_categories');

Rice.Schema.Category = new SimpleSchema({
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


Rice.Collection.Category.attachSchema(Rice.Schema.Category);