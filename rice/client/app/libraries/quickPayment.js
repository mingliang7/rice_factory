QuickPayment = {
  fireQuickPayment: function(alertifyName, title, doc) {
    Session.set('alertifyName', alertifyName);
    setTimeout(function() {
      alertify[alertifyName](fa('plus', title), renderTemplate(Template
        .rice_quickPayment, doc));
    }, 200);
  },
  fireUpdateQuickPayment: function(alertifyName, title, doc) {
    Session.set('alertifyName', alertifyName);
    setTimeout(function() {
      alertify[alertifyName](fa('plus', title), renderTemplate(Template
        .rice_quickPaymentUpdateTemplate, doc));
    }, 200);
  },
  firePurchaseQuickPayment: function(alertifyName, title, doc) {
    Session.set('alertifyName', alertifyName);
    setTimeout(function() {
      alertify[alertifyName](fa('plus', title), renderTemplate(Template
        .rice_purchaseQuickPayment, doc));
    }, 200);
  },
  fireUpdatePurchaseQuickPayment: function(alertifyName, title, doc) {
    Session.set('alertifyName', alertifyName);
    setTimeout(function() {
      alertify[alertifyName](fa('pencil', title), renderTemplate(
        Template
        .rice_purchaseQuickPaymentUpdateTemplate, doc));
    }, 200);
  }
};
