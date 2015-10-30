// Collection
Rice.Collection.Sale = new Mongo.Collection("rice_sale");

// Schema
Rice.Schema.Sale = new SimpleSchema({
  saleDate: {
    type: Date,
    defaultValue: function() {
      return moment().format('YYYY-MM-DD HH:mm:ss');
    }
  },
  exchange: {
    type: String,
    label: 'Exchange',
    autoform: {
      type: 'select2',
      options: function() {
        return Rice.List.exchange();
      }
    }
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
  'saleItems.$.saleItemId': {
    type: String,
    label: 'SaleItem',
  },
  'saleItems.$.qty': {
    type: Number,
    decimal: true,
    label: 'Qty'
  },
  'saleItems.$.cost': {
    type: Number,
    decimal: true
  },
  'saleItems.$.lineCost': {
    type: Number,
    decimal: true
  },
  'saleItems.$.price': {
    type: Number,
    decimal: true,
    label: 'Price'
  },
  'saleItems.$.discount': {
    type: Number,
    decimal: true,
    optional: true,
    label: 'Discount'
  },
  'saleItems.$.amount': {
    type: Number,
    decimal: true,
    label: 'Amount'
  },
  'saleItems.$.saleCategoryId': {
    type: String,
    optional: true
  },
  des: {
    type: String,
    label: "Description",
    optional: true
  },
  profit: {
    type: Number,
    decimal: true
  },
  subDiscount: {
    type: Number,
    decimal: true,
    optional: true,
    label: 'Sub-Discount'
  },
  subTotal: {
    type: Number,
    decimal: true,
    optional: true,
    label: 'Sub-Total'
  },
  total: {
    type: Number,
    decimal: true,
    label: 'Total'
  },
  branchId: {
    type: String,
    label: "Branch",
    optional: true
  },
  paidAmount: {
    type: Number,
    decimal: true,
    optional: true

  },
  outstandingAmount: {
    type: Number,
    decimal: true,
    optional: true
  },
  status: {
    type: String
  },
  statusDate: {
    type: Date
  },
  staffId: {
    type: String,
    label: 'Staff',
    autoform: {
      type: 'select2',
      options: function() {
        return Rice.List.staff();
      }
    }
  }
});

// Attach schema
Rice.Collection.Sale.attachSchema(Rice.Schema.Sale);

// Attach soft remove
Rice.Collection.Sale.attachBehaviour('softRemovable');
