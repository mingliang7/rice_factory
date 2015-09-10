Template.rice_staff.onRendered ->
	createNewAlertify('staff')
Template.rice_staff.events
	'click .show': ->
		alertify.staff(renderTemplate(Template.rice_staffShowTemplate, this))
            .set({
                title: "<i class='fa fa-pencil'></i>Staff Info"
            })
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
			alertify.error "Staff ##{id} is in user map :("
	'click .update': ->
		data = Rice.Collection.Staffs.findOne(@_id)
		id = @_id
		available = checkAvailable(id)
		if available
			alertify.staff(renderTemplate(Template.rice_staffUpdateTemplate, data))
            .set({
                title: "<i class='fa fa-pencil'></i> Edit Staff"
            })
            .maximize()
		else
	  	alertify.error "Staff ##{id} is in user map :("
	'click .insert': ->
		alertify.staff(renderTemplate(Template.rice_staffInsertTemplate))
            .set({
                title: "<i class='fa fa-plus'></i> Add New Staff"
            })
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
	if currentUser.staffIds
		i = 0
		while i < currentUser.staffIds.length
			if id == currentUser.staffIds[i]
				flag
			else
				flag = true
			i++
		flag
DateTimePicker
