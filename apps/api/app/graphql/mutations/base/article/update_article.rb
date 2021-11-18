module Mutations
  module Base::Article
    class UpdateArticle < BaseMutation
      field :article_edge, Types::ArticleType.edge_type, null: false
      field :error, String, null: true

      argument :article_category_id, String, required: false
      argument :body, String, required: false
      argument :id, String, required: true
      argument :is_deleted, Boolean, required: false
      argument :is_public, Boolean, required: false
      argument :just_created, Boolean, required: false
      argument :public_date, String, required: false
      argument :slug, String, required: false
      argument :tags, [String], required: false
      argument :thumnail_url, String, required: false
      argument :title, String, required: false

      def resolve(args)
        _, data_id = SoulsApiSchema.from_global_id(args[:id])
        data = ::Article.find(data_id)
        new_record = { **args, id: data_id, user_id: data.user_id, article_category_id: data.article_category_id }
        data.update(new_record)
        raise(StandardError, data.errors.full_messages) unless data.save

        { article_edge: { node: data } }
      end
    end
  end
end
