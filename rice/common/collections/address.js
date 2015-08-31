// Collection
Rice.Collection.Address = new Mongo.Collection("rice_address");

// Schema
Rice.Schema.Address = new SimpleSchema({
    name: {
        type: String,
        label: "Address"
    }
});

// Attach schema
Rice.Collection.Address.attachSchema(Rice.Schema.Address);

// Attach soft remove
Rice.Collection.Address.attachBehaviour('softRemovable');