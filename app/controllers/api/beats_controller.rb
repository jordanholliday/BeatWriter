class Api::BeatsController < ApplicationController

  def create
    beat = Beat.new(beat_params)

    if beat.save
      render json: beat
    end
  end

  private
  def beat_params
    params.require(:beat).permit(:time, :song_id)
  end
end
