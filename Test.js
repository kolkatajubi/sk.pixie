$(document).ready(function(){
  $("#signin").click(()=)
    if (localStorage.chkbox != ''){

        $('#Remchkbox').attr('checked');
        $('#loginId').val(localStorage.uname);
        $('#loginPwd').val(localStorage.pwd);
        var id = localStorage.getItem('#loginId');
    }

$('#Remchkbox').click(function(){
    localStorage.uname = $('#loginId').val();
    localStorage.pwd = $('#loginPwd').val();
    localStorage.chkbox = $('#Remchkbox').val();
    
    $.ajax({
        type : "POST",
        dataType : 'json',
        url : '/',
        data : {'name' : id},
        beforeSend : function(){
          console.log(localStorage.getItem('loginId'));
          console.log("data sent");
        },
        success : function(data){
          console.log(data);
          console.log(data.code);
          console.log(data.value);
        }
      });
    });
  });




    // window.onload = function() {
    //     var min = "0" + 2;
    //     var sec = "0" + 0;
    //     setInterval(function() {
    //         var a = new Date();
    //         var time = min + " : " + sec;
    //         document.getElementById("Remchkbox").innerHTML = time;
    //         if (sec == 00) {
    //             if (min != 0) {
    //                 min--;
    //                 sec = 59;
    //                 if (min < 10) {
    //                     min = "0" + min;
    //                 }
    //             }
    //         } else {
    //             sec--;
    //             if (sec < 10) {
    //                 sec = "0" + sec;
    //             }
    //         }
    //     }, 1000);
    // }




