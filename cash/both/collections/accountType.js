// Collection
Cash.Collection.AccountType = new Mongo.Collection("cash_accountType");

// Schema
Cash.Schema.AccountType = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    }
});

// Attach schema
Cash.Collection.AccountType.attachSchema(Cash.Schema.AccountType);
