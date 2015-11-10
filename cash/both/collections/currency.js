/**
 * Collection
 */
Cash.Collection.Currency = new Mongo.Collection("cash_currency");

/**
 * Schema
 */
Cash.Schema.Currency = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true
    },
    symbol: {
        type: String,
        label: "Symbol",
        unique: true
    },
    num: {
        type: String,
        label: "Num",
        unique: true
    }
});

/**
 * Attach schema
 */
Cash.Collection.Currency.attachSchema(Cash.Schema.Currency);
