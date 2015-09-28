Rice.Collection.SaleItem = new Mongo.Collection 'rice_saleItems'

Rice.Schema.SaleItem = new SimpleSchema(
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

	saleCategoryId:
		type: String

	unit:
		type: String
		autoform:
			type: 'select2'
			options: ->
				Rice.List.unit()
)

Rice.Collection.SaleItem.attachSchema(Rice.Schema.SaleItem)
