// Collection
//Rice.Collection.Sale.cacheTimestamp();
Rice.Collection.Sale.cacheDoc('customer', Rice.Collection.Customer, ['name',
  'gender', '_address', 'telephone'
]);
Rice.Collection.Sale.cacheDoc('staff', Rice.Collection.Staffs, ['name',
  'gender'
]);
Rice.Collection.Sale.cacheCount('paymentCount', Rice.Collection.Payment,
  'saleId');
