require "./app"

Dir[File.expand_path("#{Rack::Directory.new('').root}/spec/factories/*.rb")]
  .each { |file| require file }
Faker::Config.locale = "ja"

def create_article(user_id: 1, article_category_id: 1)
  p(FactoryBot.create(:article, user_id: user_id, article_category_id: article_category_id))
end

def create_comment(article_id: 1)
  p(FactoryBot.create(:comment, article_id: article_id))
end

# User を 10 作成する
10.times { p(FactoryBot.create(:user)) }

# ArticleCategory を 5 作成する
5.times { p(FactoryBot.create(:article_category)) }

# User テーブルにあるすべての id を配列で取得する
user_ids = User.all.map(&:id)

# ArticleCategory テーブルにあるすべての id を配列で取得する
article_category_ids = ArticleCategory.all.map(&:id)

# Article を 100 作成する
100.times { create_article(user_id: user_ids.sample, article_category_id: article_category_ids.sample) }

# Article テーブルにあるすべての id を配列で取得する
article_ids = Article.all.map(&:id)

# Comment を 150 作成する
150.times { create_comment(article_id: article_ids.sample) }
