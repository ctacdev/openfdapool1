Rails.application.routes.draw do
  namespace :api, defaults: {format: 'json'} do
    namespace :v1 do
      resources :active_ingredients, only: [:index]
    end
  end
  
  controller :visitors do
    get 'visitors/style_guide'     => :style_guide
    get 'visitors/widget_gallery'     => :widget_gallery
  end
  
  root to: 'visitors#index'
end
