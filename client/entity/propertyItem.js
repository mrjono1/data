Template.propertyItem.created = function(){
  this.showEditForm = new ReactiveVar(false);
  this.typeId = new ReactiveVar(this.data.typeId);
};

Template.propertyItem.helpers({
  options: function(data){
    var values = [{
      _id: 'text',
      name: 'Text'
    },{
      _id: 'number',
      name: 'Number'
    },{
      _id: 'date',
      name: 'Date'
    },{
      _id: 'relationship',
      name: 'Relationship'
    }];
    
    // text, password, datetime, datetime-local, date, month, time, week, number, email, url, search, tel, and color
    values.forEach(function(value){
      if (Template.instance().typeId.get() == value._id){
        value.selected = 'selected' ;
      }
    });
    
    return values;
  },
  showEditForm: function(){
    return Template.instance().showEditForm.get();
  },
  setFocus: function(){
    Meteor.defer(function () {
      $('#nameInput').focus();
    });
  },
  required : function(){
    return (this.isRequired == true ? 'checked' : '');
  },
  notRequired : function(){
    return (this.isRequired == false ? 'checked' : '');
  },
  isText: function(){
    return Template.instance().typeId.get() == 'text';
  },
  isNumber: function(){
    return Template.instance().typeId.get() == 'number';
  },
  isDate: function(){
    return Template.instance().typeId.get() == 'date';
  },
  isRelationship: function(){
    return Template.instance().typeId.get() == 'relationship';
  }
});

Template.propertyItem.events({
  /*'click .d-menu-item':function(event, template){
    typeId = $(event.currentTarget).attr('data-id');
    propertyTypeDep.changed();
  },*/
  'click .d-property-header-form': function(event, template){
    template.showEditForm.set(true);
  },
  'submit .d-property-edit-form': function(event, template){
    event.preventDefault();

    var record = {_id :this._id,
      name: event.target.nameInput.value,
      typeId: Template.instance().typeId.get(),
      isRequired: (event.currentTarget.required.value == null ? null : (event.currentTarget.required.value == 'required'))
    };
    
    Meteor.call("propertiesInsertUpdate", record);
    
    template.showEditForm.set(false);
  },
  'click .d-cancel': function (event, template){
    
    var form = $(event.target).closest('form');
    template.showEditForm.set(false);
  },
  'click .d-remove': function () {
    Meteor.call("propertiesDelete", this._id);
  },
  'focusout .d-property-edit-form': function (event, template){
    if ($(event.relatedTarget).parents('.d-property-edit-form').length == 1){
      return;
    }
    var record = {_id :this._id,
      name: event.currentTarget.nameInput.value,
      typeId: Template.instance().typeId.get(),
      required: (event.currentTarget.required.value == null ? null : (event.currentTarget.required.value == 'required'))
      
    };
    
    Meteor.call("propertiesInsertUpdate", record);
    
    template.showEditForm.set(false); 
  },
  'change select.d-type-select': function (event, template){
     template.typeId.set(event.currentTarget.value);
  }
});