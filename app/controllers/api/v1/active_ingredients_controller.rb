class Api::V1::ActiveIngredientsController < Api::V1::ApiController
  def index
    @active_ingredients = AutocompleteQuery.search(search_options)

    render json: @active_ingredients
  end

  private

  def search_options
    params.slice(:limit, :skip, :sort).merge query: params[:q]
  end
end
