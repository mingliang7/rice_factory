Rice.Schema.SaleByItem = new SimpleSchema(
  category:
    type: String
    optional: true
    autoform:
      type: 'select2'
      options: ->
        Rice.List.saleCategories()
  item:
    type: String
    optional: true
    autoform:
      type: 'select2'
      options: ->
        Rice.ListForReport.itemByCategory()

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
