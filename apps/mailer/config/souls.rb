Souls.configure do |config|
  config.app = "ruby-world2021"
  config.project_id = "ruby-world2021"
  config.region = "asia-northeast1"
  config.endpoint = "/endpoint"
  config.strain = "worker"
  config.fixed_gems = ["spring"]
  config.workers = []
end
