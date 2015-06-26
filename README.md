# FDA PharmaQuery #

Our <a href="https://openfda.ctacdev.com" target="_blank">working prototype</a>.

---

## Description ##

[Insert the 750-word required synopsis here.]

## Continuous Integration (CI) Server ##

Development Snapshot: [![Build Status](http://ec2-54-175-101-110.compute-1.amazonaws.com/buildStatus/icon?job=OpenFDA)](http://ec2-54-175-101-110.compute-1.amazonaws.com/job/OpenFDA)

[Test Report](http://ec2-54-175-101-110.compute-1.amazonaws.com/job/OpenFDA/lastCompletedBuild/testReport/)

Stable Release: [![Build Status](http://ec2-54-175-101-110.compute-1.amazonaws.com/buildStatus/icon?job=OpenFDA Release)](http://ec2-54-175-101-110.compute-1.amazonaws.com/job/OpenFDA Release)

## Dependencies ##

This application requires:

- *NIX-based operating system
- Ruby 2.2.2
- Rails 4.2.1
- MySQL 5.5+

## Developer Setup ##

Assuming that the above dependencies are installed and MySQL is running:

    cd openfda_rfq/
    bundle install

Copy `config/*.yml.example` files to `config/*.yml`:

    for i in `ls config/*.example`; do cp -f $i `echo $i | sed "s/.example//g"`; done

Edit `database.yml` to ensure correct connection information for MySQL, then:

    rake db:setup import_active_ingredients
    rails s

Once Rails is running, you should be able to browse to <a href="http://localhost:3000" target="_blank">the local server</a>.

## Testing ##

Ruby/Rails tests are provided by [RSpec](http://rspec.info/). The test suite may be run by invoking `rspec` from the project directory.

The RSpec test suite is located in the `spec/` directory.

Javascript Unit tests are provided by [QUnitJs](http://qunitjs.com). Test reports can be accessed locally at <a href="http://localhost:3000/qunit" target="_blank">http://localhost:3000/qunit</a> in development.

Javascript tests are located in the `test/javascript/` directory.

## Containerized Deployment ##
[TODO]

## Open Source Technologies Used ##

The baseline [Ruby on Rails](http://rubyonrails.org/) application <a href="http://www.opensource.org/licenses/MIT">(MIT License)</a> was generated with the [rails_apps_composer](https://github.com/RailsApps/rails_apps_composer) gem
<a href="http://www.opensource.org/licenses/MIT">(MIT License)</a> provided by the [RailsApps Project](http://railsapps.github.io/).

Leverages the [Bootstrap](http://getbootstrap.com) CSS framework <a href="https://github.com/twbs/bootstrap/blob/master/LICENSE">(MIT License)</a>.

The [Sass](http://sass-lang.com/) CSS extension language <a href="https://github.com/sass/sass/blob/stable/MIT-LICENSE">(MIT License)</a> is used for styling.

Uses components of [jQuery UI](http://jqueryui.com) <a href="https://github.com/jquery/jquery-ui/blob/master/LICENSE.txt">(jQuery Foundation MIT/CC0 License)</a>.

Renders visualization generated using the [D3.js](http://d3js.org/) visualization library <a href="https://github.com/mbostock/d3/blob/master/LICENSE">(BSD 3-Clause License)</a>.

Relational database services are provided by [MySQL](http://www.mysql.com/) in development and production (<a href="https://github.com/mysql/mysql-server/blob/5.7/README">GPLv2 / FOSS Exception</a>), and [SQLite](https://www.sqlite.org/) <a href="https://www.sqlite.org/copyright.html">(Public Domain)</a> in the continuous integration layer.

Ruby/Rails tests are provided by [RSpec](http://rspec.info/) <a href="https://github.com/rspec/rspec/blob/master/License.txt">(MIT License)</a>.

JavaScript unit tests are provided by [QUnit](http://qunitjs.com) <a href="https://github.com/jquery/jquery-ui/blob/master/LICENSE.txt">(jQuery Foundation MIT/CC0 License)</a>.

[Jenkins](https://jenkins-ci.org/) <a href="https://github.com/jenkinsci/jenkins/blob/master/LICENSE.txt">(MIT License)</a> provides continuous integration and delivery of successful candidate builds to the [Docker](https://www.docker.com/) container platform <a href="https://github.com/docker/docker/blob/master/LICENSE">(Apache v2)</a>.

License attribution has been preserved, where applicable, in the binary distribution.

## Credits ##
[TODO or remove]

## License ##
[TODO]
