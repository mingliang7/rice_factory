Template.rice_navbar.helpers({
  totalCount: function() {
    var sale = Counts.get('saleCount');
    var purchase = Counts.get('purchaseCount');
    return sale + purchase;
  }
});
