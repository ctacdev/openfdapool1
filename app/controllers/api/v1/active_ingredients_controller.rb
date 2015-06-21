class Api::V1::ActiveIngredientsController < Api::V1::ApiController
  def index
    search = params[:q]
    @active_ingredients = ActiveIngredient.where("name LIKE ?", "#{search}%").
      order("name desc")
    render json: @active_ingredients
  end
end
