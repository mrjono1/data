Template.entityMenu.events({
  'click .addProperty': function () {
    
    var record = {entityId: this._id, name: 'New Property'};
    
    Meteor.call("propertiesInsertUpdate", record);

  }
});