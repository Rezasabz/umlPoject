var $input = $('input[name=tags-jquery]')
    .tagify({
        whitelist: [
            { "id": 1, "value": "some string" }
        ]
    })
    .on('add', function(e, tagName) {
        console.log('JQEURY EVENT: ', 'added', tagName)
    })
    .on("invalid", function(e, tagName) {
        console.log('JQEURY EVENT: ', "invalid", e, ' ', tagName);
    });

// get the Tagify instance assigned for this jQuery input object so its methods could be accessed
var jqTagify = $input.data('tagify');

// bind the "click" event on the "remove all tags" button
$('.tags-jquery--removeAllBtn').on('click', (e) => {
        console.log($input.val())
    })
    // jqTagify.removeAllTags.bind(jqTagify)