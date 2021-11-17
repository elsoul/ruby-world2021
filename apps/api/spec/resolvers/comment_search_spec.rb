RSpec.describe("CommentSearch Resolver テスト") do
  describe "削除フラグ false の Comment を返却する" do
    let(:article) { FactoryBot.create(:article) }
    let!(:comment) { FactoryBot.create(:comment, article_id: article.id) }

    let(:query) do
      %(query {
        commentSearch(filter: {
          isDeleted: false
      }) {
          edges {
            cursor
            node {
              id
              from
              body
              isDeleted
              }
            }
            nodes {
              id
            }
            pageInfo {
              endCursor
              hasNextPage
              startCursor
              hasPreviousPage
            }
          }
        }
      )
    end

    subject(:result) do
      SoulsApiSchema.execute(query).as_json
    end

    it "return Comment Data" do
      begin
        a1 = result.dig("data", "commentSearch", "edges")[0]["node"]
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
