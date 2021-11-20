module Mutations
  module Base::Comment
    class CreateComment < BaseMutation
      field :comment_edge, Types::CommentType.edge_type, null: false
      field :error, String, null: true

      argument :article_id, String, required: false
      argument :body, String, required: false
      argument :from, String, required: false
      argument :is_deleted, Boolean, required: false

      def resolve(args)
        _, article_id = SoulsApiSchema.from_global_id(args[:article_id])
        new_record = { **args, article_id: article_id }
        data = ::Comment.new(new_record)
        raise(StandardError, data.errors.full_messages) unless data.save

        query_string = make_graphql_query(query: "NewCommentMailer", args: { article_id: article_id.to_i })
        case ENV["RACK_ENV"]
        when "production"
          publish_pubsub_queue(topic_name: "souls_mailer_new_comment_mailer", message: query_string)
        when "development"
          puts(post_to_dev(worker_name: "mailer", query_string: query_string))
        end

        { comment_edge: { node: data } }
      end
    end
  end
end
