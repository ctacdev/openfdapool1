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
