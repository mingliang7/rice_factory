/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Rice.Collection.MapAccount = new Mongo.Collection("rice_mapAccount");
/**
 * Schema
 *
 * @type {AccSchema}
 */
Rice.Schema.MapAccount = new SimpleSchema({
  chartAccount: {
    type: String,
    optional: true,
    label: "Chart Account",
  },
  chartAccountCompare: {
    type: String,
    max: 200,
    label: "Compare Account",
    autoform: {
      type: 'select2',
      options: function () {
        return Cash.List.chartAccountId();
      }
    }

  },
  type: {
    type: String,
    autoform: {
      type: 'select2',
      options: function () {
        return Rice.List.productType();
      }
    }
  }
});
/**
 * Attach schema
 */
Rice.Collection.MapAccount.attachSchema(Rice.Schema.MapAccount);
