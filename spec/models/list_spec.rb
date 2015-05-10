require 'rails_helper'

describe List do
  it "is valid with only assigning a name" do
    list = List.new(name: "New Mixtape")
    expect(list).to be_valid
  end

  it "is invalid without a name" do
    list = List.new(high_time: 200)
    list.valid?
    expect(list.errors[:name]).to include("can't be blank")
  end

  it "has a default high_time of 30" do
    List.create(name: "Awesome Mixtape")
    list = List.last
    expect(list[:high_time]).to eq(30)
  end

  it "has a default low_time of 20" do
    List.create(name: "Awesome Mixtape")
    list = List.last
    expect(list[:low_time]).to eq(20)
  end

end

