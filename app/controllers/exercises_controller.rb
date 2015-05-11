class ExercisesController < ApplicationController
  def create
    @exercise = Exercise.new(exercise_params)
    @exercise.save
    redirect_to @exercise
  end

  private
  def exercise_params
    params.require(:exercise).permit(:name, :list_id)
  end
end
