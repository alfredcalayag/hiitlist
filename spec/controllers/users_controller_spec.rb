require 'rails_helper'

describe UsersController do

  context "GET #show" do
    it "renders the :show template" do
    #   user = create(:user)
      get :show
      expect(response).to render_template :show
    end
  end

end