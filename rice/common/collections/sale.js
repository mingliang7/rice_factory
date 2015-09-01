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
    saleItems: {
        type: Array
    },
    'saleItems.$': {
        type: Object
    },
    'saleItems.$.saleItemId':{
        type: String,
        label: 'SaleItem',
    },
    'saleItems.$.qty':{
        type: Number,
        decimal: true,
        label: 'Qty'
    },
    'saleItems.$.cost':{
        type: Number,
        decimal: true
    },
    'saleItems.$.lineCost':{
        type: Number,
        decimal: true
    },
    'saleItems.$.price':{
        type: Number,
        decimal: true,
        label: 'Price'
    },
    'saleItems.$.discount':{
        type: Number,
        decimal: true,
        label: 'Discount'
    },
    'saleItems.$.amount':{
        type: Number,
        decimal: true,
        label: 'Amount'
    },
    'saleItems.$.profit':{
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