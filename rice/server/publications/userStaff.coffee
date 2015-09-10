Meteor.publish 'rice_userStaff', ->
	Rice.Collection.UserStaffs.find()

Meteor.publish 'rice_staff', ->
	Rice.Collection.Staffs.find() if @userId
