Meteor.methods
  getSaleCategory: (id)->
    Rice.Collection.SaleCategory.findOne(id)
