class Users::SettingsController < Users::ProfileController

  expose :user, attributes: :user_params

  before_filter :require_to_be_owner!

  def edit
  end

  def update
    current_user.update(user_params)

    if !current_user.errors.present?
      redirect_to edit_users_setting_path(current_user), notice: 'Settings updated'
    else
      render "edit"
    end
  end

  private
  def user_params
    params.require(:user).permit(:first_name, :last_name, :email)
  end
end
