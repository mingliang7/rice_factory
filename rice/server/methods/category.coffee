Meteor.methods
  getSaleCategory: (id)->
    Rice.Collection.SaleCategory.findOne(id)
  getPurchaseCategory: (id)->
    Rice.Collection.PurchaseCategory.findOne(id)
