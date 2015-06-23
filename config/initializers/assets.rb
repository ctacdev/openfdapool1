# Be sure to restart your server when you modify this file.

# Version of your assets, change this if you want to expire all your assets.
Rails.application.config.assets.version = '1.1'

# Add additional assets to the asset load path
# Rails.application.config.assets.paths << Emoji.images_path

# Precompile additional assets.
# application.js, application.css, and all non-JS/CSS in app/assets folder are already added.
# Rails.application.config.assets.precompile += %w( search.js )

#Unit Tests
Rails.application.config.assets.precompile += %w( jquery-ui.css
                                                  qunit.css
                                                  test_helper.css
                                                  bootstrap-carousel.css
                                                  d3-themes.css

                                                  jquery-ui.js
                                                  d3.js
                                                  autocomplete.js
                                                  qunit.js
                                                  fda-d3-charts.js
                                                  test_helper.js )
