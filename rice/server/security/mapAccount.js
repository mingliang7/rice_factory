// Customer
Rice.Collection.MapAccount.permit(['insert', 'update', 'remove'])
  .rice_ifGeneral()
  .apply();
