// Publication
// Meteor.publish('rice_saleByCustomer', function (customerId) {
//     if (this.userId) {
//         return Rice.Collection.Sale.find({customerId: customerId}, {removed: true});
//     }
// });

Meteor.publish("rice_saleList", function() {
  if (this.userId) {
    Counts.publish(this, 'saleCount', Rice.Collection.Sale.find({
      status: 'active'
    }));
    this.ready();
  }
});
