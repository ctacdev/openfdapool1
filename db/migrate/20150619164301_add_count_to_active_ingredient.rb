class AddCountToActiveIngredient < ActiveRecord::Migration
  def change
    add_column :active_ingredients, :count, :integer
  end
end
