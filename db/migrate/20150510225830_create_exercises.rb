class CreateExercises < ActiveRecord::Migration
  def change
    create_table :exercises do |t|
      t.string :name
      t.references :list, index: true

      t.timestamps null: false
    end
    add_foreign_key :exercises, :lists
  end
end
