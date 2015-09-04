// Sale
Rice.TabularTable.Sale = new Tabular.Table({
    name: "rice_saleList",
    collection: Rice.Collection.Sale,
    pagingType: "full_numbers",
    autoWidth: false,
    columnDefs: [{
        "width": "12px",
        "targets": 0
    }],
    sale: [
        ['1', 'desc']
    ],
    columns: [{
            title: '<i class="fa fa-bars"></i>',
            tmpl: Meteor.isClient && Template.rice_saleAction
        }, 
        {
            data: "_id",
            title: "ID"
        }, 
        {
            data: "saleDate",
            title: "Date"
        }, 
        {
            data: "saleItems",
            title: "Sale Items",
            render: function(val) {
                if(_.isUndefined(val)){
                    return '';
                }
                return extract(val);
            }
        },
        {
            data: "subDiscount",
            title: "Discount",
            render: function(val){
                return formatKh(val);
            }
        },
        {
            data: 'paidAmount', 
            title: 'Paid',
            render: function(val){
                return formatKh(val);
            }
        }, 
        {
            data: 'outstandingAmount',
            title: 'Outstanding',
            render: function(val){
                return formatKh(val);
            }
        },
        {
            data: "total",
            title: "Total",
            render: function(val){
                return formatKh(val);
            }
        } 
        //{data: "customerId", title: "Customer ID"},
        //{
        //    data: "_customer",
        //    title: "Customer Info",
        //    render: function (val, type, doc) {
        //        return JSON.stringify(val, null, ' ');
        //    }
        //}
    ]
});
var extract = function(items) {
    var concate = '';
    items.forEach(function(item) {
        concate += '<li>' + 'Item: ' +getItemName(item.saleItemId) +  
                    ', Qty: ' + formatKh(item.qty) + 
                    ', Price: ' + formatKh(item.price) + 
                     ', Discount: ' + item.discount +  ', Amount: ' +
                    formatKh(item.amount) + '</li>';
    });
    return concate;
}

var getItemName = function(id){
    return Rice.Collection.SaleItem.findOne(id).name;
}

var formatKh = function(val){
    return numeral(val).format('0,0')
}