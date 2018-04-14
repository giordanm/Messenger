$('.form-horizontal').on('submit', function(event) {

    // Prevent the page from reloading
    event.preventDefault();

    // process the form
    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : '/session', // the url where we want to POST
        data        : $(".form-horizontal").serialize(), // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        statusCode: {
            400: function () {
                document.getElementsByClassName('error-block')[0].innerHTML="Please include a username and password.";
            },
            401: function () {
                document.getElementsByClassName('error-block')[0].innerHTML="User doesn't exist or password is incorrect";
            },
            404: function () {
                document.getElementsByClassName('error-block')[0].innerHTML="404 Error";
            },
            201: function () {
                localStorage.setItem("username", $("#username").val());
                window.location = '/messages.html?username=' + $("#username").val();
            }
        }
    });
});