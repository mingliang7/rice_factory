// Customer
Rice.Collection.Customer.permit(['insert', 'update', 'remove'])
    .rice_ifGeneral()
    .apply();
