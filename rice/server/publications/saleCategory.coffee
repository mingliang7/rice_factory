Meteor.publish 'rice_saleCategories', -> 
	if @userId
		@unblock()
		Rice.Collection.SaleCategory.find()