$('.form-horizontal').on('submit', function(event) {

    // Prevent the page from reloading
    event.preventDefault();

    $.get( "/messages", function( data ) {
        data.forEach(msg => {
            $( "#mymessages" ).append('<p>From: '+msg.from+'</p>');
            $( "#mymessages" ).append('<p>Text: '+msg.msg+'</p>');
            $( "#mymessages" ).append('<br>');
        });

    });

    // process the form
    $.ajax({
        type        : 'POST', // define the type of HTTP verb we want to use (POST for our form)
        url         : '/create', // the url where we want to POST
        data        : $(".form-horizontal").serialize(), // our data object
        dataType    : 'json', // what type of data do we expect back from the server
        statusCode: {
            400: function () {
                document.getElementsByClassName('error-block')[0].innerHTML='please include a from user and a message';
            },
            404: function () {
                document.getElementsByClassName('error-block')[0].innerHTML='from user not found';
            },
            201: (data) => {
                console.log(data)
                // document.getElementsByTagName('body')[0].append(data.msg+"\n - Posted By: "+data.from );
                let newParagraph = document.createElement('p');
                newParagraph.textContent = data.msg+" - Posted By: "+data.from;
                document.getElementsByTagName('body')[0].appendChild(newParagraph);
            }
        }
    });
});