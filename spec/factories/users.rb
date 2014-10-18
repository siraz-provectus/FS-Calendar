FactoryGirl.define do 
  factory :user do
    first_name 'tester'
    email 'test@example.com'
    password 'password'
    password_confirmation 'password'
  end
end 
