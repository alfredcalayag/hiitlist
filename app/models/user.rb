class User < ActiveRecord::Base
  validates :name, presence: true
  validates :email, presence: true
  validates :email, uniqueness: true
  # Add additional email validation using Regex awesomeness

end
