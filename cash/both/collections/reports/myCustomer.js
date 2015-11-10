/**
 * Schema
 */
Cash.Schema.MyCustomerReport = new SimpleSchema({
    name: {
        type: String,
        label: "Name",
        max: 100,
        optional: true
    },
    date: {
        type: String,
        label: "Date"
    }
});