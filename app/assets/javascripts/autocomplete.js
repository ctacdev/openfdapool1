$(function () {
  $("#items").on("click", "a.paginationLink", function(e) {
    var pageNumber = $(this).data("page"),
      substance = $(this).data("substance");
    FDA.Labels.findWithIngredient(substance, {page: pageNumber});
    e.preventDefault;
    return false;
  });

  $("#items").on("click", "a.substance", function(e) {
    var substance = $(this).data("substance");
    FDA.Labels.findWithIngredient(substance);
    $("html, body").animate({scrollTop: $("#substance").offset().top-75}, 0);
    $("#substance").focus();
    e.preventDefault();
    return false;
  })

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
    select: function(_, ui) {
      FDA.Helpers.updateDetails(ui);
      FDA.Labels.findWithIngredient(ui.item.label);
    }
  }).autocomplete("instance")._renderItem = function (ul, item) {
    return $("<li>")
      .append("<a>" + item.label + "<br>" + item.count +
              "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;(" +
              FDA.Helpers.substancePercentage(item.count) + "%)</a>")
      .appendTo(ul);
  };
});
