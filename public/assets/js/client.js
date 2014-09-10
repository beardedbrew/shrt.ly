var Shirt = function(data) {
  this.url = data.url;
  this.hits = data.hits;
  this.hash_code = data.hash_code;

  return this;
}

var ViewModel = function() {
  var self = this;

  this.shrts = ko.observableArray();

  this.addShrt = function(form) {
    $.ajax({
      url: '/api/shrts',
      data: JSON.stringify({ url: $(form.url).val() }),
      contentType: 'application/json',
      success: function(data, textStatus, jqXHR) {
        self.shrts.unshift(new Shirt(data));
        form.reset();
      },
    });
  };

  this.setData = function(data) {
    data.forEach(function(d) {
      self.shrts.unshift(new Shirt(d));
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
