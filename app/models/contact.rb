class Contact < ActiveRecord::Base
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :email, presence: true, uniqueness: true
  validates :phone, presence: true

  def full_name
    "#{first_name} #{last_name}"
  end

  def phone_format
    
  end

  def birthday_format
    self.birthday.strftime("%d %B %Y")
  end
end