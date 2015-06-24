# FDA PharmaQuery #

Our <a href="https://openfda.ctacdev.com" target="_blank">working prototype</a>.

---

## Description ##

[Insert the 750-word required synopsis here.]

## Continuous Integration (CI) Server ##

[Jenkins CI Server](http://ec2-54-175-101-110.compute-1.amazonaws.com/job/OpenFDA/)

## Ruby on Rails ##

This application requires:

- Ruby 2.2.2
- Rails 4.2.1

Learn more about [Installing Rails](http://railsapps.github.io/installing-rails.html).

## Getting Started ##

## Documentation and Support ##

## Testing ##

Javascript Unit tests are provided by [QUnitJs](http://qunitjs.com). Test reports can be accessed at [http://localhost:3000/qunit](http://localhost:3000/qunit) assuming you're running the application locally.

Tests are located in /test/javascript/<testName>.js

## Open Source Technologies Used ##

The baseline [Ruby on Rails](http://rubyonrails.org/) application was generated with the [rails_apps_composer](https://github.com/RailsApps/rails_apps_composer) gem
provided by the [RailsApps Project](http://railsapps.github.io/).

Leverages the [Bootstrap](http://getbootstrap.com) CSS framework.

The [Sass](http://sass-lang.com/) CSS extension language is used for styling.

Uses components of [jQuery UI](http://jqueryui.com).

Renders visualization generated using the [D3.js](http://d3js.org/) visualization library.

Relational database services are provided by [MySQL](http://www.mysql.com/) in development and production, and [SQLite](https://www.sqlite.org/) in the continuous integration layer.

[TODO: QUnit]
[TODO: Rspec]

[Jenkins](https://jenkins-ci.org/) provides continuous integration and delivery of successful candidate builds to the [Docker](https://www.docker.com/) container platform.

License attribution has been provided, where applicable, in the binary distribution.Issues

## Credits ##

## License ##
