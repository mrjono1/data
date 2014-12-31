Template.dataDashboardItem.helpers({
    showBadge: function(){
        return (this.numberOfIssues != undefined && this.numberOfIssues != 0);
    }
});

Template.dataDashboardItem.events({
    'click li': function () {
        Session.set("dataContext", this);
        Session.set("mainContent", "dataDashboard");
    }
});