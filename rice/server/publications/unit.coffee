Meteor.publish "rice_unit", () ->
  Rice.Collection.Unit.find() if @userId
