module Resolvers
  class CommentSearch < Base
    include SearchObject.module(:graphql)
    scope { ::Comment.all }
    type Types::CommentType.connection_type, null: false
    description "Search Comment"

    class CommentFilter < ::Types::BaseInputObject
      argument :OR, [self], required: false
      argument :article_id, String, required: false
      argument :body, String, required: false
      argument :end_date, String, required: false
      argument :from, String, required: false
      argument :is_deleted, Boolean, required: false
      argument :start_date, String, required: false
    end

    option :filter, type: CommentFilter, with: :apply_filter
    option :first, type: types.Int, with: :apply_first
    option :skip, type: types.Int, with: :apply_skip

    def apply_filter(scope, value)
      branches = normalize_filters(value).inject { |acc, elem| acc.or(elem) }
      scope.merge(branches)
    end

    def normalize_filters(value, branches = [])
      scope = ::Comment.all
      scope = scope.where(article_id: decode_global_key(value[:article_id])) if value[:article_id]
      scope = scope.where(from: value[:from]) if value[:from]
      scope = scope.where(body: value[:body]) if value[:body]
      scope = scope.where(is_deleted: value[:is_deleted]) unless value[:is_deleted].nil?
      scope = scope.where("created_at >= ?", value[:start_date]) if value[:start_date]
      scope = scope.where("created_at <= ?", value[:end_date]) if value[:end_date]
      branches << scope
      value[:OR].inject(branches) { |acc, elem| normalize_filters(elem, acc) } if value[:OR].present?
      branches
    end
  end
end
