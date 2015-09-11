Report = {
  quickInvoice: function(id) {
    var doc, q, url;
    url = "invoiceReportGen/" + id;
    return window.open(url, '_blank');
  },
  saleInvoice: function(id) {
    var doc, q, url;
    url = "invoiceReportGen/" + id;
    return window.open(url, '_blank');
  }
};
