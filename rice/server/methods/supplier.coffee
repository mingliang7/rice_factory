Meteor.methods
  getSupplier: (id)->
    Rice.Collection.Customer.findOne(id)
