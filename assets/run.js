$(document).ready(function(){
    $("#submit").click(function(e){
        if($("#signupPwd").val() == $("#csignupPwd").val()) {
            $.ajax({
                url: "/",
                type: "POST",
                dataType: "json",
                contentType: "application.json",
                data: {username: "User1", password: "psw", sessionId: "4"}
            });
        e.preventDefault();
    }});
});



$(document).ready(function(){
    $("signin").click(function(e){
        if($("#signin").val() == $("#csignupPwd").val()) {
            $.ajax({
                url: "/",
                type: "POST",
                dataType: "json",
                contentType: "application.json",
                data: {username: "User1", password: "psw", sessionId: "4"}
            });
        e.preventDefault();
    }});
});



// beforeSend: function(x) {
    //   if (x && x.overrideMimeType) {
    //     x.overrideMimeType("application/j-son;charset=UTF-8");
    //   }
    // },
    // success: function(data) {
    //     if (data.msg=="Welcome buddy :)") {
    //         $(".loginElements").hide();
    //         $("#loggedInMessage").text(data.msg);
    //     }
    //     else if (data.msg=="Sorry, wrong password :(") {
    //         $("#loggedInMessage").text(data.msg);
    //     }
    //     else if (data.msg=="Sorry, I don't know this person :(") {
    //         $("#loggedInMessage").text(data.msg);
    //     }
    // }