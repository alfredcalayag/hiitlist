class SessionsController < ApplicationController
  protect_from_forgery
  after_filter :set_csrf_cookie_for_ng

  def set_csrf_cookie_for_ng
    cookies['XSRF-TOKEN'] = form_authenticity_token if protect_against_forgery?
  end

  def show

  end

  def create
    puts "YO.  params: "
    # print params
    user = User.find_by(email: params[:email])
    print user
    # if user && user.authenticate(params[:session][:password])
    if user
      # Session created on front end
      render :json => {current_user_id: user.id}
    else
      # flash.now[:danger] = 'Invalid email/password combination'
      # render 'new'
      render :json => {error: "Server MSG: Invalid email/password combination"}
    end
  end

  def destroy
    session[:current_user_id] = nil
    render :json => {message: "Successfully signed out."}
  end

  protected
  def verified_request?
    super || valid_authenticity_token?(session, request.headers['X-XSRF-TOKEN'])
  end

end