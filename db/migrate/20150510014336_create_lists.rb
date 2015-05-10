class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name
      t.integer :high_time, default: 30
      t.integer :low_time, default: 20

      t.belongs_to :user
      t.timestamps null: false
    end
  end
end
