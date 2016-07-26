class CreateContact < ActiveRecord::Migration
  def change
    create_table :contacts do |t|
      t.string :first_name
      t.string :last_name
      t.string :email
      t.string :phone
      t.string :image
      t.datetime :birthday
      t.timestamps null: false
    end
  end
end