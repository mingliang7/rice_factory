Rice.Schema.PurchaseDetail = new SimpleSchema(
  supplier:
    type: String
    optional: true

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
