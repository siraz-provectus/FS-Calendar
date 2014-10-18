class Event < ActiveRecord::Base
	scope :only_my, lambda {|user_id| where(user_id: user_id) if user_id.present?}
end
