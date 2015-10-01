// Customer
Rice.Collection.Supplier.permit(['insert', 'update', 'remove'])
  .rice_ifGeneral()
  .apply();
