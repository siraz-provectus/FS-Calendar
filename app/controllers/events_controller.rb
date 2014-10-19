class EventsController < ApplicationController
	expose (:events) {
    Event.only_my(event_params[:user_id])
  }

	def index
		render json: events
	end

  def new
  	@event = Event.new(event_params)
  end

  def create
  	@event = Event.create(event_params)
  end

  def edit
  	@event = Event.find(params[:id])
  end

  def update
  	@event = Event.find(params[:id])
    flash[:notice] = "Event update success!" if @event.update(event_params)
  end

  def default_serializer_options   
    {root: false}    
  end

  private
  def event_params
    params.require(:event).permit(:name, :start_date, :end_date, :repeat, :user_id)
  end
end

