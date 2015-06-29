$(function () {
  // Returns a flattened hierarchy containing all leaf nodes under the root.
  function classes(root, node_limit) {
    var classes_list = [];
    var i = 0;
    function recurse(name, node) {
      if (node.results) {
        node.results.forEach(function (child) {
          	i = i + 1;
			if(i < node_limit) {
				recurse(node.name, child);
			}
        });
      } else {
        classes_list.push({
          packageName: name,
          className: node.name,
          value: node.count
        });
      }
    }

    recurse(null, root);

    return {
      children: classes_list
    };
  }

  function build_d3_bubble_chart() {
    var
      bubble_selector = '#bubblechartcontainer',
      bubble_svg = $(bubble_selector).find('svg').first(),

      resize_chart,

      current_svg_width = parseInt(bubble_svg.attr("width") || 0, 10),
      parent_width = $(bubble_selector).width(),
      resize_threshold = 50,
      max_diameter = parent_width,

      diameter = Math.round(parent_width),
      api_limit,

      format = d3.format(",d"),
      color = d3.scale.category20c(),
      bubble,
      new_svg,

      tooltip = d3.select(".bubblecharttooltip"),
      input_box_selector = '#substance';

    resize_chart = (current_svg_width < 1) ||
                   (((parent_width - (current_svg_width * 2)) > resize_threshold) && (current_svg_width < max_diameter)) ||
                   (((current_svg_width * 2) - parent_width) > resize_threshold);

    if (!resize_chart) {
      return;
    }

    // remove if exists (needed for responsive)
    bubble_svg.remove();

    if (diameter > max_diameter) {
      diameter = max_diameter + 1;
    }

    array_limit = Math.round(diameter / 15);

    bubble = d3
      .layout
      .pack()
      .sort(null)
      .size([diameter, diameter])
      .padding(1.5);

    new_svg = d3
      .select(bubble_selector)
      .append("svg")
      .attr("width", diameter)
      .attr("height", diameter)
      .attr("class", "bubble");


	var node = new_svg
       .selectAll(".node")
       .data(bubble
         .nodes(classes(raw_api_json,array_limit))
         .filter(function (d) {
           return !d.children;
         }))
       .enter()
       .append("g")
       .attr("class", "node")
       .attr("transform", function (d) {
         return "translate(" + d.x + "," + d.y + ")";
       });

     node
       .append("circle")
       .attr("r", function (d) {
         return d.r;
       })
       .style("fill", function (d) {
         return color(Math.round(parseInt(d.value, 10) / 100));
       })
       .on("click", function (d) {
         $(input_box_selector).val(d.className);
         FDA.Labels.findWithIngredient(d.className);
       })
       .on("mouseover", function (d) {
         tooltip.text(d.className + ": found in " + format(d.value) + " FDA labeled products");
         tooltip.style("visibility", "visible");
       })
       .on("mousemove", function () {
         return tooltip.style("top", (d3.event.pageY - 10) + "px").style("left", (d3.event.pageX + 10) + "px");
       })
       .on("mouseout", function () {
         return tooltip.style("visibility", "hidden");
       });

     node
       .append("text")
       .attr("dy", ".3em")
       .style("text-anchor", "middle")
       .style("pointer-events", "none")
       .text(function (d) {
         var trimmed_text = d.className;
         if (trimmed_text.length > (d.r / 5)) {
           trimmed_text = d.className.substring(0, d.r / 4) + "...";
         }
         return trimmed_text;
       });

    d3.select(self.frameElement).style("height", diameter + "px");
  } // end build build_d3_bubble_chart

  var raw_api_json;
  $.getJSON("/api/v1/active_ingredients.json?sort=count&sort_dir=desc&limit=200", function(result){
      raw_api_json = result;
	  build_d3_bubble_chart();

	  // for responsive
	  d3.select(window).on('resize', build_d3_bubble_chart);

    // smaller / larger toggle
    $("#resizeChartButton").click(function () {
      $('#bubblechartcontainer').toggleClass("smaller");
      build_d3_bubble_chart();
    });
  });
});
