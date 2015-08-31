// Schema
Rice.Schema.CustomerReport = new SimpleSchema({
    branch: {
        type: String,
        autoform: {
            type: "select2",
            options: function () {
                return Rice.ListForReport.branch();
            }
        },
        optional: true
    },
    name: {
        type: String,
        max: 100,
        optional: true
    },
    date: {
        type: String
    }
});