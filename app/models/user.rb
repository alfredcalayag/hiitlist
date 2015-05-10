class User < ActiveRecord::Base
  has_many :lists

  validates :name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  # Add additional email validation using Regex awesomeness
end
