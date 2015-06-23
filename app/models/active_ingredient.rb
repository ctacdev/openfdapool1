class ActiveIngredient < ActiveRecord::Base
  validates :name, presence: true, length: { maximum: 255 }, uniqueness: true
  validates :count, presence: true, numericality: { only_integer: true }
end
