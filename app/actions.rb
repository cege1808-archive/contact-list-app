# Homepage (Root path)
get '/' do
  erb :index
end

get '/api/contacts' do
  content_type :json
  @all_contacts = Contact.order(:first_name)
  @all_contacts.to_json
end

get '/api/contact/new' do
  @contact = Contact.new
  erb :new
end

post '/api/contact/create' do 
  @contact = Contact.create(
    first_name: params[:first_name],
    last_name: params[:last_name],
    email: params[:email],
    phone: params[:phone],
    birthday: params[:birthday]
    )
  # persisted?
end

get '/contact/:contact_id' do

end




