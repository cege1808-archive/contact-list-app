$(function() {
  $("button.cancel").hide();
  $(".add-contact form").hide();
  $(".add-contact").on('click', 'button', function(){
    $(this).parent().find(".add").toggle();
    $(this).parent().find(".cancel").toggle();
    $(this).parent().find("form").toggle();
  });


  function setTable(){
    var head = $("table thead");
      head.append("<tr></tr>");
      var row = head.find("tr");
      var headingName = "<th>Full Name </th>" ;
      var headingBlank = "<th></th>";
      var headingEmail = "<th>Email</th>";
      var headingPhone = "<th>Phone</th>";
      var headingBirthday = "<th>Birthday</th>";
      row.append(headingName);
      row.append(headingBlank);
      row.append(headingEmail);
      row.append(headingPhone);
      row.append(headingBirthday);
      row.append(headingBlank);
      row.append(headingBlank);
  }

  function insertContact(contact){
    var body = $("table tbody");
    body.append("<tr></tr>");
    var row = body.find("tr").last(); 
    console.log(contact);
    var contentName = "<td>"+ contact.first_name + " " + contact.last_name +"</td>" ;
    var contentImage = "<td><img class='user-image' src='http://cdn.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-19.png' /></td>";
    var contentEmail = "<td>"+ contact.email +"</td>";
    var contentPhone = "<td>"+ contact.phone +"</td>";
    var contentBirthday = "<td>"+ contact.birthday +"</td>";
    var contentEdit = "<td><button class='btn btn-default glyphicon glyphicon-pencil edit' data-id=' " + contact.id + " '></button></td>";
    var contentDelete = "<td><button class='btn btn-default glyphicon glyphicon-trash delete' data-id=' " + contact.id + " '></button></td>";

    row.append(contentName);
    row.append(contentImage);
    row.append(contentEmail);
    row.append(contentPhone);
    row.append(contentBirthday);
    row.append(contentEdit);
    row.append(contentDelete);


    // body.find("tr").data("id", contact.id);
    // body.find("button").data("id", contact.id);
  }

  function getContacts(){
    setTable();
    $.ajax({
      url: '/api/contacts',
      method: 'GET',
      success: function(data){
        console.log(data);
        $.each(data, function(index, contact){
          insertContact(contact);
        });
      }
    });
  }

  function addContact(){
    var form = $("form");
    var addform = form.serialize();
    console.log(addform);
    $.ajax({
      url: '/api/contact/create',
      method: 'POST',
      data: addform,
      success: function(contact){
        if (contact.first_name)  {
          insertContact(contact);
          console.log("done adding name");
          form.trigger("reset");
        }
        else {
          console.log(contact);
        }
      }
    })

  }


  function deleteContact(button){
    id = button.data("id");
    console.log(button.data("id"));
    $.ajax({
      url: '/api/contact/'+ id +'/delete',
      method: 'DELETE',
      success: function(contact){
        console.log(contact);
        $("button[data-id*="+ contact.id +"]").closest("tr").remove();
      }

    })
  }
  


  getContacts();

  $("form").on('submit', function(event){
    event.preventDefault();
    addContact();
  });

  $("table").on('click', 'button.delete', function(event){
    event.preventDefault();
    deleteContact($(this));
    console.log("delete button clicked");
  });



});
