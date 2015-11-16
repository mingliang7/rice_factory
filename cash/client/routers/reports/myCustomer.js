// Router.route('cash/myCustomerReport', function () {
//     this.render('cash_myCustomerReport');
// }, {
//     name: 'cash.myCustomerReport',
//     header: {title: 'my customer', sub: '', icon: 'file-text-o'},
//     title: "My Customer"
// });
//
// Router.route('cash/myCustomerReportGen', function () {
//     // Config _layout
//     this._layout('reportLayout', {
//         // Page size: a4, a5, mini | Orientation: portrait, landscape
//         data: {
//             pageSize: 'a4',
//             orientation: 'portrait'
//         }
//     });
//
//     // Render template
//     var q = this.params.query;
//     this.render('cash_myCustomerReportGen', {
//         data: function () {
//             return q;
//         }
//     });
// });
