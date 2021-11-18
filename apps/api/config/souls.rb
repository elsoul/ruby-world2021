Souls.configure do |config|
  config.app = "ruby-world2021"
  config.project_id = "ruby-world2021"
  config.region = "asia-northeast1"
  config.endpoint = "/endpoint"
  config.strain = "api"
  config.fixed_gems = ["spring"]
  config.workers = [
    {
      name: "souls-ruby-world2021-mailer",
      endpoint: "https://souls-ruby-world2021-mailer-dovgxkx57a-an.a.run.app/endpoint",
      port: 3000
    }
  ]
end
