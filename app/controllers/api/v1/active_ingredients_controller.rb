class Api::V1::ActiveIngredientsController < Api::V1::ApiController
  def index
    @active_ingredients = ActiveIngredient.where nil
    render json: @active_ingredients
  end
end
