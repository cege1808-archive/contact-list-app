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
    body.append("<tr data-id= " + contact.id + " ></tr>");
    var row = body.find("tr").last(); 
    console.log(contact);
    var contentName = "<td class='full_name'>"+ contact.first_name + " " + contact.last_name +"</td>" ;
    var contentImage = "<td class='img'><img class='user-image' src='http://cdn.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-19.png' /></td>";
    var contentEmail = "<td class='email'>"+ contact.email +"</td>";
    var contentPhone = "<td class='phone'>"+ contact.phone +"</td>";
    var contentBirthday = "<td class='birthday'>"+ contact.birthday +"</td>";
    var contentEdit = "<td><button class='btn btn-default glyphicon glyphicon-pencil edit' data-id= " + contact.id + " ></button></td>";
    var contentDelete = "<td><button class='btn btn-default glyphicon glyphicon-trash delete' data-id= " + contact.id + " ></button></td>";

    row.append(contentName);
    row.append(contentImage);
    row.append(contentEmail);
    row.append(contentPhone);
    row.append(contentBirthday);
    row.append(contentEdit);
    row.append(contentDelete);

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
    var addForm = form.serialize();
    console.log(addform);
    $.ajax({
      url: '/api/contact/create',
      method: 'POST',
      data: addForm,
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
    var id = button.data("id");
    console.log(button.data("id"));
    $.ajax({
      url: '/api/contact/'+ id +'/delete',
      method: 'DELETE',
      success: function(contact){
        console.log(contact);
        $("tr[data-id*="+ contact.id +"]").remove();
      }
    })
  }
  
  function editContact(button){
    var id = button.data("id");
    console.log(button.data("id"));
    $.ajax({
      url: '/api/contact/'+ id +'/info',
      method: 'GET',
      success: function(contact){
        replaceInfoToInput(contact);
      }
    })
  }

  function cancelContact(button){
    var id = button.data("id");
    console.log(button.data("id"));
    $.ajax({
      url: '/api/contact/'+ id +'/info',
      method: 'GET',
      success: function(contact){
        replaceInputToInfo(contact);
      }
    })
  }

  function saveContact(button){
    var change = $(".change");
    var saveChange = change.serialize();
    console.log(saveChange);
    var id = button.data("id");
    console.log(button.data("id"));

    $.ajax({
      url: '/api/contact/'+ id +'/save',
      method: 'POST',
      data: saveChange,
      success: function(contact){
        if (contact.first_name)  {
          replaceInputToInfo(contact);
          console.log("done saving name");
        }
        else {
          console.log(contact);
        }
      }
    })
  }

  function replaceInfoToInput(contact){
    var row = $("tr[data-id="+ contact.id +"]");
    var inputName = "<td><input class='first_name change' type='text' name ='first_name' value=' "+ contact.first_name +" '/><input class='last_name change' type='text' name ='last_name' value=' "+ contact.last_name +" '/></td>";
    var inputEmail = "<td><input class='email change' type='text' name ='email' value=' "+ contact.email +" '/></td>"
    var inputPhone = "<td><input class='phone change' type='text' name ='phone' value=' "+ contact.phone +" '/></td>"
    var inputBirthday = "<td><input class='birthday change' type='date' name ='birthday' value=' "+ contact.birthday +" '/></td>"
    var contentSave = "<td><button class='btn btn-default glyphicon glyphicon-ok save' data-id= " + contact.id + " ></button></td>";
    var contentCancel = "<td><button class='btn btn-default glyphicon glyphicon-remove cancel' data-id= " + contact.id + " ></button></td>";

    row.find(".full_name").replaceWith(inputName);
    row.find(".email").replaceWith(inputEmail);
    row.find(".phone").replaceWith(inputPhone);
    row.find(".birthday").replaceWith(inputBirthday);
    row.find(".edit").replaceWith(contentSave);
    row.find(".delete").replaceWith(contentCancel);
  }

  function replaceInputToInfo(contact){
    var row = $("tr[data-id="+ contact.id +"]");
    var contentName = "<td class='full_name'>"+ contact.first_name + " " + contact.last_name +"</td>" ;
    var contentEmail = "<td class='email'>"+ contact.email +"</td>";
    var contentPhone = "<td class='phone'>"+ contact.phone +"</td>";
    var contentBirthday = "<td class='birthday'>"+ contact.birthday +"</td>";
    var contentEdit = "<td><button class='btn btn-default glyphicon glyphicon-pencil edit' data-id= " + contact.id + " ></button></td>";
    var contentDelete = "<td><button class='btn btn-default glyphicon glyphicon-trash delete' data-id= " + contact.id + " ></button></td>";

    row.find(".first_name").replaceWith(contentName);
    row.find(".last_name").remove();
    row.find(".email").replaceWith(contentEmail);
    row.find(".phone").replaceWith(contentPhone);
    row.find(".birthday").replaceWith(contentBirthday);
    row.find(".save").replaceWith(contentEdit);
    row.find(".cancel").replaceWith(contentDelete);
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

  $("table").on('click', 'button.edit', function(event){
    event.preventDefault();
    editContact($(this));
    console.log("edit button clicked");
  });

  $("table").on('click', 'button.cancel', function(event){
    event.preventDefault();
    cancelContact($(this));
    console.log("cancel button clicked");
  });

  $("table").on('click', 'button.save', function(event){
    event.preventDefault();
    saveContact($(this));
    console.log("save button clicked");
  });


});
