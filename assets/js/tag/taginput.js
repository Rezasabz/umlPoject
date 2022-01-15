function input_tag(input_name, btn_id, modal_id = null) {
    var $input = $('input[name=' + input_name + ']')
        .tagify({
            whitelist: ["h(a,b)", "m(c,d)"]
        })
        .on('add', function(e, tagName) {
            console.log('JQEURY EVENT: ', 'added', tagName)
        })
        .on("invalid", function(e, tagName) {
            console.log('JQEURY EVENT: ', "invalid", e, ' ', tagName);
        });

    // get the Tagify instance assigned for this jQuery input object so its methods could be accessed
    var jqTagify = $input.data('tagify');

    $('#' + btn_id).on('click', (e) => {
        if (modal_id)
            $('#' + modal_id).modal('toggle')

        // console.log("====> ", jqTagify)
    })
    $('#' + btn_id).on('click', jqTagify.removeAllTags.bind(jqTagify))

}

function removeSpanElementInDiv(div_id) {
    $('#' + div_id).find('span').remove()
}

// input_tag('reciver', 'submit_btn', 'staticBackdrop')
// input_tag('define', 'submit_btn', 'staticBackdrop')
// input_tag('parametrs', 'submit_btn', 'staticBackdrop')

// input_tag('name', 'btn_sub')
// input_tag('sym', 'btn_sub')
// input_tag('Asym', 'btn_sub')






// function input_tag(input_name, btn_id, modal_id = null) {
//     var input = $('input[name=' + input_name + ']')
//         .tagify({
//             whitelist: ["h(a,b)", "m(c,d)"]
//         })
//         .on('add', function(e, tagName) {
//             console.log('JQEURY EVENT: ', 'added', tagName)
//         })
//         .on("invalid", function(e, tagName) {
//             console.log('JQEURY EVENT: ', "invalid", e, ' ', tagName);
//         });

//     // get the Tagify instance assigned for this jQuery input object so its methods could be accessed
//     var jqTagify = input.data('tagify');

//     $('#' + btn_id).on('click', (e) => {
//         if (modal_id)
//             $('#' + modal_id).modal('toggle')

//         // console.log("====> ", jqTagify)
//     })
//     $('#' + btn_id).on('click', jqTagify.removeAllTags.bind(jqTagify))

//     switch (input_name) {
//         case 'reciver':
//             obj_partner.reciver = jQuery.parseJSON(input.val())
//             obj_partner.reciver = obj_partner.reciver.map(function(elem) {
//                 return elem.value;
//             }).join(",")
//             break;
//         case 'define':
//             obj_partner.define = jQuery.parseJSON(input.val())
//             obj_partner.define = obj_partner.define.map(function(elem) {
//                 return elem.value;
//             }).join(",")
//             break;
//         case 'parametrs':
//             obj_partner.params = jQuery.parseJSON(input.val())
//             obj_partner.params = obj_partner.params.map(function(elem) {
//                 return elem.value;
//             }).join(",")
//             break;
//     }
// }


// obj_partner.reciver = jQuery.parseJSON(input_reciver.val())
// obj_partner.reciver = obj_partner.reciver.map(function(elem) {
//     return elem.value;
// }).join(",")
// obj_partner.define = jQuery.parseJSON(input_def.val())
// obj_partner.define = obj_partner.define.map(function(elem) {
//     return elem.value;
// }).join(",")
// obj_partner.params = jQuery.parseJSON(input_params.val())
// obj_partner.params = obj_partner.params.map(function(elem) {
//     return elem.value;
// }).join(",")
// send_list.push(obj_partner)
// text_note.text("definitions: " + obj_partner.define + "\n" + "parameters: " + obj_partner.params)