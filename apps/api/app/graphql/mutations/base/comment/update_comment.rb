module Mutations
  module Base::Comment
    class UpdateComment < BaseMutation
      field :comment_edge, Types::CommentType.edge_type, null: false
      field :error, String, null: true

      argument :article_id, String, required: false
      argument :body, String, required: false
      argument :from, String, required: false
      argument :id, String, required: true
      argument :is_deleted, Boolean, required: false

      def resolve(args)
        _, data_id = SoulsApiSchema.from_global_id(args[:id])
        _, article_id = SoulsApiSchema.from_global_id(args[:article_id])
        new_record = { **args, article_id: article_id }
        data = ::Comment.find(data_id)
        data.update(new_record)
        raise(StandardError, data.errors.full_messages) unless data.save

        { comment_edge: { node: data } }
      end
    end
  end
end
