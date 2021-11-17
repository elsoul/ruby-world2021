class ArticleCategory < ActiveRecord::Base
  has_many :article
end
