$(document).ready(function() {
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
      var headingImage = "<th></th>";
      var headingEmail = "<th>Email</th>";
      var headingPhone = "<th>Phone</th>";
      var headingBirthday = "<th>Birthday</th>";
      row.append(headingName);
      row.append(headingImage);
      row.append(headingEmail);
      row.append(headingPhone);
      row.append(headingBirthday);


  }

  function insertContacts(){
    setTable();
    $.ajax({
      url: '/api/contacts',
      method: 'GET',
      success: function(data){
        console.log(data);
        $.each(data, function(index, contact){
          console.log(contact);

          var body = $("table tbody");
          body.append("<tr></tr>");
          var row = body.find("tr").last(); 
          

          var contentName = "<td>"+ contact.first_name +"</td>" ;
          var contentImage = "<td><img class='user-image' src='http://cdn.iconmonstr.com/wp-content/assets/preview/2012/240/iconmonstr-user-19.png' /></td>";
          var contentEmail = "<td>"+ contact.email +"</td>";
          var contentPhone = "<td>"+ contact.phone +"</td>";
          var contentBirthday = "<td>"+ contact.birthday +"</td>";

          row.append(contentName);
          row.append(contentImage);
          row.append(contentEmail);
          row.append(contentPhone);
          row.append(contentBirthday);
        });
      }
    });

  }

  
  insertContacts();
  // $.ajax({
  //   url: '/api/contact/create',
  //   method: 'POST',
  //   success: function(){

  //   };
  // });

});
