RSpec.describe("NewCommentMailer") do
  describe "Define NewCommentMailer" do
    let(:query) do
      %(query {
        newCommentMailer {
            response
          }
        }
      )
    end

    subject(:result) do
      SoulsApiSchema.execute(query).as_json
    end

    it "return NewCommentMailer response" do
      # stub_request(:post, "https://api.mailgun.net/v3/YOUR-MAILGUN-DOMAIN/messages")
      #   .to_return(status: 200, body: "", headers: {})

      # a1 = result.dig("data", "newCommentMailer")
      # expect(a1).to(include("response" => be_a(String)))
    end
  end
end
