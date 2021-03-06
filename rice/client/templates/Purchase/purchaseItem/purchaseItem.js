var tpl = Template.rice_purchaseItems;

tpl.onRendered(function() {
	createNewAlertify('purchaseItem');
});
Template.rice_purchaseItemInsert.onRendered(function() {
	var currentCategoryId = FlowRouter.getParam('purchaseCategoryId');
	$('[name="purchaseCategoryId"]').val(currentCategoryId);
});

tpl.helpers({
	selector: function() {
		var currentCategoryId = FlowRouter.getParam('purchaseCategoryId');
		return {
			purchaseCategoryId: currentCategoryId
		};
	},
	category: function() {
		var categoryId = FlowRouter.getParam('purchaseCategoryId');
		var category = ReactiveMethod.call('getPurchaseCategory', categoryId);
		return category._id + ' | ' + category.name;
	}
});
tpl.events({
	'click .insert': function() {
		alertify.purchaseItem(fa('plus', 'New Item'), renderTemplate(Template.rice_purchaseItemInsert));
	},
	'click .update': function() {
		var self = this;
		alertify.purchaseItem(fa('pencil', 'Edit Item'), renderTemplate(Template.rice_purchaseItemUpdate,
			self));
	},
	'click .remove': function() {
		var self = this;
		Meteor.call("checkAvailableItemInPurchase", self._id, function(error,
			result) {
			if (error) {
				console.log("error", error);
			}
			if (result.flag) {
				alertify.confirm(fa('remove', 'Remove PurchaseItem'),
					"Are you sure to delete #" + self._id,
					function() {
						Rice.Collection.PurchaseItem.remove(self._id, function(err) {
							if (err == undefined) {
								alertify.error(err.message);
							} else {
								alertify.success('Successfully remove');
							}
						});
					}, null);
			} else {
				alertify.warning('Sorry item #' + self._id +
					'has been using in purchase!');
			}
		});
	}
});


AutoForm.hooks({
	rice_purchaseItemInsert: {
		before: {
			insert: function(doc) {
				var prefix = doc.purchaseCategoryId + '';
				doc._id = idGenerator.genWithPrefix(Rice.Collection.PurchaseItem, prefix,
					3);
				return doc;
			}
		},
		onSuccess: function(formType, result) {
			alertify.success('Successfully Created');
		},
		onError: function(formType, err) {
			alertify.error(err.message);
		}
	},
	rice_purchaseItemUpdate: {
		onSuccess: function(formType, result) {
			alertify.purchaseItem().close();
			alertify.success('Successfully updated');
		},
		onError: function(formType, err) {
			alertify.error(err.message);
		}
	}
})
