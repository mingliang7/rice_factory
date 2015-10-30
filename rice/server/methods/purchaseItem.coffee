Meteor.methods
  checkAvailableItemInPurchase: (purchaseItemId) ->
    flag = Rice.Collection.Purchase.find({purchaseItems:{$elemMatch: {purchaseItemId: purchaseItemId}}}).fetch()
    if flag.length > 0
      {flag: false}
    else
      {flag: true}
