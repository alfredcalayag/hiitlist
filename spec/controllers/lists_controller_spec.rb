require 'rails_helper'

describe ListsController do

  describe "GET #show" do
    it "assigns the requested list to @list" do
      user = create(:user)
      list = create(:list, user_id: user.id) #see FactoryGirl
      get :show, id: list
      expect(assigns(:list)).to eq list
    end

    it "renders the :show template" do
      user = create(:user)
      list = create(:list, user_id: user.id)
      get :show, id: user
      expect(response).to render_template :show
    end

    it "assigns @exercises given the @list_id" do
      user = create(:user)
      list = create(:list, user_id: user.id)
      exercise = create(:exercise, list_id: list.id)
      get :show, id: list
      expect(assigns(:exercises)[0]).to eq exercise
    end
  end
end