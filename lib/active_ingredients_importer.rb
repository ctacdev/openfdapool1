require "faraday"
require "json"

class ActiveIngredientsImporter
  BASE_URL = "https://api.fda.gov/drug/label.json"
  def import_ingredients
    get_term_counts.map do |term_with_count|
      new_ingredient = ActiveIngredient.where(name: term_with_count.fetch("term")).
        first_or_initialize
      new_ingredient.count = term_with_count.fetch("count")
      new_ingredient.save
    end
  end

  def self.fetch_ingredients_from_openfda
    new.import_ingredients
  end

  private

  # Due to API limitations we can only get 1000 results from the count query.
  # Adding a skip parameter causes an error response from the API.
  def fetch_term_counts
    Faraday.get("#{BASE_URL}?count=openfda.substance_name.exact&limit=1000").
      body
  end

  def get_term_counts
    JSON.parse(fetch_term_counts).fetch("results")
  end
end
