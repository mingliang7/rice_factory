var tpl = Template.rice_saleItems;

tpl.onRendered(function() {
	createNewAlertify('saleItem');
});
Template.rice_saleItemInsert.onRendered(function() {
	var currentCategoryId = FlowRouter.getParam('saleCategoryId');
	$('[name="saleCategoryId"]').val(currentCategoryId);
});

tpl.helpers({
	selector: function() {
		var currentCategoryId = FlowRouter.getParam('saleCategoryId');
		return {
			saleCategoryId: currentCategoryId
		};
	}
});
tpl.events({
	'click .insert': function() {
		alertify.saleItem(fa('plus', 'New Item'), renderTemplate(Template.rice_saleItemInsert));
	},
	'click .update': function() {
		var self = this;
		alertify.saleItem(fa('pencil', 'Edit Item'), renderTemplate(Template.rice_saleItemUpdate,
			self));
	},
	'click .show': function() {
		var self = this;
		alertify.saleItem(fa('eyes', 'Show'), renderTemplate(Template.rice_saleItemShow,
			self));
	},
	"click .remove": function() {
		var self = this;
		alertify.confirm(fa('remove', 'Remove SaleItem'),
			"Are you sure to delete #" + self._id,
			function() {
				Rice.Collection.SaleItem.remove(self._id, function(err) {
					if (err == undefined) {
						alertify.error(err.message);
					} else {
						alertify.success('Successfully remove');
					}
				});
			}, null);
	}
});
Template.rice_saleItemShow.helpers({
	getUnit: function(id) {
		return Rice.Collection.Unit.findOne(id).name;
	}
});


AutoForm.hooks({
	rice_saleItemInsert: {
		before: {
			insert: function(doc) {
				var prefix = doc.saleCategoryId + '';
				doc._id = idGenerator.genWithPrefix(Rice.Collection.SaleItem, prefix, 3);
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
	rice_saleItemUpdate: {
		onSuccess: function(formType, result) {
			alertify.saleItem().close();
			alertify.success('Successfully updated');
		},
		onError: function(formType, err) {
			alertify.error(err.message);
		}
	}
})
