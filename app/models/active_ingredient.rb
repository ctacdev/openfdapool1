class ActiveIngredient < ActiveRecord::Base
  validates :name, presence: true, length: { maximum: 255 }, uniqueness: true
  validates :count, presence: true, numericality: { only_integer: true }

  def self.name_starts_with name_fragment
    return where(nil) if name_fragment.nil?
    where("name LIKE ?", "#{name_fragment}%")
  end
end
