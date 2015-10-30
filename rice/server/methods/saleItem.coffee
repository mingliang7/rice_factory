Meteor.methods
  getSaleItem:(id) ->
    Rice.Collection.SaleItem.findOne(id)

  checkAvailableItemInSale: (saleItemId) ->
    flag = Rice.Collection.Sale.find({saleItems:{$elemMatch: {saleItemId: saleItemId}}}).fetch()
    if flag.length > 0
      {flag: false}
    else
      {flag: true}
