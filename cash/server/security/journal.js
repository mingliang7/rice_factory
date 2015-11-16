// Customer
Cash.Collection.Journal.permit(['insert', 'update', 'remove'])
    .cash_ifGeneral()
    .apply();

Cash.Collection.Journal.permit(['insert', 'update', 'remove'])
    .cash_ifAdmin()
    .apply();
