require "rails_helper"
require "active_ingredients_importer"

RSpec.describe ActiveIngredientsImporter do
  before do
    allow_any_instance_of(ActiveIngredientsImporter).
      to receive(:get_term_counts).
      and_return(
        [
          { "term" => "OCTINOXATE", "count" => 3413 },
          { "term" => "ACETAMINOPHEN", "count" => 3136 }
        ]
      )
  end

  it "should create a new ActiveIngredient for each fetched ingredient" do
    expect { ActiveIngredientsImporter.fetch_ingredients_from_openfda }.
      to change { ActiveIngredient.count }.by(2)
  end

  it "should not duplicate an existing ingredient by name" do
    FactoryGirl.create :active_ingredient, name: "OCTINOXATE"

    expect { ActiveIngredientsImporter.fetch_ingredients_from_openfda }.
      to change { ActiveIngredient.count }.by(1)
  end
end
