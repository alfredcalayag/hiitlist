require 'rails_helper'

describe ExercisesController do

  describe "POST #create" do
    it "saves an exercise if it is valid" do
      expect{
        user = create(:user)
        list = create(:list, user_id: user.id)
        post :create, exercise: attributes_for(:exercise, list_id: 1)
      }.to change(Exercise, :count).by(1)
    end

    it "does not save an exercise if it invalid" do
      expect{
        # user = create(:user)
        # list = create(:list, user_id: user.id)
        # exercise = create(:exercise, list_id: nil)
        post :create, exercise: attributes_for(:exercise, list_id: nil)
      }.not_to change(Exercise, :count)
    end

    it "re-directs to the index page on successful save" do
      post :create, exercise: attributes_for(:exercise, list_id: 1)
      expect(response).to redirect_to assigns(:exercise)
    end

  end

  describe "PUT #edit" do
    it "Changes the exercise's name"
    it "redirects to the show page if it the save is valid"
  end

  describe "DELETE #destroy" do
    it "Removes the exercise from the database"
    it "re-directs to the index page"
  end
end