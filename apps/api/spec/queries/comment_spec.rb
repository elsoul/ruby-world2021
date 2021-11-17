RSpec.describe("Comment Query テスト") do
  describe "Comment データを取得する" do
    let(:article) { FactoryBot.create(:article) }
    let(:comment) { FactoryBot.create(:comment, article_id: article.id) }

    let(:query) do
      data_id = Base64.encode64("Comment:#{comment.id}")
      %(query {
          comment(id: \"#{data_id}\") {
            id
          from
          body
          isDeleted
            }
          }
        )
    end

    subject(:result) do
      SoulsApiSchema.execute(query).as_json
    end

    it "return Comment Data" do
      begin
        a1 = result.dig("data", "comment")
        raise unless a1.present?
      rescue StandardError
        raise(StandardError, result)
      end
      expect(a1).to(
        include(
          "id" => be_a(String),
          "from" => be_a(String),
          "body" => be_a(String),
          "isDeleted" => be_in([true, false])
        )
      )
    end
  end
end
