Rice.Schema.PurchaseByItem = new SimpleSchema(
  category:
    type: String
    optional: true
    autoform:
      type: 'select2'
      options: ->
        Rice.List.purchaseCategories()
  item:
    type: String
    optional: true
    autoform:
      type: 'select2'
      options: ->
        Rice.ListForReport.itemByPurchaseCategory()

  date:
    type: String

  exchange:
    type: String
    autoform:
      type: 'select2'
      options: ->
        Rice.List.exchange()

  branch:
    type: String
    autoform:
      type: 'select2'
      options: ->
        Rice.ListForReport.branch()


)
