var ViewModel = function() {
  var self = this;

  this.shrts = ko.observableArray();

  this.addShrt = function(form) {
    $.ajax({
      url: '/api/shrts',
      type: 'POST',
      data: JSON.stringify({ url: $(form.url).val() }),
      contentType: 'application/json',
      success: function(data, textStatus, jqXHR) {
        var i =_.findIndex(self.shrts(), function(s) { return s.hash_code == data.hash_code });

        if (i > -1) {
          self.shrts.splice(i, 1, data);
        } else {
          self.shrts.push(data);
        }
        form.reset();
      },
    });
  };

  this.setData = function(data) {
    data.forEach(function(d, i) {
      self.shrts.push(d);
    });
  };

  return self;
};

$(function() {
  var model = new ViewModel();

  $.get('/api/shrts', function(data, textStatus, jqXHR) {
    if (jqXHR.status == 200) {
      model.setData(data);
      ko.applyBindings(model);
      $('.knockout-content').fadeIn();
    } else {
      alert("Sorry, we're all out of shrts.");
    }
  });
});
