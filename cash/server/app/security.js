/**
 * Admin
 */
Security.defineMethod("cash_ifAdmin", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['admin'], 'Cash');
    }
});

/**
 * General
 */
Security.defineMethod("cash_ifGeneral", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['general'], 'Cash');
    }
});

/**
 * Reporter
 */
Security.defineMethod("cash_ifReporter", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId) {
        return !Roles.userIsInRole(userId, ['reporter'], 'Cash');
    }
});
