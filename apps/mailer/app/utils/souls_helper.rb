module SoulsHelper
  def self.export_csv(model_name)
    singularized_name = model_name.singularize.underscore
    return "Please Set column names in Constants !" unless Constants.public_send("#{singularized_name}_columns").size
    unless Constants.public_send("#{singularized_name}_columns").size ==
           Object.const_get(singularized_name.camelize).column_names.size

      return "Columns number doesn't match! Please check Constants!"
    end

    file_path = "./db/seed_csv/#{model_name.pluralize.underscore}.csv"
    CSV.open(file_path, "w") do |csv|
      csv << Object.const_get(singularized_name.camelize).column_names.map do |c|
        Constants.public_send("#{singularized_name}_columns")[c.to_sym]
      end
      Object.const_get(singularized_name.camelize).all.reverse.each do |item|
        csv << item.attributes.values
      end
    end
    "export success!:#{file_path}"
  rescue StandardError => e
    e
  end

  def self.export_model_to_csv(model_name)
    singularized_name = model_name.singularize.underscore
    pluralized_name = model_name.pluralize.underscore
    time = Time.now.utc.strftime("%F-%H-%M-%S")
    file_name = "#{pluralized_name}-#{time}.csv"
    upload_path = "csv/#{singularized_name}/#{file_name}"
    file_path = "./tmp/#{pluralized_name}-#{time}.csv"
    class_name = Object.const_get(singularized_name.camelize)
    CSV.open(file_path, "w") do |csv|
      if Constants.public_send("#{singularized_name}_columns").size.present?
        unless Constants.public_send("#{singularized_name}_columns").size ==
               Object.const_get(singularized_name.camelize).column_names.size

          return "Columns number doesn't match! Please check Constants !"
        end

        csv << class_name.column_names.map { |c| Constants.public_send("#{singularized_name}_columns")[c.to_sym] }
      else
        csv << class_name.column_names
      end
      class_name.all.reverse.each do |item|
        csv << item.attributes.values
      end
    end
    upload_to_gcs(file_path, upload_path)
    FileUtils.rm(file_path)
    bucket = ENV["RACK_ENV"] == "production" ? ENV["GCS_NAME_PRODUCTION"] : ENV["GCS_NAME_DEV"]
    "https://storage.cloud.google.com/#{bucket}/csv/#{singularized_name}/#{file_name}"
  rescue StandardError => e
    e.backtrace
  end

  def self.upload_to_gcs(file_path, upload_path)
    storage = Google::Cloud::Storage.new
    bucket =
      if ENV["RACK_ENV"] == "production"
        storage.bucket(ENV["GCS_NAME_PRODUCTION"])
      else
        storage.bucket(ENV["GCS_NAME_DEV"])
      end
    file = bucket.create_file(file_path, upload_path, acl: "authenticated_read")
    file.public_url
  rescue StandardError => e
    raise(StandardError, e)
  end

  def self.get_selenium_driver(mode = :chrome)
    case mode
    when :firefox_remote_capabilities
      firefox_capabilities = Selenium::WebDriver::Remote::Capabilities.firefox
      Selenium::WebDriver.for(:remote, url: "http://hub:4444/wd/hub", desired_capabilities: firefox_capabilities)
    when :firefox
      Selenium::WebDriver.for(:firefox)
    else
      options = Selenium::WebDriver::Chrome::Options.new
      options.add_argument("--disable-popup-blocking")
      options.add_argument("--disable-translate")
      options.add_argument("-headless") if ENV["RACK_ENV"] == "production"
      Selenium::WebDriver.for(:chrome, options: options)
    end
  end

  def self.get_tables
    path = "./db/schema.rb"
    tables = []
    File.open(path, "r") do |f|
      f.each_line.with_index do |line, _i|
        tables << line.split("\"")[1] if line.include?("create_table")
      end
    end
    tables
  end
end
