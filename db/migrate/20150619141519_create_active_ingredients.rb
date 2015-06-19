class CreateActiveIngredients < ActiveRecord::Migration
  def change
    create_table :active_ingredients do |t|
      t.string :name

      t.timestamps null: false
    end
  end
end
