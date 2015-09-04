Meteor.methods
  saleItem: (id) ->
    Rice.Collection.Sale.findOne(id)
