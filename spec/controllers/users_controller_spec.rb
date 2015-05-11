require 'rails_helper'

describe UsersController do

  describe "GET #show" do
    it "assigns the requested user to @user" do
      user = create(:user) #see FactoryGirl
      get :show, id: user
      expect(assigns(:user)).to eq user
    end

    it "renders the :show template" do
      user = create(:user)
      get :show, id: user
      expect(response).to render_template :show
    end

    it "assigns @lists given the @user_id" do
      user = create(:user)
      list = create(:list, user_id: user.id)
      get :show, id: user
      expect(assigns(:lists)[0]).to eq list
    end

    # it "assigns @exercises given the list_id" do
    #   user = create(:user)
    #   list = create(:list, user_id: user.id)
    #   exercise = create(:exercise, list_id: list.id)
    #   get :show, id: user.id
    #   expect(assigns(:exercises)[0]).to eq exercise
    # end
  end

  # describe "GET #index" do
  # end
  # Currently, we're not needing to get all users.

  describe "POST #create" do
    it "saves the new user in the database" do
      expect{post :create, user: attributes_for(:user)}.to change(User, :count).by(1)
    end

    it "does not save the new user in the database with invalid attributes" do
      expect{
        post :create,
          user: attributes_for(:user, email: nil)
          }.not_to change(User, :count)
    end
  end

end