class AddToEventsColumns < ActiveRecord::Migration
  def change
  	add_column :events, :user_id, :integer
  	add_column :events, :repeat, :integer, default: 0, null: false
  end
end
