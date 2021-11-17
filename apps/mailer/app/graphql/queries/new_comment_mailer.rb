module Queries
  class NewCommentMailer < BaseQuery
    description ""
    type Types::NewCommentMailerType, null: false

    def resolve
      # First, instantiate the Mailgun Client with your API key
      mg_client = ::Mailgun::Client.new(ENV["MAILGUN_KEY"])

      # Define your message parameters
      message_params = {
        from: "postmaster@elsoul.nl",
        to: "f.kawasaki@elsoul.nl",
        subject: "SOULs Mailer test!",
        text: "It is really easy to send a message!"
      }

      # Send your message through the client
      mg_client.send_message(ENV["MAILGUN_DOMAIN"], message_params)
      { response: "Job done!" }
    rescue StandardError => e
      GraphQL::ExecutionError.new(e.to_s)
    end
  end
end
