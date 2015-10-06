Meteor.methods
  getUnit: (id)->
    try
      saleItem = Rice.Collection.SaleItem.findOne(id)
      unit = Rice.Collection.Unit.findOne(saleItem.unit)
      {name: unit.name, shortName: unit.shortName}
    catch e
