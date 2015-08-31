/**
 * Admin
 */
Security.defineMethod("rice_ifAdmin", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['admin'], 'Rice');
    }
});

/**
 * General
 */
Security.defineMethod("rice_ifGeneral", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['general'], 'Rice');
    }
});

/**
 * Reporter
 */
Security.defineMethod("rice_ifReporter", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['reporter'], 'Rice');
    }
});
