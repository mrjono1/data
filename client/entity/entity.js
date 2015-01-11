Template.entity.helpers({
  data: function(){
    if (this._id == 'new'){
      return {dataDashboardId : this.dataDashboardId};
    } else {
      return Entities.findOne({_id: this._id});
    }
  },
  properties: function() {
    return Properties.find({entityId: this._id});
  }
});

Template.entity.events({
  'submit': function(event, template) {
    event.preventDefault();

    var record = {_id :this._id,
    dataDashboardId: this.dataDashboardId,
      name: event.target.nameInput.value,
      description: event.target.descriptionInput.value};
    
    record = Meteor.call("entitiesInsertUpdate", record);

    if (this._id == 'new') {
      Router.go('/data/' + this.dataDashboardId + '/'+ Session.get('newId'));
    }
  }
});