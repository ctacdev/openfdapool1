require "rails_helper"

RSpec.describe AutocompleteQuery, type: :model do
  context ".search", :search do
    it "should return all active ingredients when given no options" do
      FactoryGirl.create_list :active_ingredient, 2
      expect(AutocompleteQuery.search["results"].length).to eq(2)
    end

    it "should filter the responses when passed a search parameter" do
      included_ingredient = FactoryGirl.create :active_ingredient,
        name: "ACETOMINOPHEN"
      excluded_ingredient = FactoryGirl.create :active_ingredient
      expect(AutocompleteQuery.search({query: "ACE"})["results"].length).
        to eq(1)
    end

    it "should limit the number of results returned when passed a limit" do
      FactoryGirl.create_list :active_ingredient, 2
      expect(AutocompleteQuery.search({limit: 1})["results"].length).
        to eq(1)
    end

    it "should skip the specified number of results" do
      FactoryGirl.create_list :active_ingredient, 2
      results = AutocompleteQuery.search({skip:1, sort: "name"})["results"]
      expect(results.length).
        to eq(1)
    end

    it "should sort the results by the specified column" do
      FactoryGirl.create_list :active_ingredient, 2
      results = AutocompleteQuery.search({sort: "count"})["results"]
      expect(results.first["count"]).to be > results.last["count"]
    end

    context "results metadata" do
      let(:metadata) {
        AutocompleteQuery.search({limit: 10, skip: 1})["meta"]["results"]
      }

      it "should include the limit" do
        expect(metadata).
          to have_key("limit")
        expect(metadata["limit"]).to eq(10)
      end

      it "should include the skip" do
        expect(metadata).to have_key("skip")
        expect(metadata["skip"]).to eq(1)
      end
    end
  end
end
