class Api::SongsController < ApplicationController
  def index
    @songs = Song.all.sort_by {|song| song.bpm}

    render :index
  end

  def show
    @song = Song.includes(:beats).find(params[:id])

    render :show
  end
end
