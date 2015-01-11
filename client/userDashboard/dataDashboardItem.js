Template.dataDashboardItem.helpers({
  showBadge: function(){
    return (this.numberOfIssues != undefined && this.numberOfIssues != 0);
  }
});