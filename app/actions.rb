# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/contacts' do
  content_type :json
  @all_contacts = Contact.order(:first_name)
  @all_contacts.to_json
end

get '/api/contact/:contact_id/info' do
  content_type :json
  @contact = Contact.find(params[:contact_id])
  @contact.to_json
end

post '/api/contact/create' do 
  content_type :json
  @contact = Contact.new(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:email],
    phone: params[:phone],
    birthday: params[:birthday]
    )
  if @contact.save
    @contact.to_json
  else
    @contact.errors.to_json
  end
end

post '/api/contact/:contact_id/save' do
  content_type :json 
  @contact = Contact.find(params[:contact_id])
  @contact[:first_name] = params[:first_name]
  @contact[:last_name] = params[:last_name]
  @contact[:email] = params[:email]
  @contact[:phone] = params[:phone]
  @contact[:birthday] = params[:birthday]

  if @contact.save
    @contact.to_json
  else
    @contact.errors.full_messages.to_json
  end

end

delete '/api/contact/:contact_id/delete' do
  content_type :json
  @contact = Contact.find(params[:contact_id])
  
  if @contact.destroy
    @contact.to_json
  else
    @contact.errors.to_json
  end

end




