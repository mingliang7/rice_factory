Rice.Schema.SaleReport = new SimpleSchema(
  customer:
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

  type:
    type: String
    optional: true
    autoform:
      type: 'select2'
      options: ->
        Rice.ListForReport.type()


)
