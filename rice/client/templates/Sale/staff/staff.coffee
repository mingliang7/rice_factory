Template.rice_staff.onRendered ->
	createNewAlertify('staff')
Template.rice_staff.events
	'click .show': ->
		alertify.staff(fa('eyes', 'Show Staff'), renderTemplate(Template.rice_staffShowTemplate, this))

	'click .remove': ->
		id = this._id
		available = checkAvailable(id);
		if available
			alertify.confirm(
	      fa('remove', 'Remove staff'),
	      "Are you sure to delete "+id+" ?",
	      ->
	        Rice.Collection.Staffs.remove id, (error) ->
	          if error is 'undefined'
	            alertify.error error.message
	          else
	            alertify.warning 'Successfully Remove'
	      null
	    )
		else
			alertify.error "Staff ##{id} is in user staff :("
	'click .update': ->
		data = Rice.Collection.Staffs.findOne(@_id)
		id = @_id
		available = checkAvailable(id)
		if available
			alertify.staff(fa('pencil', 'Edit Staff'), renderTemplate(Template.rice_staffUpdateTemplate, data))
            .maximize()
		else
	  	alertify.error "Staff ##{id} is in user staff :("
	'click .insert': ->
		alertify.staff(fa('plus', 'Add New'), renderTemplate(Template.rice_staffInsertTemplate))
            .maximize()

AutoForm.hooks
	rice_staffInsertTemplate:
		before:
			insert: (doc) ->
				prefix = "" + (Session.get('currentBranch')) + "-"
				doc._id = idGenerator.genWithPrefix(Rice.Collection.Staffs, prefix, 4)
				doc.branchId = Session.get('currentBranch')
				doc

		onSuccess: (formType, result) ->
			alertify.success 'successfully'
		onError: (formType, error) ->
			alertify.error error.message

	rice_staffUpdateTemplate:
		onSuccess: (formType, result) ->
			alertify.success 'sucessfully'
			alertify.staff().close()
		onError: (formType, error) ->
			alertifyy.error error.message

# funcions

checkAvailable = (id) ->
	flag = false
	userId = Meteor.userId()
	currentUser = Rice.Collection.UserStaffs.findOne({userId: userId})
	if currentUser
		i = 0
		while i < currentUser.staffIds.length
			if id == currentUser.staffIds[i]
				flag
			else
				flag = true
			i++
	else
		flag = true
	flag
