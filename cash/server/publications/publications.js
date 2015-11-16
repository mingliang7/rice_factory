// Customer
Meteor.publish('cash_customer', function () {
    if (this.userId) {
        return Cash.Collection.Customer.find();
    }
});

// Address
Meteor.publish('cash_address', function () {
    if (this.userId) {
        return Cash.Collection.Address.find();
    }
});
// Staff
Meteor.publish('cash_staff', function () {
    if (this.userId) {
        return Cash.Collection.Staff.find();
    }
});
// chartAccount
Meteor.publish('cash_chartAccount', function () {
    if (this.userId) {
        return Cash.Collection.ChartAccount.find();
    }
});

Meteor.publish('cash_accountType', function () {
    if (this.userId) {
        return Cash.Collection.AccountType.find();
    }
});
Meteor.publish('cash_journal', function () {
    if (this.userId) {
        return Cash.Collection.Journal.find();
    }
});
Meteor.publish('cash_currency', function () {
    if (this.userId) {
        return Cash.Collection.Currency.find();
    }
});
Meteor.publish('cash_openingClosingBalance', function () {
    if (this.userId) {
        return Cash.Collection.OpeningClosingBalance.find();
    }
});