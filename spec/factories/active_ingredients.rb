FactoryGirl.define do
  factory :active_ingredient do
    sequence(:name) { |n| "Ingredient #{n}" }
    count { rand(1..1000) }
  end
end
