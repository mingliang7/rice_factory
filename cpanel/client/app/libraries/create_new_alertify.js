/**
 * Create new alertify
 */
createNewAlertify = function (names, transition) {
    var alerts = _.isArray(names) ? names : [names];
    transition = _.isUndefined(transition) ? 'fade' : transition;

    _.each(alerts, function (element) {

        var name = element;

        if (!alertify[name]) {
            alertify.dialog(name, function () {
                return {
                    main: function (title, message) {
                        this.setting('title', title);
                        this.message = message;

                        if (message.html && message.instance) {
                            this.message = message.html;
                            this.instance = message.instance;
                        }
                    },
                    setup: function () {
                        return {
                            options: {
                                maximizable: true,
                                closableByDimmer: false,
                                resizable: false,
                                transition: transition
                            }
                        };
                    },
                    prepare: function () {
                        this.setContent(this.message);
                        this.elements.footer.style.visibility = "hidden";
                    },
                    hooks: {
                        onclose: function () {
                            if (this.instance) {
                                Blaze.remove(this.instance);
                            }
                        }
                    }
                };
            }, false, 'alert');
        }

    });

};
