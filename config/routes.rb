Rails.application.routes.draw do
  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :active_ingredients, only: [:index]
    end
  end

  root to: 'visitors#index'
end
