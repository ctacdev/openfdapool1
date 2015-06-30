FROM library/ruby:2.2.2

RUN apt-get update -qq && apt-get install -y build-essential

# for nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev

# for a JS runtime
RUN apt-get install -y nodejs

ENV APP_HOME /openfda
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# Add Gemfile and Gemfile.lock
ADD Gemfile* $APP_HOME/
# install gems
RUN bundle install
# precompile assets
RUN bundle exec rake assets:precompile RAILS_ENV=production --trace
#add everything to container
ADD . $APP_HOME

#tell amazon which port the server runs on
EXPOSE 3000

#launch the app with foreman
CMD ["foreman", "start", "-e", ".env.production", "web"]
