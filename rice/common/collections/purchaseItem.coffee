Rice.Collection.PurchaseItem = new Mongo.Collection 'rice_purchaseItems'

Rice.Schema.PurchaseItem = new SimpleSchema(
	name:
		type: String

	shortName:
		type: String

	cost:
		type: Number
		decimal: true

	price:
		type: Number
		decimal: true

	purchaseCategoryId:
		type: String
)

Rice.Collection.PurchaseItem.attachSchema(Rice.Schema.PurchaseItem)
