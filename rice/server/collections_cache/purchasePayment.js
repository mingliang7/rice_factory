Rice.Collection.Purchase.cacheDocBack('payment', Rice.Collection.PurchasePayment, [
    'paymentDate',
    'dueAmount',
    'outstandingAmount',
    'paidAmount',
    'sumPaidAmount',
    'status'
  ],
  'purchaseId'
);

Rice.Collection.PurchasePayment.cacheDoc('supplier', Rice.Collection.Supplier, [
  'name',
  'gender', 'telephone'
]);
Rice.Collection.PurchasePayment.cacheDoc('staff', Rice.Collection.Staffs, [
  'name',
  'gender'
]);
