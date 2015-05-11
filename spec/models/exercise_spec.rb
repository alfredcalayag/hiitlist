require 'rails_helper'

describe Exercise do
  it "is valid with assigned a name and list_id" do
    # Also require user_id?
    list = List.create(name: "Capoeira HIIT")
    exercise = create(:exercise, list_id: list.id)
    expect(exercise).to be_valid
  end

  it "is invalid without a list_id" do
    exercise = Exercise.new(name: "Super Burpees", list_id: nil)
    exercise.valid?
    expect(exercise.errors[:list_id]).to include("can't be blank")
  end

end

