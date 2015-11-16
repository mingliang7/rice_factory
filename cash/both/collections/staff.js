/**
 * Collection
 *
 * @type {Mongo.Collection}
 */
Cash.Collection.Staff = new Mongo.Collection("cash_staff");

/**
 * Schema
 *
 * @type {SimpleSchema}
 */
Cash.Schema.Staff = new SimpleSchema({
  name: {
    type: String,
    label: "Name",
    unique: true,
    max: 200
  },
  gender: {
    type: String,
    label: "Gender",
    autoform: {
      type: "select2",
      options: function () {
        return Cash.List.gender();
      }
    }
  },
  dob: {
    type: String,
    label: "Date of Birth",
    optional: true
  },
  address: {
    type: String,
    label: "Address",
    autoform: {
      type: "select2",
      options: function () {
        return Cash.List.address();
      }
    }
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
    type: String,
    label: "Branch"
  }
});

/**
 * Attach schema
 */
Cash.Collection.Staff.attachSchema(Cash.Schema.Staff);
