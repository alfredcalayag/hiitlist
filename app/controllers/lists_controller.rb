class ListsController < ApplicationController
  def show
    @list = List.find(params[:id])
    @exercises = Exercise.where(list_id: @list.id)
  end

  def create
    @user = User.find(params[:user_id])
    @list = List.new(list_params)
    @list.save
    redirect_to @user
  end

  private
  def list_params
    params.require(:list).permit(:name, :user_id)
  end
end
