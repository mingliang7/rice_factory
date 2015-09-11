Meteor.methods
  getCustomer: (id)->
    Rice.Collection.Customer.findOne(id)
