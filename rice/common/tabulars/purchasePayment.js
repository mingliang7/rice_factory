// Sale
Rice.TabularTable.PurchasePayment = new Tabular.Table({
  name: "rice_purchasePaymentList",
  collection: Rice.Collection.PurchasePayment,
  pagingType: "full_numbers",
  autoWidth: false,
  columnDefs: [{
    "width": "12px",
    "targets": 0
  }],
  purchase: [
    ['1', 'desc']
  ],
  columns: [{
      title: '<i class="fa fa-bars"></i>',
      tmpl: Meteor.isClient && Template.rice_purchasePaymentTableAction
    }, {
      data: "_id",
      title: "ID"
    }, {
      data: "paymentDate",
      title: "Date",
      render: function(val) {
        return moment(val).format('YYYY-MM-DD HH:mm:ss');
      }
    }, {
      data: "purchaseId",
      title: "Purchase ID",
    }, {
      data: 'dueAmount',
      title: 'Due-Amount',
      render: function(val) {
        return formatKh(val);
      }
    }, {
      data: 'paidAmount',
      title: 'Paid-Amount',
      render: function(val) {
        return formatKh(val);
      }
    }, {
      data: 'outstandingAmount',
      title: 'Outstanding',
      render: function(val) {
        return formatKh(val);
      }
    }, {
      data: 'status',
      title: 'status',
      render: function(val) {
        if (val == 'closed') {
          return '<label class="label label-success">' + val +
            '</label>';
        } else {
          return '<label class="label label-warning">' + val +
            '</label>';

        }
      }
    }


  ],
  extraFields: ['sumPaidAmount', 'fadeIn', '_supplier', '_staff',
    'supplierId'
  ]
});
var extract = function(items) {
  var concate = '';
  items.forEach(function(item) {
    concate += '<li>' + 'Item: ' + getItemName(item.purchaseItemId) +
      ', Qty: ' + formatKh(item.qty) +
      ', Price: ' + formatKh(item.price) +
      ', Discount: ' + item.discount + ', Amount: ' +
      formatKh(item.amount) + '</li>';
  });
  return concate;
};

var getItemName = function(id) {
  return Rice.Collection.PurchaseItem.findOne(id).name;
};

var formatKh = function(val) {
  return numeral(val).format('0,0.00');
};
