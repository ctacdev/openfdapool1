$(function () {
  var exampleNumberOfListings = 74582.0;

  function substancePercentage(count) {
    var percent = count / exampleNumberOfListings;

    return Math.round(percent * 10000) / 100;
  }

  function autocompleteFormat(data) {
    return $.map(data.results, function (val) {
      return {
        label: val.name,
        value: val.name,
        count: val.count
      };
    });
  }

  $("#substance").autocomplete({
    minLength: 3,
    source: function (request, response) {
      $.ajax({
        url: "/api/v1/active_ingredients",
        dataType: "json",
        data: {
          q: request.term
        }
      }).done(function (data) {
        var formattedData = autocompleteFormat(data);
        response(formattedData);
      });
    },
    change: function (_, ui) {
      if (ui.item === null) {
        $(".details").hide();
      }
    },
    focus: function (_, ui) {
      $("#substance").val(ui.item.label);
      return false;
    },
    select: function (_, ui) {
      $(".details").show();

      $("#substance").val(ui.item.label);
      $("#substance-label").html(ui.item.label);
      $("#substance-id").val(ui.item.value);
      $("#substance-count").html(ui.item.count);
      $("#substance-percentage").html(substancePercentage(ui.item.count));

      return false;
    }
  }).autocomplete("instance")._renderItem = function (ul, item) {
    return $("<li>")
      .append("<a>" + item.label + "<br>" + item.count +
              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(" +
              substancePercentage(item.count) + "%)</a>")
      .appendTo(ul);
  };
});
