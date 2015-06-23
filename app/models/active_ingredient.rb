class ActiveIngredient < ActiveRecord::Base
  validates :name, presence: true, length: { maximum: 255 }, uniqueness: true
  validates :count, presence: true, numericality: { only_integer: true }

  def self.search query, options = {}
    where("name LIKE ?", "#{query}%").
      limit(options.fetch("limit", 1000)).
      order("name desc")
  end
end
