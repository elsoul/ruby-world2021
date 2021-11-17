module Queries
  class Comment < Queries::BaseQuery
    type Types::CommentType, null: false
    argument :id, String, required: true

    def resolve(args)
      _, data_id = SoulsApiSchema.from_global_id(args[:id])
      ::Comment.find(data_id)
    end
  end
end
