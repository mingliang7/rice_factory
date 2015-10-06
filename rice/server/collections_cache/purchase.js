// Collection
//Rice.Collection.Purchase.cacheTimestamp();
Rice.Collection.Purchase.cacheDoc('supplier', Rice.Collection.Supplier, ['name',
  'gender', '_address', 'telephone'
]);
Rice.Collection.Purchase.cacheDoc('staff', Rice.Collection.Staffs, ['name',
  'gender'
]);
Rice.Collection.Purchase.cacheCount('paymentCount', Rice.Collection.PurchasePayment,
  'purchaseId');
