window.FDA = {}
window.FDA.Labels = (function($, Handlebars) {
  var labelsExport = {},
    apiRoot = "https://api.fda.gov/drug/label.json",
    defaultPerPage = 25;

  // Private functions
  function getTemplate(templateName) {
    return Handlebars.compile($(FDA.Templates.labels).html());
  }

  // Public functions
  labelsExport.findWithIngredient = function (ingredientName, options) {
    var pageNumber = 1;
    if(options && options.page) pageNumber = options.page;
    $.get(apiRoot + "?search=(_exists_:openfda.brand_name+AND+" +
      "openfda.substance_name:" + ingredientName +")" +
      "&limit=" + defaultPerPage +
      "&skip=" + (pageNumber-1) * defaultPerPage)
      .done(function(data) {
        var labelTemplate = getTemplate("labels");
        $("#items").html(labelTemplate(data));
      })
      .fail(function(error) {
        console.log("Error retreiving data from openFDA", error);
      });
  };

  return labelsExport;
})(jQuery, Handlebars);

window.FDA.Helpers = (function() {
  var helpers = {};

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
  var pageCount = FDA.Helpers.pageCount(metadata);
  var currentPage = FDA.Helpers.currentPage(metadata);
  var newContext = {};
  var ret = "";
  if(options.hash.pagesShown) pagesShown = +options.hash.pagesShown;
  switch(options.hash.type){
    case "previous":
      if(currentPage == 1) {
        newContext = {disabled: true, n: 1};
      } else {
        newContext = {n: currentPage - 1};
      }
      ret = ret + options.fn(newContext);
      break;
    case "next":
      if(currentPage == pageCount) {
        newContext = {disabled: true, n: pageCount};
      } else {
        newContext = {n: currentPage + 1}
      }
      ret = ret + options.fn(newContext);
      break;
    case "numbers":
      var limit = 5;
      var i = 0;
      var leftCount = Math.ceil(limit / 2) - 1;
      var rightCount = limit - leftCount - 1;
      if (currentPage + rightCount > pageCount)
        leftCount = limit - (pageCount - currentPage) - 1;
      if (currentPage - leftCount < 1)
        leftCount = currentPage - 1;
      var start = currentPage - leftCount;

      while (i < limit && i < pageCount) {
        newContext = { n: start };
        if (start === currentPage) newContext.active = true;
        ret = ret + options.fn(newContext);
        start++;
        i++;
      }
      break;
  }

  return ret;
});
