// Customer
Cash.Collection.Staff.permit(['insert', 'update', 'remove'])
    .cash_ifGeneral()
    .apply();
