// Customer
Rice.Collection.Payment.permit(['insert', 'update', 'remove'])
    .rice_ifGeneral()
    .apply();
