class ListsController < ApplicationController
  protect_from_forgery
  after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  def show
    @list = List.find(params[:id])
    @exercises = Exercise.where(list_id: @list.id)
    render json: {list: @list, exercises: @exercises}
  end

  def create
    @user = User.find(params[:user_id])
    @list = List.new(list_params)
    @list.save
    # redirect_to @user
    render :json => {:lists => List.where(user_id: @user.id)}
  end

  def update
    @list = List.find(params[:id])
    @list.high_time = params[:highTime]
    @list.low_time = params[:lowTime]
    @list.save
    render :json => {:message => "Updated successfully", :low_time => @list.low_time, :high_time => @list.high_time, :name => @list.name}
  end

  protected
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

  private
  def list_params
    params.require(:list).permit(:name, :user_id)
  end
end
