$(document).ready(function() {
  $("button.cancel").hide();
  $(".add-contact form").hide();
  $(".add-contact").on('click', 'button', function(){
    $(this).parent().find(".add").toggle();
    $(this).parent().find(".cancel").toggle();
    $(this).parent().find("form").toggle();
  });


  function setTable(){
    var table = $("table");
    if (table.length) {
      table.append("<tr></tr>");
      var row = table.find("tr");
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

  }

  function insertContacts(){
    $.ajax({
      url: '/api/contacts',
      method: 'GET',
      success: function(data){
        $.each(data, function(index, contact)){

        }
        var table = $("table");
        var contentName = "<td>"+ data.name +"</td>" ;
        var contentImage = "<td></td>";
        var contentEmail = "<td>Email</td>";
        var contentPhone = "<td>Phone</td>";
        var contentBirthday = "<td>Birthday</td>";
      };
    });

  }

  setTable();
  // $.ajax({
  //   url: '/api/contact/create',
  //   method: 'POST',
  //   success: function(){

  //   };
  // });

});
