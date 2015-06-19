require 'rails_helper'

describe "ActiveIngredients API" do
  it "sends a list of active ingredients" do
    FactoryGirl.create_list :active_ingredient, 2
    get '/api/v1/active_ingredients'
    expect(response).to be_success
    json = JSON.parse response.body
    expect(json.length).to eq(2)
  end
end
