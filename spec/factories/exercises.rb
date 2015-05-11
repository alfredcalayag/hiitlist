require 'faker'

FactoryGirl.define do
  factory :exercise do
    association :list
    name Faker::Lorem.sentence(3)
  end
end
