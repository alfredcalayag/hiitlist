class CreateLists < ActiveRecord::Migration
  def change
    create_table :lists do |t|
      t.string :name
      t.integer :high_time
      t.integer :low_time

      t.timestamps null: false
    end
  end
end
