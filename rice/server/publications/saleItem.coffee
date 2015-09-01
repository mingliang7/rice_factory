Meteor.publish 'rice_saleItems', (saleCategoryId)->
	if @userId
		@unblock()
		console.log saleCategoryId
		Rice.Collection.SaleItem.find({saleCategoryId: saleCategoryId});

Meteor.publish 'rice_saleItemsCategories', ->
	Rice.Collection.SaleItem.find() if @userId