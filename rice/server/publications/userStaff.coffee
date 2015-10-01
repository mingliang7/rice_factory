Meteor.publish 'rice_userStaff', ->
	Rice.Collection.UserStaffs.find() if @userId

Meteor.publish 'rice_staff', ->
	Rice.Collection.Staffs.find() if @userId
