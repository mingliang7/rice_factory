Meteor.methods
  purchaseItem: (id) ->
    Rice.Collection.Purchase.findOne(id)
