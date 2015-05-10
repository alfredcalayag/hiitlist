class UsersController < ApplicationController

  def show
    @user = User.find(params[:id])
    @lists = List.where(user_id: @user.id)
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
