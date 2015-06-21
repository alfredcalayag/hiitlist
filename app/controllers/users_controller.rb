class UsersController < ApplicationController

  def index
    @users = User.all
  end

  def show
    @user = User.find(params[:id])
    @lists = List.where(user_id: @user.id)
    # @exercises = Exercise.where()

    # render json: @user
    render :json => {:user => @user, :lists => @lists}
  end

  def create
    @user = User.new(user_params)
    @user.save
    redirect_to @user
  end

  private
  def user_params
    params.require(:user).permit(:name, :email)
  end
end
