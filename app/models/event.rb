class Event < ActiveRecord::Base
	validates :name,
            presence: true,
            length: { maximum: 30 }
  validates :start_date, :end_date, presence: true
  validates :repeat, inclusion: { in: 0..4 }
	scope :only_my, lambda {|user_id| where(user_id: user_id) if user_id.present?}
end
