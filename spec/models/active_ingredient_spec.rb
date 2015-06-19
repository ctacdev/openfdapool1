require 'rails_helper'

RSpec.describe ActiveIngredient, type: :model do
  it { should validate_presence_of(:name) }
  it { should validate_length_of(:name).is_at_most(255) }
  it { should validate_uniqueness_of(:name) }
  it { should validate_presence_of(:count) }
  it { should validate_numericality_of(:count).only_integer }
end
