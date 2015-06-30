FROM library/ruby:2.2.2

RUN apt-get update -qq && apt-get install -y build-essential

# for nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev

# for a JS runtime
RUN apt-get install -y nodejs

# set app root
ENV APP_HOME /openfda
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

# add gemfile and install gems
ADD Gemfile* $APP_HOME/
RUN bundle install

# add all files
ADD . $APP_HOME

# precompile assets
RUN bundle exec rake assets:precompile --trace RAILS_ENV=production

# add assets
ADD public $APP_HOME

# tell amazon which port app uses
EXPOSE 3000

#run the app
CMD ["foreman", "start", "-e", ".env.production", "web"]
