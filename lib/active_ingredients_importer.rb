require 'faraday'
require 'json'

class ActiveIngredientsImporter

  def import_ingredients
    get_term_counts.map do |term_with_count|
      ActiveIngredient.find_or_create_by :name => term_with_count.fetch("term"),
        :count => term_with_count.fetch("count")
    end
  end

  def self.fetch_ingredients_from_openfda
    new.import_ingredients
  end

  private
  def fetch_term_counts
    Faraday.get("https://api.fda.gov/drug/label.json?count=openfda.substance_name.exact&limit=1000")
      .body
  end

  def get_term_counts
    JSON.parse(fetch_term_counts).fetch("results")
  end
end
