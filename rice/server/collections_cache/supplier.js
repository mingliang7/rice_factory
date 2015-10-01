// Collection
//Rice.Collection.Supplier.cacheTimestamp();
Rice.Collection.Supplier.cacheDoc('address', Rice.Collection.Address, ['name']);
Rice.Collection.Supplier.cacheCount('purchaseCount', Rice.Collection.Purchase,
  'supplierId');
