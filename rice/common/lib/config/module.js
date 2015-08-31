// Module
Module = typeof Module === 'undefined' ? {} : Module;
Meteor.isClient && Template.registerHelper('Module', Module);

Module.Rice = {
    name: 'Rice System',
    version: '0.0.1',
    summary: 'Rice Management System is ...',
    roles: [
        'admin',
        'general',
        'reporter'
    ]
};
