Rice.Collection.Payment = new Mongo.Collection "rice_payments"

Rice.Schema.Payment = new SimpleSchema(
  paymentDate:
    type: Date

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
)
Rice.Collection.Payment.attachSchema(Rice.Schema.Payment);
