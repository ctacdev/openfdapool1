require_relative "../active_ingredients_importer"

desc "Import active ingredients from the open FDA API"
task import_active_ingredients: :environment do
  puts "Importing active ingredients from the openFDA API..."
  ingredients = ActiveIngredientsImporter.fetch_ingredients_from_openfda
  puts "done"
  puts "Imported #{ingredients.size} new ingredients"
end
