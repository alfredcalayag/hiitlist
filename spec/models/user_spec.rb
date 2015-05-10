require 'rails_helper'

describe User do
  it "is valid with a name and email" do
    user = User.new(name: "Mighty Joe", email: "joe@joe.com")
    expect(user).to be_valid
  end

  it "is invalid without a name"
  it "is invalid without an email"
  it "is invalid with a duplicate email address (i.e. uniqueness)"
  it "returns a user's name as a string"
end

