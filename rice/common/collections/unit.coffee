Rice.Collection.Unit = new Mongo.Collection('rice_units');
Rice.Schema.Unit = new SimpleSchema(
  name:
    type: String

  shortName:
    type: String
)

Rice.Collection.Unit.attachSchema(Rice.Schema.Unit)
