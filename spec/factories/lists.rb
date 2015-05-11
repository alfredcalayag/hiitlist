require 'faker'

FactoryGirl.define do
  factory :list do
    name Faker::Company.name
    association :user
  end
end
