Twitbitmap::Application.routes.draw do
  root to: 'images#index'

  resources :images, only: [:index]
end
