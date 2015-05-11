class ExercisesController < ApplicationController
  def index
    @exercises = Exercise.all
  end

  def create
    @list = List.find(params[:list_id])
    @exercise = Exercise.new(exercise_params)
    @exercise.save
    redirect_to @list
  end


  private
  def exercise_params
    params.require(:exercise).permit(:name, :list_id)
  end
end
