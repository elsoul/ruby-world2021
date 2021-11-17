RSpec.describe("Comment Model テスト", type: :model) do
  describe "Comment データを書き込む" do
    it "valid Comment Model" do
      expect(FactoryBot.build(:comment)).to(be_valid)
    end
  end
end
