Template.propertyItem.events({
  'click .remove': function () {
    Meteor.call("propertiesDelete", this._id);
  }
});