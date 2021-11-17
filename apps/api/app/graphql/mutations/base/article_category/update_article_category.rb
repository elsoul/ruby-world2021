module Mutations
  module Base::ArticleCategory
    class UpdateArticleCategory < BaseMutation
      field :article_category_edge, Types::ArticleCategoryType.edge_type, null: false
      field :error, String, null: true

      argument :id, String, required: true
      argument :is_deleted, Boolean, required: false
      argument :name, String, required: false
      argument :tags, [String], required: false

      def resolve(args)
        _, data_id = SoulsApiSchema.from_global_id(args[:id])
        new_record = { **args }
        data = ::ArticleCategory.find(data_id)
        data.update(new_record)
        raise(StandardError, data.errors.full_messages) unless data.save

        { article_category_edge: { node: data } }
      end
    end
  end
end
