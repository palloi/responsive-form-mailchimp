(function(){
  var contact = function(){
    var init = function() {
      $('#form-contact #phone').phoneBrazil();

      $('#form-contact').validate({
        rules : {
          name: "required",
          email: { required: true, email: true },
          phone: { required: true, minlength: 14 },
          company: "required",
          message: "required"
        },
        messages: {
          name: "*",
          email: { required: "*", email: "*" },
          phone: { required: "*", minlength: "*" },
          company: "*",
          message: "*"
        },
        submitHandler: function(form) {
          var $form = $(form);

          var params = {
            name: $form.find('#name').val(),
            email: $form.find('#email').val(),
            phone: $form.find('#phone').val(),
            company: $form.find('#company').val(),
            message: $form.find('#message').val()
          };

          $.ajax({
            type: $form.attr('method'),
            url: $form.attr('action'),
            data: params,
            success: function( data ) {
              if(data == "true") {
                $form.find('.input input').val("");
                $form.find('.input textarea').val("");
                setMessage("Mission accomplished. <strong>"+ params.email +"</strong> was successfully added to list.", "success");
              } else {
                setMessage("Mission failed. <strong>"+ params.email +"</strong> not was added to list.", "error");
              }
            },
            error: function( data ) {
              setMessage("Mission failed in connection. Try again.", "error");
            }
          });

          return false;
        }
      });
    };

    var setMessage = function($message, $type) {
      $('.form-message').html($message).addClass($type);

      setTimeout(function(){
        $('.form-message').removeClass($type);
      }, 6000);
    };

    return {init: init};
  }();

  $(document).ready(contact.init);
})();
