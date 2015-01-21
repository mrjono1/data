Properties = new Meteor.Collection('properties');

Meteor.methods({
  propertiesInsertUpdate: function (value) {
    // Make sure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    var record = {
      name: value.name,
      description: value.description,
      typeId: value.typeId,
      isRequired: value.isRequired
    };
    
    if (value._id == null || value._id == 'new'){
      record.entityId = value.entityId;
      
      record._id = Properties.insert(record);
      if (Meteor.isClient){
        Session.set('newId', record._id);
      }
    } else {
      Properties.update(value._id, {$set: record});
      if (Meteor.isClient){
        Session.set('newId', null);
      }
    }
  },
  propertiesDelete: function (_id) {
    // Make sure the user is logged in
    if (! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }
    
    Properties.remove(_id);
  }
});

if (Meteor.isServer){
  Meteor.publish('properties', function(){
    return Properties.find({});
  });
  /*Meteor.publish('properties', function(entityId) {
    if (dataDashboardId) {
      return Properties.find({entityId: entityId});
    } else {
      this.ready();
    }
  });*/
}