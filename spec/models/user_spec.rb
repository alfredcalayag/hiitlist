require 'rails_helper'

describe User do
  it "is valid with a name and email" do
    user = User.new(name: "Mighty Joe", email: "joe@joe.com")
    expect(user).to be_valid
  end

  it "is invalid without a name" do
    user = User.new(email: "something@you.com")
    user.valid?
    expect(user.errors[:name]).to include("can't be blank")
  end

  it "is invalid without an email" do
    user = User.new(name: "myname?")
    user.valid?
    expect(user.errors[:email]).to include("can't be blank")
  end

  it "is invalid with a duplicate email address (i.e. uniqueness)" do
    User.create(name: "Joe One", email: "joe@one.com")
    user = User.new(name: "Joe Two", email: "joe@one.com")
    user.valid?
    expect(user.errors[:email]).to include("has already been taken")
  end
  it "returns a user's name as a string" do
    User.create(name: "Joe", email:"joe@one.com")
    user = User.last
    expect(user.name).to be_instance_of(String)
  end
end

