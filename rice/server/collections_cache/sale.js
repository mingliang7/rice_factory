// Collection
//Rice.Collection.Sale.cacheTimestamp();
Rice.Collection.Sale.cacheDoc('customer', Rice.Collection.Customer, ['name', 'gender', '_address']);
Rice.Collection.Sale.cacheCount('paymentCount', Rice.Collection.Payment, 'saleId');
