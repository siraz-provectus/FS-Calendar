require 'spec_helper'

describe User do
  
  let(:user) { FactoryGirl.create(:user) }
  
  
  it "first_name maximum 30" do
    user.first_name = "a" * 31
    user.should_not be_valid
  end

  it "should require an email address" do
    user.email = ""
    user.should_not be_valid
  end
  
  it "should accept valid email addresses" do
    addresses = %w[user@foo.com THE_USER@foo.bar.org first.last@foo.jp]
    addresses.each do |address|
      user.email = address
      user.should be_valid
    end
  end
  
  it "should reject invalid email addresses" do
    addresses = %w[user@foo,com user_at_foo.org example.user@foo.]
    addresses.each do |address|
      user.email = address
      user.should_not be_valid
    end
  end
  
  it "should reject duplicate email addresses" do
    user
    user_with_duplicate_email = User.create(email: user.email, first_name: 'Test', password: 'password')
    user_with_duplicate_email.errors.should include(:email)
  end
  
  it "should reject email addresses identical up to case" do
    user
    user_with_duplicate_email = User.create(email: user.email.upcase, first_name: 'Test', password: 'password')
    user_with_duplicate_email.should_not be_valid
  end
  
  describe "passwords" do
    it "should have a password attribute" do
      user.should respond_to(:password)
    end

    it "should have a password confirmation attribute" do
      user.should respond_to(:password_confirmation)
    end
  end
  
  describe "password validations" do
    it "should require a password" do
      user.password = ""
      user.password_confirmation = ""
      user.should_not be_valid
    end

    it "should require a matching password confirmation" do
      user.password_confirmation = "invalid"
      user.should_not be_valid
    end
    
    it "should reject short passwords" do
      user.password = ""
      user.password_confirmation = ""
      user.should_not be_valid
    end 
  end
  
  describe "password encryption" do   
    it "should have an encrypted password attribute" do
      user.should respond_to(:encrypted_password)
    end

    it "should set the encrypted password attribute" do
      user.encrypted_password.should_not be_blank
    end
  end
end
