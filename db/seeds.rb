require 'faker'
# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)

# Create 10 users
(1..10).to_a.each do |num|
  user = User.create(name: Faker::Name.name, email: Faker::Internet.email)

  # Create 3 lists for each user
  (1..3).to_a.each do |list_count|
    list = List.create(name: Faker::Company.name, user_id: user.id)

    # Create 6 exercises for each list
    (1..6).to_a.each do |count|
      Exercise.create(name: Faker::Lorem.sentence(3), list_id: list.id)
    end
  end

end