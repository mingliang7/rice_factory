// Collection
//Rice.Collection.Customer.cacheTimestamp();
Rice.Collection.Customer.cacheDoc('address', Rice.Collection.Address, ['name']);
Rice.Collection.Customer.cacheCount('saleCount', Rice.Collection.Sale, 'customerId')