class Student < ActiveRecord::Base
  validate :first_name, presence: true
  validate :last_name, presence: true
  validate :email, presence: true, uniqueness: true
  validate :phone, presence: true
end