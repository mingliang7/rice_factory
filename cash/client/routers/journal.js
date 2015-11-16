cashRoutes.route('/journal', {
    name: 'cash.journal',
    subscriptions: function (params, queryParams) {
        this.register('cash_staff', Meteor.subscribe('cash_staff')),
            this.register('cpanel_currency', Meteor.subscribe('cpanel_currency')),
            this.register('cash_currency', Meteor.subscribe('cash_currency')),
            this.register('cash_chartAccount', Meteor.subscribe(
                'cash_chartAccount')),
            this.register('cash_accountType', Meteor.subscribe(
                'cash_accountType')),
            this.register('cash_journal', Meteor.subscribe(
                'cash_journal')),
            this.register('cash_address', Meteor.subscribe(
                'cash_address')),
            this.register('cash_openingClosingBalance', Meteor.subscribe(
                'cash_openingClosingBalance'));
    },
    action: function (params, queryParams) {
        Layout.main('cash_journal');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'journal',
        parent: 'cash.home'
    }
});
