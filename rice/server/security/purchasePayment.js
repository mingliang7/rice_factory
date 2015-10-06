// Customer
Rice.Collection.PurchasePayment.permit(['insert', 'update', 'remove'])
  .rice_ifGeneral()
  .apply();
