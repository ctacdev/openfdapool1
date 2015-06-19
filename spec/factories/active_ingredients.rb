FactoryGirl.define do
  factory :active_ingredient do
    sequence(:name) { |n| "Ingredient #{n}" }
  end

end
