Meteor.publish 'rice_saleCategories', ->
	if @userId
		@unblock()
		Rice.Collection.SaleCategory.find()

Meteor.publish "rice_purchaseCategories", () ->
	if @userId
		Rice.Collection.PurchaseCategory.find()
