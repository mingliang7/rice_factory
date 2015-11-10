// Customer
Cash.Collection.Customer.permit(['insert', 'update', 'remove'])
    .cash_ifGeneral()
    .apply();
