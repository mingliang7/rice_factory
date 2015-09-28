// Collection
Rice.Collection.Customer = new Mongo.Collection("rice_customer");

// Schema
Rice.Schema.Customer = new SimpleSchema({
  name: {
    type: String,
    label: "Name"
      //unique: true,
      //max: 200
  },
  gender: {
    type: String,
    label: "Gender",
    autoform: {
      type: "select2",
      options: function() {
          return Rice.List.gender();
        }
        //type: "selectize",
        //afFieldInput: {
        //    multiple: true,
        //    selectizeOptions: {}
        //}
    }
  },
  status: {
    type: String,
    label: "Status",
    autoform: {
      type: 'select2',
      options: function() {
        return Rice.List.status();
      }
    }
  },
  address: {
    type: String,
    optional: true,
    label: "Address",
  },
  telephone: {
    type: String,
    label: "Telephone",
    optional: true
  },
  email: {
    type: String,
    label: "Email",
    regEx: SimpleSchema.RegEx.Email,
    optional: true
  },
  photo: {
    type: String,
    autoform: {
      afFieldInput: {
        type: 'fileUpload',
        collection: 'Files',
        accept: 'image/*'
      }
    },
    optional: true
  },
  branchId: {
    optional: true,
    type: String,
    label: "Branch"
  },
  type: {
    type: String,
    autoform: {
      type: 'select2',
      options: function() {
        return Rice.List.type();
      }
    }
  }
});

// Attach schema
Rice.Collection.Customer.attachSchema(Rice.Schema.Customer);

// Attach soft remove
Rice.Collection.Customer.attachBehaviour('softRemovable');
