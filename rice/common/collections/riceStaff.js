Rice.Collection.Staffs = new Mongo.Collection('rice_staffs');
Rice.Schema.Staffs = new SimpleSchema({
  name: {
    type: String
  },
  gender: {
    type: String,
    autoform: {
      type: 'select2',
      options: function() {
        return Rice.List.gender();
      }
    }
  },
  position: {
    type: String,
    autoform:{
      type: 'select2',
      options: function(){
        return Rice.List.position();
      }
    }
  },
  address: {
    type: String
  },
  telephone: {
    type: String
  },
  createdAt: {
    type: Date,
    autoValue: function() {
      return new Date();
    }
  },
  branchId: {
    type: String,
    optional: true
  }
});

Rice.Collection.Staffs.attachSchema(Rice.Schema.Staffs);
