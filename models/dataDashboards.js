DataDashboards = new Meteor.Collection('dataDashboards');

Meteor.methods({
  dataDashboardsInsertUpdate: function(_id, name, description) {
    // Make sure the user is logged in
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var record = {
      name: name,
      description: description,
      userId: Meteor.userId()
    };

    if (_id == null || _id == 'new') {
      record._id = DataDashboards.insert(record);
      if (Meteor.isClient){
        Session.set('newId', record._id);
      }
    }
    else {
      DataDashboards.update(_id, {
        $set: record
      });
      if (Meteor.isClient){
        Session.set('newId', null);
      }
    }
  },
  dataDashboardDelete: function(_id) {
    // Make sure the user is logged in
    if (!Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    DataDashboards.remove(_id);
  }
});

if (Meteor.isServer) {
  Meteor.publish('dataDashboards', function() {

    if (this.userId) {
      return DataDashboards.find({
        userId: this.userId
      });
    }
    else {
      this.ready();
    }
  });
}