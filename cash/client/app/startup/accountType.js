Meteor.startup(function () {
    if (Cash.Collection.AccountType.find().count() == 0) {

        Cash.Collection.AccountType.insert(
            {
                _id: '40',
                name: 'Income'
            }
        );

        Cash.Collection.AccountType.insert(
            {
                _id: '50',
                name: 'Expense'
            }
        );
    }
});