Rice.Collection.Sale.cacheDocBack('payment', Rice.Collection.Payment, [
    'paymentDate',
    'dueAmount',
    'outstandingAmount',
    'paidAmount',
    'sumPaidAmount',
    'status'
  ],
  'saleId'
);

Rice.Collection.Payment.cacheDoc('customer', Rice.Collection.Customer, ['name',
  'gender', 'telephone'
]);
Rice.Collection.Payment.cacheDoc('staff', Rice.Collection.Staffs, ['name',
  'gender'
]);
