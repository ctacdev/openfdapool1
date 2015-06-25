window.FDA = {}
window.FDA.Labels = (function($, Handlebars) {
  var labelsExport = {},
    apiRoot = "https://api.fda.gov/drug/label.json",
    defaultPerPage = 25;

  // Private functions
  function getTemplate(templateName) {
    return Handlebars.compile($(FDA.Templates.labels).html());
  }

  function populateLabelGrid(data) {
    var labelTemplate = getTemplate("labels");
    $("#items").html(labelTemplate(data));
  }

  // Public functions
  labelsExport.findWithIngredient = function (ingredientName, options) {
    var pageNumber = 1;
    if(options && options.page) pageNumber = options.page;
    $.get(apiRoot + "?search=(_exists_:openfda.brand_name+AND+" +
      "openfda.substance_name.exact:\"" + ingredientName.replace(/ /g, "+") +
      "\")" +
      "&limit=" + defaultPerPage +
      "&skip=" + (pageNumber-1) * defaultPerPage)
      .done(function(data) {
        if($("#substance").val() !== ingredientName)
          $("#substance").val(ingredientName);
        populateLabelGrid(data);
        FDA.Helpers.updateDetails({
          item: {
            label: ingredientName,
            count: data.meta.results.total
          }
        })
      })
      .fail(function(error) {
        console.log("Error retreiving data from openFDA", error);
      });
  };

  return labelsExport;
})(jQuery, Handlebars);

window.FDA.Helpers = (function() {
  var helpers = {},
    exampleNumberOfListings = 74582.0;

  helpers.updateDetails = function(ui) {
    $("#substance-count").html(ui.item.count);
    $("#substance-label").html(ui.item.label);
    $("#substance-percentage").html(FDA.Helpers
      .substancePercentage(ui.item.count));
    $("#collection-total").html(exampleNumberOfListings);
    $(".details").show();
  }

  helpers.substancePercentage = function(count) {
    var percent = count / exampleNumberOfListings;
    return Math.round(percent * 10000) / 100;
  }

  helpers.pageCount = function(metadata) {
    return Math.max(1, Math.ceil( metadata.total / metadata.limit));
  };

  helpers.currentPage = function(metadata) {
    return metadata.skip / metadata.limit + 1;
  }

  return helpers;
})(jQuery);

window.FDA.Templates = {
  labels: "#label-template"
};

Handlebars.registerHelper('paginate', function(metadata, options) {
  var pageCount = FDA.Helpers.pageCount(metadata),
    currentPage = FDA.Helpers.currentPage(metadata),
    newContext = {},
    substance = $("#substance").val(),
    ret = "";
  if(options.hash.pagesShown) pagesShown = +options.hash.pagesShown;
  switch(options.hash.type){
    case "previous":
      if(currentPage == 1) {
        newContext = {disabled: true, n: 1, substance: substance};
      } else {
        newContext = {n: currentPage - 1, substance: substance};
      }
      ret = ret + options.fn(newContext);
      break;
    case "next":
      if(currentPage == pageCount) {
        newContext = {disabled: true, n: pageCount, substance: substance};
      } else {
        newContext = {n: currentPage + 1, substance: substance}
      }
      ret = ret + options.fn(newContext);
      break;
    case "numbers":
      var limit = 5,
        i = 0,
        leftCount = Math.ceil(limit / 2) - 1,
        rightCount = limit - leftCount - 1;
      if (currentPage + rightCount > pageCount)
        leftCount = limit - (pageCount - currentPage) - 1;
      if (currentPage - leftCount < 1)
        leftCount = currentPage - 1;
      var start = currentPage - leftCount;

      while (i < limit && i < pageCount) {
        newContext = { n: start, substance: substance };
        if (start === currentPage) newContext.active = true;
        ret = ret + options.fn(newContext);
        start++;
        i++;
      }
      break;
  }

  return ret;
});

Handlebars.registerHelper('grouped_each', function(every, context, options) {
    var out = "", subcontext = [], i;
    if (context && context.length > 0) {
        for (i = 0; i < context.length; i++) {
            if (i > 0 && i % every === 0) {
                out += options.fn(subcontext);
                subcontext = [];
            }
            subcontext.push(context[i]);
        }
        out += options.fn(subcontext);
    }
    return out;
});
