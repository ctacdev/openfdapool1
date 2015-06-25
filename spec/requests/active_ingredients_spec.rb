require 'rails_helper'

RSpec.describe "ActiveIngredients API", type: :request do
  context "CORS" do
    it "should set Access-Control-Allow-Origin header to the requesting url" do
      get "/api/v1/active_ingredients", nil, {'HTTP_ORIGIN' => 'http://example.com'}
      expect(response.headers["Access-Control-Allow-Origin"]).
        to eq("http://example.com")
    end

    it "should set Access-Controll-Allow-Methods to GET, OPTIONS" do
      get "/api/v1/active_ingredients", nil, {'HTTP_ORIGIN' => 'http://example.com'}
      expect(response.headers["Access-Control-Allow-Methods"]).
        to eq("GET, OPTIONS")
    end
  end

  it "sends a list of active ingredients" do
    FactoryGirl.create_list :active_ingredient, 2
    get "/api/v1/active_ingredients"
    expect(response).to be_success
    expect(json["results"].length).to eq(2)
  end

  it "filters the results based on the search parameter q" do
    FactoryGirl.create :active_ingredient, name: "Should show up in the list"
    FactoryGirl.create :active_ingredient, name: "Does not show up in the list"

    get "/api/v1/active_ingredients?q=Should"
    expect(json["results"].length).to eq(1)
    expect(json["results"].first.fetch("name")).
      to eq("Should show up in the list")
  end

  it "returns all active ingredients when passed an empty q parameter" do
    FactoryGirl.create :active_ingredient
    get "/api/v1/active_ingredients?q="
    expect(json["results"].length).to eq(1)
  end

  it "ignores case when searching for matches" do
    FactoryGirl.create :active_ingredient, name: "ALL CAPS"
    FactoryGirl.create :active_ingredient, name: "all downcase"
    get "/api/v1/active_ingredients?q=ALL"
    expect(json["results"].length).to eq(2)
  end

  it "should limit the number of results returned based on the limit param" do
    FactoryGirl.create_list :active_ingredient, 2
    get "/api/v1/active_ingredients?limit=1"
    expect(json["results"].length).to eq(1)
  end

  it "should skip results based on the skip param" do
    FactoryGirl.create_list :active_ingredient, 2
    get "/api/v1/active_ingredients?skip=1"
    expect(json["results"].length).to eq(1)
  end

  it "should sort the results based on the sort param" do
    FactoryGirl.create_list :active_ingredient, 2
    get "/api/v1/active_ingredients?sort=count"
    expect(json["results"].first["count"]).to be <= json["results"].last["count"]
  end

  it "should change the sort direction based on the sort_dir param" do
    FactoryGirl.create_list :active_ingredient, 2
    get "/api/v1/active_ingredients?sort=count&sort_dir=desc"
    expect(json["results"].first["count"]).to be > json["results"].last["count"]
  end

  private

  def json
    JSON.parse response.body
  end
end
