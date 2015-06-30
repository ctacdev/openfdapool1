FROM library/ruby:2.2.2

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

RUN RAILS_ENV=production bundle exec rake assets:precompile --trace
ADD . $APP_HOME



EXPOSE 3000
CMD ["foreman", "start", "-e", ".env.production", "web"]
