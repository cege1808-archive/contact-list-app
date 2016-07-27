# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/contacts' do
  content_type :json
  @all_contacts = Contact.order(:first_name)
  # @all_contacts.each do |contact|
  #   contact[:birthday_format] = contact.birthday_format
  #   contact[:full_name] = contact.full_name
  # end

  @all_contacts.to_json
end

# get '/api/contact/new' do
#   @contact = Contact.new
#   erb :new
# end

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
    @contact.errors.full_messages.to_json
  end
end

get '/contact/:contact_id' do

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




