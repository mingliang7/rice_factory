Meteor.methods({
  customerList: function() {
    var list = [{
      label: 'All',
      value: ''
    }];
    var customers = Rice.Collection.Customer.find().fetch();
    customers.forEach(function(customer) {
      list.push({
        label: customer._id + ' | ' + customer.name,
        value: customer._id
      });
    });
    return list;
  }
});
