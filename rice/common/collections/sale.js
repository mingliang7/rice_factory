// Collection
Rice.Collection.Sale = new Mongo.Collection("rice_sale");

// Schema
Rice.Schema.Sale = new SimpleSchema({
    saleDate: {
        type: Date
    },
    customerId: {
        type: String
        //autoform: {
        //    type: "select2",
        //    options: function () {
        //        return Rice.List.customer();
        //    }
        //}
    },
    items: {
        type: Array
    },
    'items.$': {
        type: Object
    },
    'items.$.itemId':{
        type: String,
        label: 'Item',
    },
    'items.$.qty':{
        type: Number,
        decimal: true,
        label: 'Qty'
    },
    'items.$.cost':{
        type: Number,
        decimal: true
    },
    'items.$.lineCost':{
        type: Number,
        decimal: true
    },
    'items.$.price':{
        type: Number,
        decimal: true,
        label: 'Price'
    },
    'items.$.discount':{
        type: Number,
        decimal: true,
        label: 'Discount'
    },
    'items.$.amount':{
        type: Number,
        decimal: true,
        label: 'Amount'
    },
    'items.$.profit':{
        type: Number,
        decimal: true
    },
    des: {
        type: String,
        label: "Description"
    },
    total: {
        type: Number,
        decimal: true
    },
    cpanel_branchId: {
        type: String,
        label: "Branch"
    }
});

// Attach schema
Rice.Collection.Sale.attachSchema(Rice.Schema.Sale);

// Attach soft remove
Rice.Collection.Sale.attachBehaviour('softRemovable');