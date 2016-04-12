class Api::SongsController < ApplicationController
  def show
    @song = Song.includes(:beats).find(params[:id])

    render :show
  end
end
