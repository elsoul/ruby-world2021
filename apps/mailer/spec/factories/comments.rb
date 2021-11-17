FactoryBot.define do
  factory :comment do
    association :article, factory: :article
    from { Faker::Games::SuperMario.character }
    body { Faker::JapaneseMedia::StudioGhibli.quote }
    is_deleted { false }
    created_at { Time.now }
    updated_at { Time.now }
  end
end
