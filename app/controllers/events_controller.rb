class EventsController < ApplicationController
	expose :events

	def index
		render json: events
	end

end
