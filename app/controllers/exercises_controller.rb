class ExercisesController < ApplicationController
  # include ActionController::RequestForgeryProtection


  protect_from_forgery
  after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end



  def index
    @exercises = Exercise.all
  end

  def create
    @list = List.find(params[:list_id])
    # @exercise = Exercise.new(exercise_params)
    @exercise = Exercise.new(exercise_params)
    @exercise.save

    @exercises = Exercise.where(list_id: @list.id)
    # redirect_to @list
    render :json => @exercises
  end

  protected
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end


  private
  def exercise_params
    params.require(:exercise).permit(:name, :list_id)
  end
end
