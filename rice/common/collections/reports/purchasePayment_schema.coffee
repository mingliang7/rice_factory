Rice.Schema.PurchasePaymentReport = new SimpleSchema(
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
  staff:
    type: String
    optional: true
    autoform:
      type: 'select2'
      options: ->
        Rice.ListForReport.staff()

  branch:
    type: String
    autoform:
      type: 'select2'
      options: ->
        Rice.ListForReport.branch()

)
