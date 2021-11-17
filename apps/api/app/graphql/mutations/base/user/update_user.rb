module Mutations
  module Base::User
    class UpdateUser < BaseMutation
      field :error, String, null: true
      field :user_edge, Types::UserType.edge_type, null: false

      argument :birthday, String, required: false
      argument :category, String, required: false
      argument :email, String, required: false
      argument :first_name, String, required: false
      argument :first_name_kana, String, required: false
      argument :first_name_kanji, String, required: false
      argument :gender, String, required: false
      argument :icon_url, String, required: false
      argument :id, String, required: true
      argument :is_deleted, Boolean, required: false
      argument :lang, String, required: false
      argument :last_name, String, required: false
      argument :last_name_kana, String, required: false
      argument :last_name_kanji, String, required: false
      argument :roles_mask, Integer, required: false
      argument :screen_name, String, required: false
      argument :tel, String, required: false
      argument :uid, String, required: false
      argument :username, String, required: false

      def resolve(args)
        _, data_id = SoulsApiSchema.from_global_id(args[:id])
        new_record = { **args }
        data = ::User.find(data_id)
        data.update(new_record)
        raise(StandardError, data.errors.full_messages) unless data.save

        { user_edge: { node: data } }
      end
    end
  end
end
