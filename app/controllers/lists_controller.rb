class ListsController < ApplicationController
  def show
    @list = List.find(params[:id])
    @exercises = Exercise.where(list_id: @list.id)
  end
end
