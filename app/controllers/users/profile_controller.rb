class Users::ProfileController < ApplicationController

  before_filter :authenticate_user!

  private

  def require_to_be_owner!
    unless current_user.id == params[:id].to_i
      redirect_to root_url
    end
  end
end
