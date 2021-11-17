Souls.configure do |config|
  config.app = "ruby-world2021"
  config.project_id = "ruby-world2021"
  config.region = "asia-northeast1"
  config.endpoint = "/endpoint"
  config.strain = "mother"
  config.fixed_gems = ["spring"]
  config.workers = [
    {
      name: "souls-ruby-world2021-mailer",
      endpoint: "",
      port: 3000
    }
  ]
end
