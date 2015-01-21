Template.entityMenu.events({
  'click .addProperty': function () {
    
    var record = {entityId: this._id, name: 'New Property', type:'Text'};
    
    Meteor.call("propertiesInsertUpdate", record);

  }
});