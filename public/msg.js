//display cc & bcc inputs
function showCC(){
    $('#CcDiv').show();
    return false;
}
function showBcc(){
  $('#BccDiv').show();
  return false;
}
$(document).ready(function(){ 
    //set textarea placeholder
    $('form').find("input[type=textarea], textarea").each(function(ev)
    {
        if(!$(this).val()) { 
       $(this).attr("placeholder", "Type your message here");
    }
    });
    // prevent submit when enter
    $(window).keydown(function(event){
        if(event.keyCode == 13) {
          event.preventDefault();
        }
      });

    //check if emails are valid
    var inputTo = $('#ToEmail');
    var inputCc = $('#ToCc');
    var inputBcc = $('#ToBcc');

    inputTo.on({
        keyup: function(e) {
            if (e.which === 188 || e.which === 13) check(inputTo);
        },
        blur: check    
    });

    inputCc.on({
        keyup: function(e) {
            if (e.which === 188 || e.which === 13) check(inputCc);
        },
        blur: check    
    });

    inputBcc.on({
        keyup: function(e) {
            if (e.which === 188 || e.which === 13) check(inputBcc);
        },
        blur: check    
    });

    function check(obj) {
        var val  = $.trim(obj.val()),
            err  = '';
        
        if (!val.length) {
            err = 'No input ?';
            return;
        }
        
        var emails   = val.split(','),
            notvalid = [],
            temp     = [];
        
        $.each(emails, function(_,mail) {
            mail = $.trim(mail);
            if ( mail.length ) {
                var m = mail.match(/([a-zA-Z0-9._-]+@[a-zA-Z0-9._-]+\.[a-zA-Z0-9._-]+)/gi);
                if (m) {
                    temp.push(m);
                }else{
                    temp.push(mail);
                    notvalid.push(mail)
                }
            }else{
                temp.push(mail);
            }
            if (notvalid.length) err = 'Not valid emails : ' + notvalid.join(', ');
        });
        
        $('#error').html(err);
        obj.val((temp.length ? temp : emails).join(', '));
    }

    


  });

  


