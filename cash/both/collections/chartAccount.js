/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Cash.Collection.ChartAccount = new Mongo.Collection("cash_chartAccount");
/**
 * Schema
 *
 * @type {AccSchema}
 */
Cash.Schema.ChartAccount = new SimpleSchema({
    code: {
        type: String,
        label: "Code",
        unique: true,
        max: 6
    },
    name: {
        type: String,
        label: "Name"
    },
    parentId: {
        type: String,
        label: "Parent",
        optional: true,
        autoform: {
            type: "select2",
            options: function () {
                return Cash.List.parent()
            }
        }
    },
    accountTypeId: {
        type: String,
        label: "Account Type",
        defaultValue: "40",
        autoform: {
            type: "select2",
            options: function () {
                return Cash.List.accountType();
            }
        }
    },
    level:{
        type: Number
    }
});

/**
 * Attach schema
 */
Cash.Collection.ChartAccount.attachSchema(Cash.Schema.ChartAccount);
