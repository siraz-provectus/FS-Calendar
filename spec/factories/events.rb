FactoryGirl.define do 
  factory :event do
    name 'Happy birth day'
    start_date Time.now()
    end_date Time.now() + 1.hours
    repeat 0
  end
end 
