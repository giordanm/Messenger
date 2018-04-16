$('.form-horizontal').on('submit', function(event) {

    event.preventDefault();

    $.ajax({
        type        : 'POST',
        url         : '/register',
        data        : $(".form-horizontal").serialize(),
        dataType    : 'json',
        statusCode: {
            400: function () {
                document.getElementsByClassName('error-block')[0].innerHTML="Please fill out all of the fields.";
            },
            404: function () {
                document.getElementsByClassName('error-block')[0].innerHTML="404 Error";
            },
            409: function () {
                document.getElementsByClassName('error-block')[0].innerHTML="That username has already been taken. Please choose another.";
            },
            500: function () {
                document.getElementsByClassName('error-block')[0].innerHTML="Internal Server Error";
            },
            201: function () {
                console.log('mydata');
                // console.log(data);
                console.log($("#username").val());
                localStorage["username"] = $("#username").val();
                window.location = '/messages.html';
            }
        }
    });

});