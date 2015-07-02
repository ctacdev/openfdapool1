# FDA PharmaQuery #

Our <a href="https://openfda.ctacdev.com" target="_blank">working prototype</a>.

- [Pool 1 Design README](doc/readme/pool1/README.md)
- [Pool 2 Development README](doc/readme/pool2/README.md)
- [Pool 3 Full Stack README](doc/readme/pool3/README.md)

## Continuous Integration (CI) Server ##

Development Snapshot: [![Build Status](http://ec2-54-175-101-110.compute-1.amazonaws.com/buildStatus/icon?job=OpenFDA)](http://ec2-54-175-101-110.compute-1.amazonaws.com/job/OpenFDA)

[Build Radiator](http://ec2-54-175-101-110.compute-1.amazonaws.com/view/Pool%201%20Radiator)

### Reports
- [Test Report](http://ec2-54-175-101-110.compute-1.amazonaws.com/job/OpenFDA/lastCompletedBuild/testReport/)
- [Code Coverage Report](http://ec2-54-175-101-110.compute-1.amazonaws.com/job/OpenFDA/Code_Coverage_Report/)
- [Test History Analysis](http://ec2-54-175-101-110.compute-1.amazonaws.com/job/OpenFDA/test_results_analyzer/)

Stable Release: [![Build Status](http://ec2-54-175-101-110.compute-1.amazonaws.com/buildStatus/icon?job=OpenFDA Release)](http://ec2-54-175-101-110.compute-1.amazonaws.com/job/OpenFDA Release)

## Development Dependencies ##

This application requires:

- Grunt v0.4.0+
- NPM v2.10.0+

## Developer Setup ##

Assuming the above development tools are installed:

    $> cd openfda-pool1
    $> bundle install
    $> npm install
    $> grunt

This will install the required assets and development libraries through Bower and NPM and
launch a development server.  Source files in the `src/` directory are watched for changes
and a rebuild of the development server will be triggered if a file is changed and/or added.

## Testing ##

Javascript Unit tests are provided by [QUnitJs](http://qunitjs.com).

Javascript tests are located in the `test/` directory.

The tests can be run using:

    $> grunt test

## Open Source Technologies Used ##

Development workflow uses the [GruntJS](http://gruntjs.com) javascript task runner
[(MIT License)](https://github.com/gruntjs/grunt/blob/master/LICENSE-MIT) to automate build
tasks.

The [NPM](http://npmjs.com) package manager
[(Artistic License 2.0)](https://www.npmjs.com/policies/npm-license)
is used to manage the project's development dependencies

Leverages the [Bootstrap](http://getbootstrap.com) CSS framework <a href="https://github.com/twbs/bootstrap/blob/master/LICENSE">(MIT License)</a>.

The [Sass](http://sass-lang.com/) CSS extension language <a href="https://github.com/sass/sass/blob/stable/MIT-LICENSE">(MIT License)</a> is used for styling.

Uses components of [jQuery UI](http://jqueryui.com) <a href="https://github.com/jquery/jquery-ui/blob/master/LICENSE.txt">(jQuery Foundation MIT/CC0 License)</a>.

Renders visualization generated using the [D3.js](http://d3js.org/) visualization library <a href="https://github.com/mbostock/d3/blob/master/LICENSE">(BSD 3-Clause License)</a>.

JavaScript unit tests are provided by [QUnit](http://qunitjs.com) <a href="https://github.com/jquery/jquery-ui/blob/master/LICENSE.txt">(jQuery Foundation MIT/CC0 License)</a>.

License attribution has been preserved, where applicable, in the binary distribution.
