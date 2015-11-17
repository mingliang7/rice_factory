Rice.Collection.PurchasePayment = new Mongo.Collection "rice_purchasePayments"

Rice.Schema.PurchasePayment = new SimpleSchema(
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

  purchaseId:
    type: String

  supplierId:
    type: String

  branchId:
    type: String
  accountId:
    type: String
    optional: true
  staffId:
    type: String
    label: 'Staff'
    autoform:
      type: 'select2'
      options: ->
        Rice.List.staff()

)
Rice.Collection.PurchasePayment.attachSchema(Rice.Schema.PurchasePayment);
