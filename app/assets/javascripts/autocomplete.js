$(function () {
  var exampleNumberOfListings = 74582.0;

  $("#items").on("click", "a.paginationLink", function(e) {
    var pageNumber = $(this).data("page");
    FDA.Labels.findWithIngredient($("#substance").val(), {page: pageNumber});
    e.preventDefault;
    return false;
  });

  function updateDetails(ui) {
    $("#substance-count").html(ui.item.count);
    $("#substance-label").html(ui.item.label);
    $("#substance-percentage").html(substancePercentage(ui.item.count));
    $("#collection-total").html(exampleNumberOfListings);
    $(".details").show();
  }

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
    select: function(_, ui) {
      updateDetails(ui);
      FDA.Labels.findWithIngredient(ui.item.label);
    }
  }).autocomplete("instance")._renderItem = function (ul, item) {
    return $("<li>")
      .append("<a>" + item.label + "<br>" + item.count +
              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(" +
              substancePercentage(item.count) + "%)</a>")
      .appendTo(ul);
  };
});
