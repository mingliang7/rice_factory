// Module
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Cash = {
    name: 'Cash System',
    version: '0.0.1',
    summary: 'Cash Management System is ...',
    roles: [
        'admin',
        'general',
        'reporter'
    ]
};
