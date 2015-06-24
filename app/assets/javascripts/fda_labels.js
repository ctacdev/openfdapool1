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
  }

  return ret;
});
