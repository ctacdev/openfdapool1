window.FDA = {}
window.FDA.Labels = (function($, Handlebars) {
  var labelsExport = {},
    apiRoot = "https://api.fda.gov/drug/label.json";

  // Private functions
  function getTemplate(templateName) {
    return Handlebars.compile($(FDA.Templates.labels).html());
  }

  // Public functions
  labelsExport.findWithIngredient = function (ingredientName) {
    console.log("Finding products using ingredient", ingredientName);

    $.get(apiRoot + "?limit=25&search=_exists_:openfda.brand_name")
      .done(function(data) {
        console.log("Fetched data from openFDA", data.results);
        var template = getTemplate("labels");
        console.log("Fetched template", template);
        $("#label-items").append(template(data.results));
      })
      .fail(function(error) {
        console.log("Error retreiving data from openFDA", error);
      });
  };

  return labelsExport;
})(jQuery, Handlebars);

window.FDA.Templates = { labels: "#label-template" };

