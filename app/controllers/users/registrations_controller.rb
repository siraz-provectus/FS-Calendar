class Users::RegistrationsController < Devise::RegistrationsController
  before_filter :update_sanitized_params, if: :devise_controller?

  def update_sanitized_params
    devise_parameter_sanitizer.for(:sign_up) do |u| 
      u.permit(
        :first_name, 
        :last_name,
        :email,
        :password,
        :password_confirmation,
        :terms_of_service
      )
    end
  end
end