Rice.Collection.Payment = new Mongo.Collection "rice_payments"

Rice.Schema.Payment = new SimpleSchema(
  paymentDate:
    type: Date
    defaultValue: ->
      moment().format('YYYY-MM-DD HH:mm:ss')
  dueAmount:
    type: Number
    decimal: true

  paidAmount:
    type: Number
    decimal: true

  sumPaidAmount:
    type: Number
    decimal: true

  outstandingAmount:
    type: Number
    decimal: true

  saleId:
    type: String

  customerId:
    type: String

  branchId:
    type: String
  staffId:
    type: String
    label: 'Staff'
    autoform:
      type: 'select2'
      options: ->
        Rice.List.staff()

)
Rice.Collection.Payment.attachSchema(Rice.Schema.Payment);
