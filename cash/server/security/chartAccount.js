// Customer
Cash.Collection.ChartAccount.permit(['insert', 'update', 'remove'])
    .cash_ifGeneral()
    .apply();
