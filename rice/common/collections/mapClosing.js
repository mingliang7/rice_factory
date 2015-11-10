/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Rice.Collection.MapClosing = new Mongo.Collection("riceMapClosing");
/**
 * Schema
 *
 * @type {AccSchema}
 */
Rice.Schema.MapClosing = new SimpleSchema({
  chartAccount: {
    type: String,
    optional: true,
    label: "Chart Account",
  },
  chartAccountCompare: {
    type: String,
    label: "Compare Account",
    autoform: {
      type: "select2",
      options() {
        return Cash.List.chartAccountId();
      }
    }

  }
});
/**
 * Attach schema
 */
Rice.Collection.MapClosing.attachSchema(Rice.Schema.MapClosing);
