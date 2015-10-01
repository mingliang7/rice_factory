Rice.Collection.PurchaseItem = new Mongo.Collection 'rice_purchaseItems'

Rice.Schema.PurchaseItem = new SimpleSchema(
	name:
		type: String

	shortName:
		type: String

	price:
		type: Number
		decimal: true

	unit:
		type: String
		autoform:
			type: 'select2'
			options: ->
				Rice.List.unit()
	purchaseCategoryId:
		type: String
)

Rice.Collection.PurchaseItem.attachSchema(Rice.Schema.PurchaseItem)
