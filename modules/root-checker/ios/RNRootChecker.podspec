
Pod::Spec.new do |s|
  s.name         = "RNRootChecker"
  s.version      = "1.0.0"
  s.summary      = "RNRootChecker"
  s.description  = <<-DESC
                  RNRootChecker
                   DESC
  s.homepage     = ""
  s.license      = "MIT"
  # s.license      = { :type => "MIT", :file => "FILE_LICENSE" }
  s.author             = { "author" => "author@domain.cn" }
  s.platform     = :ios, "7.0"
  s.source       = { :git => "https://github.com/author/RNRootChecker.git", :tag => "master" }
  s.source_files  = "RNRootChecker/**/*.{h,m}"
  s.requires_arc = true


  s.dependency "React"
  #s.dependency "others"

end

  