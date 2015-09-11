Meteor.methods
  getSaleItem:(id) ->
    Rice.Collection.SaleItem.findOne(id)
