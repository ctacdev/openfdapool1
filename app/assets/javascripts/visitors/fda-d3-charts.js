$( document ).ready(function() {

	$(function(){
	    $('.carousel').carousel({
	      interval: 100000
	    });
	});

	var tooltip = d3.select("body")
	    .append("div")
	    .style("position", "absolute")
	    .style("z-index", "10")
	    .style("visibility", "hidden")
	    .style("color", "white")
	    .style("padding", "8px")
	    .style("background-color", "rgba(0, 0, 0, 0.75)")
	    .style("border-radius", "6px")
	    .style("font", "12px sans-serif")
     	.attr("class", "bubblecharttooltip")
	    .text("tooltip");

	function build_d3_bubble_chart(){
		
		var max_diameter = 450;
		var tooltip = d3.select(".bubblecharttooltip");
		var resize_threshold = 50;
		var bubble_parent_selector = '.carousel-inner';
		var bubble_selector = '#bubblechartcontainer';
		var input_box_selector = '#substance';
		var api_call = '/api/v1/active_ingredients.json?sort=count&sort_dir=desc&limit=';
	
		var parent_width = $(bubble_parent_selector).width();
		//console.log("parent_width: " + parent_width);
		
		var current_svg_width = 0;
		if ($(bubble_selector + ' svg').length > 0){
			current_svg_width = parseInt(d3.select(bubble_selector).select("svg").attr("width"));
		}
		//console.log("current_svg_width: " + current_svg_width);
		
		var resize_chart = false;
		if (current_svg_width < 1) {
			resize_chart = true;
		} else if (((parent_width - (current_svg_width * 2)) > resize_threshold) && (current_svg_width < max_diameter)) {
			resize_chart = true;
		} else if (((current_svg_width * 2) - parent_width) > resize_threshold) {
			resize_chart = true;
		}		

		if (resize_chart){
			
			var diameter = Math.round(parent_width / 2);
			if (diameter > max_diameter){
				diameter = max_diameter + 1;
			}
			
			var api_limit = Math.round(diameter/15);
			
			console.log("resizing to " + diameter + "/" + api_limit);
			
			var format = d3.format(",d");
			var color = d3.scale.category20c();

			var bubble = d3.layout.pack()
			    .sort(null)
			    .size([diameter, diameter])
			    .padding(1.5);

			// remove if exists (needed for responsive)
			d3.select(bubble_selector).select("svg").remove();
			var svg = d3.select(bubble_selector).append("svg")
			    .attr("width", diameter)
			    .attr("height", diameter)
			    .attr("class", "bubble");

			d3.json(api_call + api_limit, function(error, root) {
			  var node = svg.selectAll(".node")
			      .data(bubble.nodes(classes(root))
			      .filter(function(d) { return !d.children; }))
			    .enter().append("g")
			      .attr("class", "node")
			      .attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });

			  node.append("circle")
			      .attr("r", function(d) { return d.r; })
				   .style("fill", function(d) { return color(Math.round(parseInt(d.value)/100)); })
			      .on("click", function(d) {
			              d3.select(input_box_selector).attr('value',d.className);
			      })
			      .on("mouseover", function(d) {
			              tooltip.text(d.className + ": found in " + format(d.value) + " FDA labeled products");
			              tooltip.style("visibility", "visible");
			      })
			      .on("mousemove", function() {
			          return tooltip.style("top", (d3.event.pageY-10)+"px").style("left",(d3.event.pageX+10)+"px");
			      })
			      .on("mouseout", function(){return tooltip.style("visibility", "hidden");});

			  node.append("text")
			      .attr("dy", ".3em")
			      .style("text-anchor", "middle")
			      .style("pointer-events", "none")
			      .text(function(d) { 
					var trimed_text = d.className;
					if (trimed_text.length > (d.r / 5)){
						trimed_text = d.className.substring(0, d.r / 4) + "...";
					}
				    return trimed_text; });
		
			});
		}

		// Returns a flattened hierarchy containing all leaf nodes under the root.
		function classes(root) {
		  var classes = [];

		  function recurse(name, node) {
		    if (node.results) node.results.forEach(function(child) { recurse(node.name, child); });
		    else classes.push({packageName: name, className: node.name, value: node.count});
		  }

		  recurse(null, root);
		  return {children: classes};
		}

		d3.select(self.frameElement).style("height", diameter + "px");
		

		
	} // end build build_d3_bubble_chart
	
	build_d3_bubble_chart();
	
	// for responsive
	d3.select(window).on('resize', build_d3_bubble_chart);

});