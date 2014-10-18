require 'spec_helper'

describe Event do
  
  let(:event) { FactoryGirl.create(:event) }
  
  
  it "should require an event name" do
    event.name = ""
    event.should_not be_valid
  end

  it "event name maximum 30" do
    event.name = "a" * 31
    event.should_not be_valid
  end

  it "should require an event start_date" do
    event.start_date = ""
    event.should_not be_valid
  end

  it "should require an event end_date" do
    event.end_date = ""
    event.should_not be_valid
  end

  it "should event repeate every year" do
    event.repeat = 4
    event.should be_valid
  end

  it "should event repeate not valid" do
    event.repeat = 5
    event.should_not be_valid
  end
  
end
