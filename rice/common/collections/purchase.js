// Collection
Rice.Collection.Purchase = new Mongo.Collection("rice_purchase");

// Schema
Rice.Schema.Purchase = new SimpleSchema({
  purchaseDate: {
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
  supplierId: {
    type: String
      //autoform: {
      //    type: "select2",
      //    options: function () {
      //        return Rice.List.customer();
      //    }
      //}
  },
  purchaseItems: {
    type: Array
  },
  'purchaseItems.$': {
    type: Object
  },
  'purchaseItems.$.purchaseItemId': {
    type: String,
    label: 'PurchaseItem',
  },
  'purchaseItems.$.qty': {
    type: Number,
    decimal: true,
    label: 'Qty'
  },
  'purchaseItems.$.cost': {
    type: Number,
    decimal: true
  },
  'purchaseItems.$.lineCost': {
    type: Number,
    decimal: true
  },
  'purchaseItems.$.price': {
    type: Number,
    decimal: true,
    label: 'Price'
  },
  'purchaseItems.$.discount': {
    type: Number,
    decimal: true,
    label: 'Discount'
  },
  'purchaseItems.$.amount': {
    type: Number,
    decimal: true,
    label: 'Amount'
  },
  'purchaseItems.$.purchaseCategoryId': {
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
Rice.Collection.Purchase.attachSchema(Rice.Schema.Purchase);

// Attach soft remove
Rice.Collection.Purchase.attachBehaviour('softRemovable');
