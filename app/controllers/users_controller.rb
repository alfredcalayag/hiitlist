class UsersController < ApplicationController
  protect_from_forgery
  after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end


  def index
    @users = User.all
    render :json => {:users => @users}
  end

  def show
    @user = User.find(params[:id])
    @lists = List.where(user_id: @user.id)
    # current_user = User.find_by_id(session[:current_user_id])
    # render json: @user
    render :json => {:user => @user, :lists => @lists}
  end

  def create
    @user = User.new(user_params)
    @user.save

    render :json => {:users => User.all}
  end

  protected
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
