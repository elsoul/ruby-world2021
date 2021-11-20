module Queries
  class NewCommentMailer < BaseQuery
    description ""
    type Types::NewCommentMailerType, null: false

    argument :article_id, Integer, required: true

    def resolve(args)
      article = ::Article.find(args[:article_id])
      # First, instantiate the Mailgun Client with your API key
      mg_client = ::Mailgun::Client.new(ENV["MAILGUN_KEY"])

      # Define your message parameters
      message_params = {
        from: "postmaster@elsoul.nl",
        to: "f.kawasaki@elsoul.nl",
        subject: "SOULs Mailer test!",
        text: "ブログ記事 ID:#{article.id}\n タイトル：#{article.title} \nにコメントが入りました！"
      }

      # Send your message through the client
      mg_client.send_message(ENV["MAILGUN_DOMAIN"], message_params)
      { response: "Job done!" }
    rescue StandardError => e
      GraphQL::ExecutionError.new(e.to_s)
    end
  end
end
