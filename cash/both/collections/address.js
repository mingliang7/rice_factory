/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Cash.Collection.Address = new Mongo.Collection("cash_address");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Cash.Schema.Address = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        unique: true,
        max: 200
    }
});

/**
 * Attach schema
 */
Cash.Collection.Address.attachSchema(Cash.Schema.Address);
