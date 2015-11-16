// Customer
Cash.Collection.OpeningClosingBalance.permit(['insert', 'update', 'remove'])
    .cash_ifGeneral()
    .apply();
