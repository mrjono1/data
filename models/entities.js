Entities = new Meteor.Collection('entities');

Meteor.methods({
  entitiesInsertUpdate: function (value) {

    // Make sure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var record = {
      dataDashboardId: value.dataDashboardId,
      name: value.name,
      description: value.description
    };

    if (value._id == null || value._id == 'new'){
      record._id = Entities.insert(record);
      if (Meteor.isClient){
        Session.set('newId', record._id);
      }
    } else {
      Entities.update(value._id, {$set: record});
      if (Meteor.isClient){
        Session.set('newId', null);
      }
    }

  },
  entitiesDelete: function (_id) {
    // Make sure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    Entities.remove(_id);
  }
});

if (Meteor.isServer){
  Meteor.publish('entities', function ()
  {
    return Entities.find({});
  });
  
  /*
  Meteor.publish('entities', function(dataDashboardId) {
    if (dataDashboardId) {
      return Entities.find({dataDashboardId: dataDashboardId});
    } else {
      this.ready();
    }
  });*/
}