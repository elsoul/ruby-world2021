class Article < ActiveRecord::Base
  belongs_to :user
  belongs_to :article_category
  has_many :comment
end
