Meteor.publish("rice_purchaseCount", function() {
  if (this.userId) {
    Counts.publish(this, 'purchaseCount', Rice.Collection.Purchase.find({
      status: 'active'
    }));
    this.ready();
  }
});
