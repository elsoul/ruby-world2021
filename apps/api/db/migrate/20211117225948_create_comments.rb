class CreateComments < ActiveRecord::Migration[6.1]
  def change
    create_table :comments do |t|
      t.belongs_to :article
      t.string :from, null: false, default: "名無し"
      t.text :body, null: false, default: ""
      t.boolean :is_deleted, null: false, default: false
      t.timestamps
    end
  end
end