cpanelRoutes.route('/backupRestore', {
    name: 'cpanel.backupRestore',
    action: function (params, queryParams) {
        Layout.main('cpanel_backupRestore');
    },
    breadcrumb: {
        //params: ['id'],
        //queryParams: ['show', 'color'],
        title: 'Backup & Restore',
        parent: 'cpanel.welcome'
    }
});
