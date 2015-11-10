/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Cash.Collection.OpeningClosingBalance = new Mongo.Collection("cash_openingClosingBalance");
/**
 * Schema
 *
 * @type {AccSchema}
 */
Cash.Schema.OpeningClosingBalance = new SimpleSchema({

    value: {
        type: Object,
    },
    'value.KHR': {
        type: Number,
        label: "KHR",
        decimal: true,
        min: 0
    },
    'value.USD': {
        type: Number,
        label: "USD",
        decimal: true,
        min: 0
    },

    'value.THB': {
        type: Number,
        label: "THB",
        decimal: true,
        min: 0
    },
    date: {
        type: String,
        label: "Date",
        defaultValue: function () {
            var currentDate = moment(ReactiveMethod.call("currentDate"), 'YYYY-MM-DD H:mm:ss').format('YYYY-MM-DD');
            return currentDate;
        }
    },
    status: {
        type: String,
        label: "Status",
        optional: true
    }
});

/**
 * Attach schema
 */
Cash.Collection.OpeningClosingBalance.attachSchema(Cash.Schema.OpeningClosingBalance);
