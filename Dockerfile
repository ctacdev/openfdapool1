FROM ruby:2.2.2

RUN apt-get update -qq && apt-get install -y build-essential

# for nokogiri
RUN apt-get install -y libxml2-dev libxslt1-dev

# for a JS runtime
RUN apt-get install -y nodejs

ENV APP_HOME /openfda
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ADD Gemfile* $APP_HOME/
RUN bundle install

ADD . $APP_HOME

RUN RAILS_ENV=production bundle exec rake assets:precompile --trace

EXPOSE 80
CMD ["bin/rails", "server", "-e", "production", "--port", "3000", "--binding", "0.0.0.0"]
