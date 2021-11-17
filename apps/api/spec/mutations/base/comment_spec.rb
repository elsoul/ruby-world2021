RSpec.describe("Comment Mutation テスト") do
  describe "Comment データを登録する" do
    let(:article) { FactoryBot.create(:article) }
    let(:comment) { FactoryBot.attributes_for(:comment, article_id: get_global_key("Article", article.id)) }

    let(:mutation) do
      %(mutation {
        createComment(input: {
          articleId: "#{comment[:article_id]}"
          from: "#{comment[:from]}"
          body: "#{comment[:body]}"
          isDeleted: #{comment[:is_deleted]}
        }) {
            commentEdge {
          node {
              id
              from
              body
              isDeleted
              }
            }
          }
        }
      )
    end

    subject(:result) do
      SoulsApiSchema.execute(mutation).as_json
    end

    it "return Comment Data" do
      begin
        a1 = result.dig("data", "createComment", "commentEdge", "node")
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
