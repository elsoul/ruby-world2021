module Types
  class UserType < BaseObject
    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :articles, [Types::ArticleType], null: true
    field :birthday, String, null: true
    field :category, String, null: true
    field :created_at, String, null: true
    field :email, String, null: true
    field :first_name, String, null: true
    field :first_name_kana, String, null: true
    field :first_name_kanji, String, null: true
    field :gender, String, null: true
    field :icon_url, String, null: true
    field :is_deleted, Boolean, null: true
    field :lang, String, null: true
    field :last_name, String, null: true
    field :last_name_kana, String, null: true
    field :last_name_kanji, String, null: true
    field :roles_mask, Integer, null: true
    field :screen_name, String, null: true
    field :tel, String, null: true
    field :uid, String, null: true
    field :updated_at, String, null: true
    field :username, String, null: true

    unless ENV["RACK_ENV"] == "test"
      def articles
        AssociationLoader.for(User, :article).load(object)
      end
    end
  end
end
