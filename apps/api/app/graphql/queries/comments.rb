module Queries
  class Comments < Queries::BaseQuery
    type [Types::CommentType], null: false

    def resolve
      ::Comment.all
    end
  end
end
