module Types
  class ArticleCategoryType < BaseObject
    implements GraphQL::Types::Relay::Node

    global_id_field :id
    field :created_at, String, null: true
    field :is_deleted, Boolean, null: true
    field :name, String, null: true
    field :tags, [String], null: true
    field :updated_at, String, null: true
  end
end
