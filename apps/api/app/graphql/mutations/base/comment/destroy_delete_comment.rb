module Mutations
  module Base::Comment
    class DestroyDeleteComment < BaseMutation
      field :comment, Types::CommentType, null: false
      argument :id, String, required: true

      def resolve(args)
        _, data_id = SoulsApiSchema.from_global_id(args[:id])
        comment = ::Comment.find(data_id)
        comment.destroy
        { comment: comment }
      end
    end
  end
end
