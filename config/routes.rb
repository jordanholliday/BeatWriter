Rails.application.routes.draw do
  root to: "statics#index"

  namespace :api, defaults: {format: :json} do
    resources :beats, only: [:create, :show]
  end
end
