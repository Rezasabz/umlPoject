// text_label(stage, layer, x = null, y = null, text = null, group) {

//     var textNode = new Konva.Text({
//         // text: 'name',
//         // x: 0,
//         y: 17,
//         fontSize: 14,
//         draggable: true,
//         width: 100,
//         align: 'center'
//     });

//     if (x != null && y != null) {

//         textNode.absolutePosition({
//             x: x,
//             y: y
//         })
//     }

//     if (text == null) {
//         textNode.text("message")
//     } else {
//         textNode.text(text)
//     }


//     layer.add(textNode);
//     // console.log("1 ====> ", group.getAttrs())
//     group.add(textNode)

//     var tr = new Konva.Transformer({

//         enabledAnchors: ['middle-left', 'middle-right'],
//         borderDash: [3, 3],
//         centeredScaling: true,
//         rotationSnaps: [0, 90, 180, 270],
//         // set minimum width of text
//         boundBoxFunc: function(oldBox, newBox) {
//             newBox.width = Math.max(30, newBox.width);
//             return newBox;
//         },
//     });

//     tr.nodes([textNode]);
//     // if (group != null) {
//     // group.add(textNode)
//     // return textNode
//     // }
//     textNode.on('transform', function() {
//         // reset scale, so only with is changing by transformer
//         textNode.setAttrs({
//             width: textNode.width() * textNode.scaleX(),
//             scaleX: 1,
//         });
//     });
//     textNode.on('click', () => {
//         layer.add(tr);
//     })



//     textNode.on('dblclick dbltap', (e) => {
//         // hide text node and transformer:
//         textNode.hide();
//         tr.hide();

//         // at first lets find position of text node relative to the stage:
//         // var textPosition = textNode.getAbsolutePosition();
//         // var gr = group.getAbsolutePosition()
//         var areaPosition = {
//             x: e.evt.x - 41,
//             y: e.evt.y - 8

//         };


//         var textarea = document.createElement('textarea');
//         document.body.appendChild(textarea);

//         // apply many styles to match text on canvas as close as possible
//         // remember that text rendering on canvas and on the textarea can be different
//         // and sometimes it is hard to make it 100% the same. But we will try...
//         textarea.value = textNode.text();
//         textarea.style.position = 'absolute';
//         textarea.style.top = areaPosition.y + 'px';
//         textarea.style.left = areaPosition.x + 'px';
//         textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
//         textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
//         textarea.style.fontSize = textNode.fontSize() + 'px';
//         textarea.style.border = 'none';
//         textarea.style.padding = '0px';
//         textarea.style.margin = '0px';
//         textarea.style.overflow = 'hidden';
//         textarea.style.background = 'none';
//         textarea.style.outline = 'none';
//         textarea.style.resize = 'none';
//         textarea.style.lineHeight = textNode.lineHeight();
//         textarea.style.fontFamily = textNode.fontFamily();
//         textarea.style.transformOrigin = 'left top';
//         textarea.style.textAlign = textNode.align();
//         textarea.style.color = textNode.fill();
//         var rotation = textNode.rotation();
//         var transform = '';
//         if (rotation) {
//             transform += 'rotateZ(' + rotation + 'deg)';
//         }

//         var px = 0;
//         // also we need to slightly move textarea on firefox
//         // because it jumps a bit
//         var isFirefox =
//             navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
//         if (isFirefox) {
//             px += 2 + Math.round(textNode.fontSize() / 20);
//         }
//         transform += 'translateY(-' + px + 'px)';

//         textarea.style.transform = transform;

//         // reset height
//         textarea.style.height = 'auto';
//         // after browsers resized it we can set actual value
//         textarea.style.height = textarea.scrollHeight + 3 + 'px';

//         textarea.focus();

//         function removeTextarea() {
//             textarea.parentNode.removeChild(textarea);
//             window.removeEventListener('click', handleOutsideClick);
//             textNode.show();
//             tr.show();
//             tr.forceUpdate();
//         }

//         function setTextareaWidth(newWidth) {
//             if (!newWidth) {
//                 // set width for placeholder
//                 newWidth = textNode.placeholder.length * textNode.fontSize();
//             }
//             // some extra fixes on different browsers
//             var isSafari = /^((?!chrome|android).)*safari/i.test(
//                 navigator.userAgent
//             );
//             var isFirefox =
//                 navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
//             if (isSafari || isFirefox) {
//                 newWidth = Math.ceil(newWidth);
//             }

//             var isEdge =
//                 document.documentMode || /Edge/.test(navigator.userAgent);
//             if (isEdge) {
//                 newWidth += 1;
//             }
//             textarea.style.width = newWidth + 'px';
//         }

//         textarea.addEventListener('keydown', function(e) {
//             // hide on enter
//             // but don't hide on shift + enter
//             if (e.keyCode === 13 && !e.shiftKey) {
//                 textNode.text(textarea.value);
//                 removeTextarea();
//                 tr.remove()
//                 if (group != null) {

//                     group.name(textNode.text())
//                         // console.log("2 =====> ", group.getAttrs())

//                     // console.log("ID ------> ", group.getId())
//                     // console.log("Position ------> ", group.getAbsolutePosition())
//                     // console.log("Value --------> ", group.name())
//                     var obj = {}
//                     obj.id = group.getId()
//                     obj.position = group.getAbsolutePosition()
//                     obj.value = group.name()
//                     obj.msg = {
//                         message: '',
//                         actions: ''
//                     }
//                     obj.actions = []
//                     obj.counter_arrow = 0


//                     rect_list.push(obj)
//                 }

//             }
//             // on esc do not set value back to node
//             if (e.keyCode === 27) {
//                 removeTextarea();
//             }
//             if (e.keyCode == 46) {
//                 removeTextarea();
//                 textNode.remove()
//                 tr.remove()
//             }
//         });


//         textarea.addEventListener('keydown', function(e) {
//             var scale = textNode.getAbsoluteScale().x;
//             setTextareaWidth(textNode.width() * scale);
//             textarea.style.height = 'auto';
//             textarea.style.height =
//                 textarea.scrollHeight + textNode.fontSize() + 'px';
//         });



//         function handleOutsideClick(e) {
//             if (e.target !== textarea) {
//                 textNode.text(textarea.value);
//                 removeTextarea();
//                 tr.remove()
//             }
//         }
//         setTimeout(() => {
//             window.addEventListener('click', handleOutsideClick);
//         });
//     });

//     stage.add(layer);
//     stage.on('click', (e) => {
//             if (e.target.parent == null) {
//                 tr.remove()
//             }
//         })
//         // menuBar(stage, textNode, tr)
// }


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
        console.log("====> ")
        if (modal_id)
            $('#' + modal_id).modal('toggle')
        data_input = $input.val()
            // console.log("====> ", jqTagify)

        // obj_partner.define = define_name.value.split(" ")
        // obj_partner.params = params_name.value.split(" ")
        // send_list.push(obj_partner)
        // text_note.text("definitions: " + obj_partner.define + "\n" + "parameters: " + obj_partner.params)


        // note_group.absolutePosition({
        //     x: group.getX() - 150,
        //     y: group.getY() + 60
        // })
        // layer.add(note_group)
        // send_form.style.display = "none"
        // console.log("send_list ==> ", data_input)
    })



    // console.log("send_list ==> ", data_input)
    $('#' + btn_id).on('click', jqTagify.removeAllTags.bind(jqTagify))

}



// init_partner_form.style.top =
//     containerRect.top + stage.getPointerPosition().y + 10 + 'px';
// init_partner_form.style.left =
//     containerRect.left + stage.getPointerPosition().x + 20 + 'px';

// var mymodal = $('#initial');
// mymodal.modal('show');
// var id_btn = document.getElementById('btn_init')
// var frm = document.getElementById('init-form')
// var get_name_value = $('input[name=name]')
// id_btn.addEventListener('click', (e) => {
//     create_rect(pos.x, pos.y, layer, stage, get_name_value.val());
//     $('#initial').modal('toggle')
//         // get_name_value.val('')
//     frm.reset()
//         // console.log("1 => ", get_name_value.val(''))
//         // get_name_value = ''
//         // console.log("2 => ", get_name_value)
// })

// call_create_rect(pos)





















var count = 0
var partner_counter = 0
var rect_list = []
var get_last_position_arrow = 100
var i = 0

var ct = 0

var send_list = []
var init_list = []



function NotEmpty(obj) {
    return Object.keys(obj).length !== 0;
}

// function draw_arrow(){

// }

// Rectangle And Line
// class RectNode {

function getFormId() {
    var btn_param = document.getElementById('submit_btn')
    return btn_param
}
// class RectNode {
function create_rect(x, y, layer, stage) {

    var rec = new Konva.Rect({
        width: 98,
        height: 50,
        fill: '#ffff',
        stroke: '#7a797f',
        strokeWidth: 2,
        shadowOpacity: 0.4,
        shadowBlur: 2,
        shadowColor: 'black',
        shadowOffset: {
            x: 1,
            y: 1
        },
        cornerRadius: [5, 5, 5, 5],
        id: "rect" + count,
    });

    var line = new Konva.Line({
        points: [50, 50, 50, 220, 50, 460],
        stroke: 'black',
        strokeWidth: 3,
        lineJoin: 'round',
        dash: [33, 10],
        draggable: false,
    });

    var node = new Konva.Rect({
        width: 7,
        height: 7,
        fill: null,
        stroke: 'blue',
        strokeWidth: 2,
    });

    var labelName =
        new Konva.Text({
            fontFamily: 'Calibri',
            fontSize: 18,
            padding: 5,
            fill: 'black',
            align: 'center',

        })

    var measure_text = labelName.measureSize(labelName.text())
    line.on('mouseover', (e) => {
        node.absolutePosition({
            x: e.evt.layerX - 3,
            y: e.evt.layerY
        })

        layer.add(node)

    })
    line.on('mouseleave', (e) => {
        node.destroy()
    })

    var group = new Konva.Group({
        name: "partner" + partner_counter,
        x: x,
        y: y,
        rotation: 0,
        id: "rect" + count,
    });

    group.add(line, rec, labelName)
    labelName.absolutePosition({
        x: x + 40 - (measure_text.width / 2),
        y: y + 20 - (measure_text.height / 2),

    })
    rec.on('mouseover', () => {
        stage.container().style.cursor = 'pointer';
    })
    rec.on('mouseleave', () => {
        stage.container().style.cursor = 'default';
    })

    var resize_gr = new Konva.Transformer({
        // nodes: [group],
        ignoreStroke: true,
        borderDash: [3, 3],
        centeredScaling: true,
        rotationSnaps: [0, 90, 180, 270],
        padding: 5,
    });
    resize_gr.on('transform', (e) => {
        resize_gr.setAttrs({
            width: Math.max(group.width() * group.scaleX(), 5),
            height: Math.max(group.height() * group.scaleY(), 5),
            scaleX: 1,
            scaleY: 1,
        })
    })
    var grp_array = new Konva.Group({
        rotation: 0,
    });

    layer.add(group)
    rect_list.push(group)
    var get_from_pos
    var get_to_pos
    var points_diff
    var arr_dif
    var simpleLabel
    var b = document.getElementById('test')



    var currentGroupName;
    stage.on('click', (e) => {
        // console.log(e)
        if (e.target === stage)
            return;
        currentGroupName = group.name()
        layer.add(resize_gr)
        resize_gr.attachTo(e.target)
        group.draggable(true)
        var container = stage.container();
        // make it focusable
        container.tabIndex = 1;
        // focus it
        // also stage will be in focus on its click
        container.focus();
        container.addEventListener('keydown', function(e) {
            if (e.keyCode === 27) {
                resize_gr.detach()
                btn_draw_shape.style.display = 'none';
            } else if (e.keyCode === 46) {
                console.log(group.getAbsoluteTransform())
            } else {
                return;
            }
            layer.batchDraw();
        });

        init_partner(group)


    })

    b.addEventListener('click', (e) => {
        console.log(currentGroupName)
    })

    group.on('dragmove', (e) => {
        rect_list.filter((f) => {
            if (f.value == group.name()) {
                f.position.x = group.getX()
                f.position.y = group.getY()
                console.log(f.position)
            }
        })

        arr_dif.setPoints([get_from_pos.position.x + 51, get_from_pos.position.y + get_last_position_arrow - 70, get_to_pos.position.x + 51, get_from_pos.position.y + get_last_position_arrow - 70]);
        simpleLabel.position({
            x: points_diff,
            y: get_from_pos.position.y + get_last_position_arrow - 85,

        });
        layer.draw();
    })


    group.on("contextmenu", (e) => {
        e.evt.preventDefault()

        var _ul = document.createElement('ul')
        _ul.className = "dropdown-menu"
        _ul.id = "menu"
        _ul.style.display = "none"
        _ul.style.position = "absolute"
        document.body.appendChild(_ul)

        var li_copy = document.createElement('li')
        var a_copy = document.createElement('a')
        a_copy.id = "btn_copy"
        a_copy.className = "dropdown-item"
        a_copy.innerText = "Copy"
        a_copy.href = "#"
        li_copy.appendChild(a_copy)

        var li_cut = document.createElement('li')
        var a_cut = document.createElement('a')
        a_cut.id = "btn_cut"
        a_cut.className = "dropdown-item"
        a_cut.innerText = "Cut"
        a_cut.href = "#"
        li_cut.appendChild(a_cut)

        var li_paste = document.createElement('li')
        var a_paste = document.createElement('a')
        a_paste.id = "btn_paste"
        a_paste.className = "dropdown-item"
        a_paste.innerText = "Paste"
        a_paste.href = "#"
        li_paste.appendChild(a_paste)

        var li_delete = document.createElement('li')
        var a_delete = document.createElement('a')
        a_delete.id = "btn_delete"
        a_delete.className = "dropdown-item"
        a_delete.innerText = "Delete"
        a_delete.href = "#"
        li_delete.appendChild(a_delete)

        _ul.appendChild(li_copy)
        _ul.appendChild(li_cut)
        _ul.appendChild(li_paste)
        _ul.appendChild(li_delete)


        li_delete.addEventListener('click', () => {
            group.destroy()
            resize_gr.destroy()
            arr_dif.destroy()
            grp_array.destroy()
            btn_draw_shape.style.display = 'none';
            // remove shape of rect_list
            rect_list.filter((fil) => {
                if (fil.id === e.target.attrs.id) {
                    const index = rect_list.indexOf(fil)
                    rect_list.splice(index, 1)
                }

            })

        })

        if (e.target === stage) {
            return;
        } else {
            _ul.style.display = 'initial';
            var containerRect = stage.container().getBoundingClientRect();
            _ul.style.top =
                containerRect.top + stage.getPointerPosition().y + 4 + 'px';
            _ul.style.left =
                containerRect.left + stage.getPointerPosition().x + 4 + 'px';
        }



        window.addEventListener('click', () => {
            _ul.style.display = 'none'
        })

    })

    group.on('dblclick', (ev) => {
        group.getChildren((node) => {
            if (node.getClassName() === 'Text') {
                // get name of shape
                swal("Please Enter Name", {
                    content: {
                        element: "input",
                        attributes: {
                            placeholder: "Name",
                            type: "text",
                        },
                    },
                    buttons: {
                        cancel: true,
                        confirm: true,
                    },
                }).then(value => {
                    node.text(value)
                })
            }
        })
    })


    stage.add(layer)
    stage.on('click', (e) => {
        if (e.target == stage) {
            resize_gr.remove()
            group.draggable(false)
            btn_draw_shape.style.display = 'none'
                // send_form.style.display = 'none'

        }
    })

    // create_note(group)


    var input_reciver = $('input[name=reciver]').tagify({
            whitelist: ["h(a,b)", "m(c,d)"]
        })
        .on('add', function(e, tagName) {
            console.log('JQEURY EVENT: ', 'added', tagName)
        })
        .on("invalid", function(e, tagName) {
            console.log('JQEURY EVENT: ', "invalid", e, ' ', tagName);
        });
    var jqTagify = input_reciver.data('tagify');
    var input_def = $('input[name=define]').tagify({
            whitelist: ["h(a,b)", "m(c,d)"]
        })
        .on('add', function(e, tagName) {
            console.log('JQEURY EVENT: ', 'added', tagName)
        })
        .on("invalid", function(e, tagName) {
            console.log('JQEURY EVENT: ', "invalid", e, ' ', tagName);
        });
    var jqTagify_1 = input_def.data('tagify');
    var input_params = $('input[name=parametrs]').tagify({
            whitelist: ["h(a,b)", "m(c,d)"]
        })
        .on('add', function(e, tagName) {
            console.log('JQEURY EVENT: ', 'added', tagName)
        })
        .on("invalid", function(e, tagName) {
            console.log('JQEURY EVENT: ', "invalid", e, ' ', tagName);
        });
    var jqTagify_2 = input_params.data('tagify');


    var btn_param = getFormId()

    btn_param.addEventListener('click', (e) => {
        var obj_partner = {}
        if (NotEmpty(obj_partner))
            obj_partner = {}

        console.log("send_list ==> ", send_list)


        // obj_partner.partnerName = group.name()

        obj_partner.reciver = jQuery.parseJSON(input_reciver.val())
        obj_partner.reciver = obj_partner.reciver.map(function(elem) {
            return elem.value;
        }).join(",")
        obj_partner.define = jQuery.parseJSON(input_def.val())
        obj_partner.define = obj_partner.define.map(function(elem) {
            return elem.value;
        }).join(",")
        obj_partner.params = jQuery.parseJSON(input_params.val())
        obj_partner.params = obj_partner.params.map(function(elem) {
            return elem.value;
        }).join(",")

        obj_partner.partnerName = group.name()

        send_list.push(obj_partner)
        console.log(send_list)

        create_note(group, obj_partner)


        // console.log("x Line => ", line.points()[1])
        // console.log("y Line => ", line.points())

        $('#staticBackdrop').modal('toggle')


    })
    $('#submit_btn').on('click', jqTagify.removeAllTags.bind(jqTagify))
    $('#submit_btn').on('click', jqTagify_1.removeAllTags.bind(jqTagify_1))
    $('#submit_btn').on('click', jqTagify_2.removeAllTags.bind(jqTagify_2))
}
// }


//------------------------------------btn draw arrow -----------------------------------
var btn_draw_shape = document.createElement('button')
document.body.appendChild(btn_draw_shape);
btn_draw_shape.style.display = 'none';
btn_draw_shape.style.position = 'absolute'
btn_draw_shape.style.borderRadius = '50%';
btn_draw_shape.className = "btn btn-primary btn-circle"
btn_draw_shape.setAttribute("data-bs-toggle", "modal")
btn_draw_shape.setAttribute("data-bs-target", "#staticBackdrop")

var icon_btn = document.createElement('i')
icon_btn.className = "bi bi-arrow-right text-light"

btn_draw_shape.append(icon_btn)

// class Note {


//---------------------------------send form------------------------------------------------
function init_partner(group) {
    var send_form = document.createElement('form')
    send_form.id = 'send_form'
    document.body.appendChild(send_form)
    send_form.style.width = '460px'
    send_form.style.height = '310px'
    send_form.style.display = 'none';
    send_form.style.position = 'absolute'
    send_form.style.backgroundColor = '#ffff';
    send_form.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 10px 50px'

    //----------------------------------reciver-----------------------------------------------

    var reciver_div = document.createElement('div')
    reciver_div.classList = "input-group p-2"

    var span_reciver = document.createElement('span')
    span_reciver.className = "input-group-text"
    span_reciver.textContent = "Reciver"

    var reciver_name = document.createElement('input');
    reciver_name.id = "reciver_name"
    reciver_name.className = "form-control tagin"
    reciver_name.setAttribute("placeholder", "reciver");
    reciver_name.setAttribute("data-separator", " ")
    reciver_name.setAttribute("data-enter", "true")

    reciver_div.appendChild(span_reciver)
    reciver_div.appendChild(reciver_name)

    //------------------------------define-------------------------------------------------


    var define_div = document.createElement('div')
    define_div.classList = "input-group p-2"

    var span_define = document.createElement('span')
    span_define.className = "input-group-text"
    span_define.textContent = "Define"

    var define_name = document.createElement('input');
    define_name.id = "define_name"
    define_name.className = "form-control tagin"
    define_name.setAttribute("placeholder", "define");
    define_name.setAttribute("data-separator", " ")
    define_name.setAttribute("data-enter", "true")

    define_div.appendChild(span_define)
    define_div.appendChild(define_name)


    //------------------------------params-------------------------------------------------


    var params_div = document.createElement('div')
    params_div.classList = "input-group p-2"

    var span_params = document.createElement('span')
    span_params.className = "input-group-text"
    span_params.textContent = "Parametrs"

    var params_name = document.createElement('input');
    params_name.id = "params_name"
    params_name.className = "form-control tagin"
    params_name.setAttribute("placeholder", "parametrs");
    params_name.setAttribute("data-separator", " ")
    params_name.setAttribute("data-enter", "true")

    params_div.appendChild(span_params)
    params_div.appendChild(params_name)


    //------------------------------btn submit-------------------------------------------------
    var btn_div = document.createElement('div')
    btn_div.className = "m-2 p-2 d-grid gap-2"

    var btn_submit = document.createElement('button')
    btn_submit.innerHTML = 'submit'
    btn_submit.style.boxShadow = "0 2px 5px 0 rgba(0, 0, 0, .2), 0 2px 10px 0 rgba(0, 0, 0, .1)"
    btn_submit.className = 'btn btn-primary'

    btn_div.appendChild(btn_submit)

    send_form.appendChild(reciver_div)
    send_form.appendChild(define_div)
    send_form.appendChild(params_div)
    send_form.appendChild(btn_div)

    btn_draw_shape.style.display = 'initial';
    btn_draw_shape.style.top =
        group.getAbsolutePosition().y + 80 + 'px';
    btn_draw_shape.style.left =
        group.getAbsolutePosition().x + 360 + 'px';
    btn_draw_shape.addEventListener('click', () => {
        btn_draw_shape.style.display = 'none';
        // send_form.style.display = 'initial';
        // var containerRect = stage.container().getBoundingClientRect();
        // send_form.style.top =
        //     containerRect.top + stage.getPointerPosition().y + 10 + 'px';
        // send_form.style.left =
        //     containerRect.left + stage.getPointerPosition().x + 20 + 'px';

    })



    btn_submit.addEventListener('click', (e) => {
        var val_from = from_node.value
        var val_to = to_node.value
        var val_msg = message_node.value

        if (val_from == '' || val_to == '' || val_msg == '') {
            console.log("Please Enter name")
            from_node.style.border = '1px solid #d91e1e'
            to_node.style.border = '1px solid #d91e1e'
            message_node.style.border = '1px solid #d91e1e'
                // btn_submit.className = 'btn btn-primary disabled'
        } else {
            send_form.style.display = 'none';
            // btn_submit.classList.remove = 'disabled'
            var list_shape_arrow = []
            for (var i = 0; i < rect_list.length; i++) {
                if (rect_list[i].value == val_from) {
                    get_from_pos = rect_list[i]
                    list_shape_arrow.push(get_from_pos)
                        // console.log("1 ==> ", get_from_pos)

                }
                if (rect_list[i].value == val_to) {
                    get_to_pos = rect_list[i]
                    list_shape_arrow.push(get_to_pos)
                        // console.log("2 ==> ", get_to_pos)
                }

            }




            if (get_from_pos.value !== get_to_pos.value) {
                arr_dif = new Konva.Arrow({
                    fill: 'black',
                    stroke: 'black',
                });
                arr_dif.points([get_from_pos.position.x + 51, get_from_pos.position.y + get_last_position_arrow, get_to_pos.position.x + 51, get_from_pos.position.y + get_last_position_arrow])

                points_diff = Math.abs((get_to_pos.position.x - get_from_pos.position.x))

                simpleLabel = new Konva.Label({
                    opacity: 0.75,
                    draggable: true
                });

                simpleLabel.position({
                    x: points_diff,
                    y: get_from_pos.position.y + get_last_position_arrow - 15,

                });

                simpleLabel.add(
                    new Konva.Tag({
                        fill: 'yellow',
                    })
                );
                simpleLabel.add(
                    new Konva.Text({
                        x: points_diff,
                        y: get_from_pos.position.y + get_last_position_arrow - 15,
                        text: val_msg,
                        fontFamily: 'Calibri',
                        fontSize: 18,
                        padding: 5,
                        fill: 'black',
                    })
                );
                // layer.add(simpleLabel)
                console.log(arr_dif.absolutePosition())
                grp_array.add(arr_dif, simpleLabel)
                layer.add(grp_array)
                layer.draw();

                // this.text_label(stage, layer, points_diff, get_from_pos.position.y + get_last_position_arrow - 15, val_msg, grp_array)
                get_last_position_arrow += 70
            } else {

                simpleLabel = new Konva.Label({
                    opacity: 0.75,
                    draggable: true
                });

                arr_dif = new Konva.Arrow({
                    fill: 'black',
                    stroke: 'black',
                });
                arr_dif.points([get_from_pos.position.x + 50, get_from_pos.position.y + get_last_position_arrow, get_from_pos.position.x + 110, get_from_pos.position.y + get_last_position_arrow, get_from_pos.position.x + 110, get_from_pos.position.y + get_last_position_arrow + 30, get_from_pos.position.x + 50, get_from_pos.position.y + get_last_position_arrow + 30])
                simpleLabel.add(
                    new Konva.Text({
                        x: points_diff,
                        y: get_from_pos.position.y + get_last_position_arrow - 15,
                        text: val_msg,
                        fontFamily: 'Calibri',
                        fontSize: 18,
                        padding: 5,
                        fill: 'black',
                    })
                );
                console.log(arr_dif.points()[2])
                    // this.text_label(stage, layer, points_diff, get_from_pos.position.y + get_last_position_arrow - 15, val_msg, grp_array)
                grp_array.add(arr_dif, simpleLabel)
                layer.add(grp_array)
                layer.draw();
                get_last_position_arrow += 70


            }

            // layer.add(arr_dif);

            get_from_pos.counter_arrow++;
            get_from_pos.msg.message = val_msg
            get_from_pos.msg.actions = get_from_pos.value + "->" + get_to_pos.value
                // get_to_pos.actions.push(get_to_pos.value + "<-" + get_from_pos.value)

            from_node.value = ''
            to_node.value = ''
            message_node.value = ''
            list_shape_arrow = []

            // layer.on('dragmove', (e) => {
            //     // t = stage.find('Transformer');
            //     console.log("-=-=-=-", e.target.children[2]._partialText)
            //         // console.log("-=-=-=-", t)
            // })

            console.log(rect_list)



        }
    })


}
var data_input = ''



function create_note(group, obj_partner) {

    let note_group = new Konva.Group({
        // x: containerRect.top + stage.getPointerPosition().y + 10,
        // y: containerRect.left + stage.getPointerPosition().x + 20,
        width: 130,
        height: 25,
        // rotation: angle,
        draggable: true,
    });

    note_group.add(new Konva.Rect({
        width: 150,
        height: 150,
        fill: '#fdfd80',
        shadowOpacity: 0.4,
        shadowBlur: 2,
        cornerRadius: [0, 0, 10, 0],
        shadowColor: 'black',
        shadowOffset: {
            x: 1,
            y: 1
        },
        strokeWidth: 4,
    }));

    console.log("send_list ==> ", send_list)

    let text_note = new Konva.Text({
        text: "definitions: " + obj_partner.define + "\n" + "parameters: " + obj_partner.params,
        fontSize: 18,
        fontStyle: "italic",
        fontFamily: 'Calibri',
        fill: '#000',
        width: 130,
        padding: 5,
        align: 'center'
    })
    note_group.add(text_note);
    // text_note.text("definitions: " + define + "\n" + "parameters: " + params)


    note_group.absolutePosition({
        x: group.getX() - 150,
        y: group.getY() + 60
    })
    layer.add(note_group)

}

//---------------------------------Arrow-----------------------------------------------------//

function draw_arrow(stage, layer, tex = null) {

    let arrow;
    stage.on('mousedown', () => {
        const pos = stage.getPointerPosition();
        arrow = new Konva.Arrow({
            points: [pos.x, pos.y],
            stroke: 'black',
            fill: 'black',
            id: "arr_id",
            draggable: true,
            dragBoundFunc: function(pos) {
                return {
                    x: this.absolutePosition().x,
                    y: pos.y,
                };
            },
        });
        layer.add(arrow);
        layer.batchDraw();



        arrow.on('mouseover', () => {
            console.log("arrow ==--> ")
            stage.container().style.cursor = 'text';
        })

        arrow.on('dblclick dbltap', (e) => {
            // write_text(stage, layer, e.evt.layerX / 2, e.evt.layerY - 15)
            write_text(stage, layer, e.evt.layerX / 2, e.evt.layerY - 15)

        });

        var resize_arr = new Konva.Transformer({
            nodes: [arrow],
            // ignore stroke in size calculations
            ignoreStroke: true,
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
            // manually adjust size of transformer
            padding: 5,
        });
        resize_arr.on('transform', (e) => {
            resize_arr.setAttrs({
                width: Math.max(arrow.width() * arrow.scaleX(), 5),
                height: Math.max(arrow.height() * arrow.scaleY(), 5),
                scaleX: 1,
                scaleY: 1,

            })
        })
        arrow.on('click', (e) => {
            layer.add(resize_arr)

            // var on_drag = layer.find('#arr_id')[0]
            // on_drag.setAttrs(draggable, true)
            // layer.draw()
        })
        stage.on('click', (e) => {
            if (e.target.parent == null) {
                resize_arr.remove()
            }
        })
        menuBar(stage, arrow, resize_arr)
    });



    stage.on('mousemove', () => {
        if (arrow) {
            const pos = stage.getPointerPosition();
            stage.container().style.cursor = 'crosshair';
            const points = [arrow.points()[0], arrow.points()[1], pos.x, pos.y];
            arrow.points(points);
            layer.batchDraw();
        }
    });

    stage.on('mouseup', () => {
        arrow = null
        stage.container().style.cursor = 'default';
        stage.off('mousedown')
    });


    stage.add(layer);
    layer.draw();


}
//-------------------------------------------------------------------------------------------//
function write_text(stage, layer, x = null, y = null, text = null, group = null) {

    var textNode = new Konva.Text({
        // text: 'name',
        // x: 0,
        y: 17,
        fontSize: 14,
        draggable: true,
        width: 100,
        align: 'center'
    });

    if (x != null && y != null) {

        textNode.absolutePosition({
            x: x,
            y: y
        })
    }

    if (text == null) {
        textNode.text("message")
    } else {
        textNode.text(text)
    }


    layer.add(textNode);
    // group.add(textNode)

    var tr = new Konva.Transformer({

        enabledAnchors: ['middle-left', 'middle-right'],
        borderDash: [3, 3],
        centeredScaling: true,
        rotationSnaps: [0, 90, 180, 270],
        // set minimum width of text
        boundBoxFunc: function(oldBox, newBox) {
            newBox.width = Math.max(30, newBox.width);
            return newBox;
        },
    });

    tr.nodes([textNode]);
    if (group != null) {
        group.add(textNode)
            // return textNode
    }
    textNode.on('transform', function() {
        // reset scale, so only with is changing by transformer
        textNode.setAttrs({
            width: textNode.width() * textNode.scaleX(),
            scaleX: 1,
        });
    });
    textNode.on('click', () => {
        layer.add(tr);
    })



    textNode.on('dblclick dbltap', (e) => {
        // hide text node and transformer:
        textNode.hide();
        tr.hide();

        // at first lets find position of text node relative to the stage:
        // var textPosition = textNode.getAbsolutePosition();
        // var gr = group.getAbsolutePosition()
        var areaPosition = {
            x: e.evt.x - 41,
            y: e.evt.y - 8

        };


        var textarea = document.createElement('textarea');
        document.body.appendChild(textarea);

        // apply many styles to match text on canvas as close as possible
        // remember that text rendering on canvas and on the textarea can be different
        // and sometimes it is hard to make it 100% the same. But we will try...
        textarea.value = textNode.text();
        textarea.style.position = 'absolute';
        textarea.style.top = areaPosition.y + 'px';
        textarea.style.left = areaPosition.x + 'px';
        textarea.style.width = textNode.width() - textNode.padding() * 2 + 'px';
        textarea.style.height = textNode.height() - textNode.padding() * 2 + 5 + 'px';
        textarea.style.fontSize = textNode.fontSize() + 'px';
        textarea.style.border = 'none';
        textarea.style.padding = '0px';
        textarea.style.margin = '0px';
        textarea.style.overflow = 'hidden';
        textarea.style.background = 'none';
        textarea.style.outline = 'none';
        textarea.style.resize = 'none';
        textarea.style.lineHeight = textNode.lineHeight();
        textarea.style.fontFamily = textNode.fontFamily();
        textarea.style.transformOrigin = 'left top';
        textarea.style.textAlign = textNode.align();
        textarea.style.color = textNode.fill();
        rotation = textNode.rotation();
        var transform = '';
        if (rotation) {
            transform += 'rotateZ(' + rotation + 'deg)';
        }

        var px = 0;
        // also we need to slightly move textarea on firefox
        // because it jumps a bit
        var isFirefox =
            navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
        if (isFirefox) {
            px += 2 + Math.round(textNode.fontSize() / 20);
        }
        transform += 'translateY(-' + px + 'px)';

        textarea.style.transform = transform;

        // reset height
        textarea.style.height = 'auto';
        // after browsers resized it we can set actual value
        textarea.style.height = textarea.scrollHeight + 3 + 'px';

        textarea.focus();

        function removeTextarea() {
            textarea.parentNode.removeChild(textarea);
            window.removeEventListener('click', handleOutsideClick);
            textNode.show();
            tr.show();
            tr.forceUpdate();
        }

        function setTextareaWidth(newWidth) {
            if (!newWidth) {
                // set width for placeholder
                newWidth = textNode.placeholder.length * textNode.fontSize();
            }
            // some extra fixes on different browsers
            var isSafari = /^((?!chrome|android).)*safari/i.test(
                navigator.userAgent
            );
            var isFirefox =
                navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
            if (isSafari || isFirefox) {
                newWidth = Math.ceil(newWidth);
            }

            var isEdge =
                document.documentMode || /Edge/.test(navigator.userAgent);
            if (isEdge) {
                newWidth += 1;
            }
            textarea.style.width = newWidth + 'px';
        }

        textarea.addEventListener('keydown', function(e) {
            // hide on enter
            // but don't hide on shift + enter
            if (e.keyCode === 13 && !e.shiftKey) {
                textNode.text(textarea.value);
                removeTextarea();
                tr.remove()
                    // if (group != null) {

                //     group.name(textNode.text())
                //     console.log("2 =====> ", group.getAttrs())

                //     // console.log("ID ------> ", group.getId())
                //     // console.log("Position ------> ", group.getAbsolutePosition())
                //     // console.log("Value --------> ", group.name())
                //     var obj = {}
                //     obj.id = group.getId()
                //     obj.position = group.getAbsolutePosition()
                //     obj.value = group.name()
                //     obj.msg = {
                //         message: '',
                //         actions: ''
                //     }
                //     obj.actions = []
                //     obj.counter_arrow = 0


                //     rect_list.push(obj)
                // }

            }
            // on esc do not set value back to node
            if (e.keyCode === 27) {
                removeTextarea();
            }
            if (e.keyCode == 46) {
                removeTextarea();
                textNode.remove()
                tr.remove()
            }
        });


        textarea.addEventListener('keydown', function(e) {
            scale = textNode.getAbsoluteScale().x;
            setTextareaWidth(textNode.width() * scale);
            textarea.style.height = 'auto';
            textarea.style.height =
                textarea.scrollHeight + textNode.fontSize() + 'px';
        });



        function handleOutsideClick(e) {
            if (e.target !== textarea) {
                textNode.text(textarea.value);
                removeTextarea();
                tr.remove()
            }
        }
        setTimeout(() => {
            window.addEventListener('click', handleOutsideClick);
        });
    });

    stage.add(layer);
    stage.on('click', (e) => {
        if (e.target.parent == null) {
            tr.remove()
        }
    })
    menuBar(stage, textNode, tr)
}
//-------------------------------------------------------------------------------------------//
function self_arrow(stage, layer) {
    var arrow = new Konva.Arrow({
        x: stage.width() / 4,
        y: stage.height() / 4,
        points: [10, 40, 65, 40, 65, 90, 10, 90],
        pointerLength: 10,
        pointerWidth: 10,
        fill: 'black',
        stroke: 'black',
        strokeWidth: 2,
        draggable: true
    });
    layer.add(arrow)
    stage.add(layer)

    var resize_arr = new Konva.Transformer({
        nodes: [arrow],
        // ignore stroke in size calculations
        ignoreStroke: true,
        borderDash: [3, 3],
        centeredScaling: true,
        rotationSnaps: [0, 90, 180, 270],
        // manually adjust size of transformer
        padding: 5,
    });
    resize_arr.on('transform', (e) => {
        resize_arr.setAttrs({
            width: Math.max(arrow.width() * arrow.scaleX(), 5),
            height: Math.max(arrow.height() * arrow.scaleY(), 5),
            scaleX: 1,
            scaleY: 1,

        })
    })
    arrow.on('click', (e) => {
        layer.add(resize_arr)

    })
    stage.on('click', (e) => {
        if (e.target.parent == null) {
            resize_arr.remove()
        }
    })
    menuBar(stage, arrow, resize_arr)
}
//-------------------------------------------------------------------------------------------//
function free_drawing(stage, layer, mode = null, state) {
    if (state == true) {
        return
    } else {
        var isPaint = false;
        // var mode = 'brush';
        var lastLine;

        stage.on('mousedown touchstart', function(e) {
            isPaint = true;
            var pos = stage.getPointerPosition();
            lastLine = new Konva.Line({
                stroke: '#7a797f',
                strokeWidth: mode === 'brush' ? 2 : 5,
                globalCompositeOperation: mode === 'brush' ? 'source-over' : 'destination-out',
                // round cap for smoother lines
                lineCap: 'round',
                // add point twice, so we have some drawings even on a simple click
                points: [pos.x, pos.y, pos.x, pos.y],
            });

            layer.add(lastLine);
        });

        stage.on('mouseup touchend', function() {
            isPaint = false;
            // if (mode === 'brush') {
            //     $('body').awesomeCursor('pencil');
            // } else if (mode === '') {
            //     $('body').awesomeCursor('eraser');
            // }
        });

        // and core function - drawing
        stage.on('mousemove touchmove', function(e) {
            if (!isPaint) {
                return;
            }

            // prevent scrolling on touch devices
            e.evt.preventDefault();

            const pos = stage.getPointerPosition();
            var newPoints = lastLine.points().concat([pos.x, pos.y]);
            lastLine.points(newPoints);
        });

    }
}
//-------------------------------------------------------------------------------------------//

// Get the current frame's height and width:
var width = document.getElementById('container').offsetWidth;
var height = document.getElementById('container').offsetHeight;
var GUIDELINE_OFFSET = 5;

var stage = new Konva.Stage({
    container: "container",
    width: width,
    height: height
});
var layer = new Konva.Layer();
var i = 1;
var j = 1;
var x = 50
var y = 10;
var tex = 200;

stage.add(layer)

var json = stage.toJSON();
//----------------------- snap shapes ----------------------

function getLineGuideStops(skipShape) {
    // we can snap to stage borders and the center of the stage
    var vertical = [0, stage.width() / 2, stage.width()];
    var horizontal = [0, stage.height() / 2, stage.height()];

    // and we snap over edges and center of each object on the canvas
    stage.find('.object').forEach((guideItem) => {
        if (guideItem === skipShape) {
            return;
        }
        var box = guideItem.getClientRect();
        // and we can snap to all edges of shapes
        vertical.push([box.x, box.x + box.width, box.x + box.width / 2]);
        horizontal.push([box.y, box.y + box.height, box.y + box.height / 2]);
    });
    return {
        vertical: vertical.flat(),
        horizontal: horizontal.flat(),
    };
}

function getObjectSnappingEdges(node) {
    var box = node.getClientRect();
    var absPos = node.absolutePosition();

    return {
        vertical: [{
                guide: Math.round(box.x),
                offset: Math.round(absPos.x - box.x),
                snap: 'start',
            },
            {
                guide: Math.round(box.x + box.width / 2),
                offset: Math.round(absPos.x - box.x - box.width / 2),
                snap: 'center',
            },
            {
                guide: Math.round(box.x + box.width),
                offset: Math.round(absPos.x - box.x - box.width),
                snap: 'end',
            },
        ],
        horizontal: [{
                guide: Math.round(box.y),
                offset: Math.round(absPos.y - box.y),
                snap: 'start',
            },
            {
                guide: Math.round(box.y + box.height / 2),
                offset: Math.round(absPos.y - box.y - box.height / 2),
                snap: 'center',
            },
            {
                guide: Math.round(box.y + box.height),
                offset: Math.round(absPos.y - box.y - box.height),
                snap: 'end',
            },
        ],
    };
}

function getGuides(lineGuideStops, itemBounds) {
    var resultV = [];
    var resultH = [];

    lineGuideStops.vertical.forEach((lineGuide) => {
        itemBounds.vertical.forEach((itemBound) => {
            var diff = Math.abs(lineGuide - itemBound.guide);
            // if the distance between guild line and object snap point is close we can consider this for snapping
            if (diff < GUIDELINE_OFFSET) {
                resultV.push({
                    lineGuide: lineGuide,
                    diff: diff,
                    snap: itemBound.snap,
                    offset: itemBound.offset,
                });
            }
        });
    });

    lineGuideStops.horizontal.forEach((lineGuide) => {
        itemBounds.horizontal.forEach((itemBound) => {
            var diff = Math.abs(lineGuide - itemBound.guide);
            if (diff < GUIDELINE_OFFSET) {
                resultH.push({
                    lineGuide: lineGuide,
                    diff: diff,
                    snap: itemBound.snap,
                    offset: itemBound.offset,
                });
            }
        });
    });

    var guides = [];

    // find closest snap
    var minV = resultV.sort((a, b) => a.diff - b.diff)[0];
    var minH = resultH.sort((a, b) => a.diff - b.diff)[0];
    if (minV) {
        guides.push({
            lineGuide: minV.lineGuide,
            offset: minV.offset,
            orientation: 'V',
            snap: minV.snap,
        });
    }
    if (minH) {
        guides.push({
            lineGuide: minH.lineGuide,
            offset: minH.offset,
            orientation: 'H',
            snap: minH.snap,
        });
    }
    return guides;
}

function drawGuides(guides) {
    guides.forEach((lg) => {
        if (lg.orientation === 'H') {
            var line = new Konva.Line({
                points: [-6000, 0, 6000, 0],
                stroke: 'rgb(0, 161, 255)',
                strokeWidth: 1,
                name: 'guid-line',
                dash: [4, 6],
            });
            layer.add(line);
            line.absolutePosition({
                x: 0,
                y: lg.lineGuide,
            });
        } else if (lg.orientation === 'V') {
            var line = new Konva.Line({
                points: [0, -6000, 0, 6000],
                stroke: 'rgb(0, 161, 255)',
                strokeWidth: 1,
                name: 'guid-line',
                dash: [4, 6],
            });
            layer.add(line);
            line.absolutePosition({
                x: lg.lineGuide,
                y: 0,
            });
        }
    });
}

layer.on('dragmove', function(e) {
    // clear all previous lines on the screen
    layer.find('.guid-line').forEach((l) => l.destroy());

    // find possible snapping lines
    var lineGuideStops = getLineGuideStops(e.target);
    // find snapping points of current object
    var itemBounds = getObjectSnappingEdges(e.target);

    // now find where can we snap current object
    var guides = getGuides(lineGuideStops, itemBounds);

    // do nothing of no snapping
    if (!guides.length) {
        return;
    }

    drawGuides(guides);

    var absPos = e.target.absolutePosition();
    // now force object position
    guides.forEach((lg) => {
        switch (lg.snap) {
            case 'start':
                {
                    switch (lg.orientation) {
                        case 'V':
                            {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                        case 'H':
                            {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                    }
                    break;
                }
            case 'center':
                {
                    switch (lg.orientation) {
                        case 'V':
                            {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                        case 'H':
                            {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                    }
                    break;
                }
            case 'end':
                {
                    switch (lg.orientation) {
                        case 'V':
                            {
                                absPos.x = lg.lineGuide + lg.offset;
                                break;
                            }
                        case 'H':
                            {
                                absPos.y = lg.lineGuide + lg.offset;
                                break;
                            }
                    }
                    break;
                }
        }
    });
    e.target.absolutePosition(absPos);
});

layer.on('dragend', function(e) {
    // clear all previous lines on the screen
    layer.find('.guid-line').forEach((l) => l.destroy());
});

//---------------------------------------------------------
let currentShape;

function menuBar(stage, groupNode, trans = null, btn_tools = null) {



    var _ul = document.createElement('ul')
    _ul.className = "dropdown-menu"
    _ul.id = "menu"
    _ul.style.display = "none"
    _ul.style.position = "absolute"
    document.body.appendChild(_ul)

    var li_copy = document.createElement('li')
    var a_copy = document.createElement('a')
    a_copy.id = "btn_copy"
    a_copy.className = "dropdown-item"
    a_copy.innerText = "Copy"
    a_copy.href = "#"
    li_copy.appendChild(a_copy)

    var li_cut = document.createElement('li')
    var a_cut = document.createElement('a')
    a_cut.id = "btn_cut"
    a_cut.className = "dropdown-item"
    a_cut.innerText = "Cut"
    a_cut.href = "#"
    li_cut.appendChild(a_cut)

    var li_paste = document.createElement('li')
    var a_paste = document.createElement('a')
    a_paste.id = "btn_paste"
    a_paste.className = "dropdown-item"
    a_paste.innerText = "Paste"
    a_paste.href = "#"
    li_paste.appendChild(a_paste)

    var li_delete = document.createElement('li')
    var a_delete = document.createElement('a')
    a_delete.id = "btn_delete"
    a_delete.className = "dropdown-item"
    a_delete.innerText = "Delete"
    a_delete.href = "#"
    li_delete.appendChild(a_delete)

    _ul.appendChild(li_copy)
    _ul.appendChild(li_cut)
    _ul.appendChild(li_paste)
    _ul.appendChild(li_delete)

    const tr = trans.nodes()

    // console.log("gr => ", groupNode)


    li_delete.addEventListener('click', () => {


    })

    var container = stage.container();

    // make it focusable

    container.tabIndex = 1;
    // focus it
    // also stage will be in focus on its click
    container.focus();


    container.addEventListener('keydown', function(e) {
        if (e.keyCode === 27) {
            console.log("27")
        } else if (e.keyCode === 46) {
            tr = layer.find('Transformer').find(tr => tr.nodes()[0] === currentShape);
            // layer.find
            if (tr != null) {
                tr.remove()
                currentShape.destroy()
            }

        } else if (e.keyCode === 39) {
            console.log("39")
        } else if (e.keyCode === 40) {
            console.log("40")
        } else {
            return;
        }
        e.preventDefault();
        layer.batchDraw();
    });

    window.addEventListener('click', () => {
        _ul.style.display = 'none'
    })

    stage.on('contextmenu', (e) => {

        e.evt.preventDefault()
            // var id_rect_selection = layer.children[0].attrs.id
            // console.log(rect_list)
            // console.log(layer.find('Group'))


        if (e.target === stage) {
            return;
        }

        // console.log(stage.find('Transformer'))

        currentShape = e.target;
        // console.log("1 ==>", e.target)

        // shape = e.target
        _ul.style.display = 'initial';
        var containerRect = stage.container().getBoundingClientRect();
        _ul.style.top =
            containerRect.top + stage.getPointerPosition().y + 4 + 'px';
        _ul.style.left =
            containerRect.left + stage.getPointerPosition().x + 4 + 'px';
    })
}

//---------------------------------form------------------------------------------------

var init_partner_form = document.createElement('section')
init_partner_form.id = 'init_partner_form'
document.body.appendChild(init_partner_form)
init_partner_form.style.width = '430px'
init_partner_form.style.height = '310px'
init_partner_form.style.display = 'none';
init_partner_form.style.position = 'absolute'
init_partner_form.style.backgroundColor = '#ffff';
init_partner_form.style.boxShadow = 'rgba(0, 0, 0, 0.1) 0px 10px 50px'

//----------------------------------From-----------------------------------------------

var partner_div = document.createElement('div')
partner_div.classList = "input-group p-2"

var span_name = document.createElement('span')
span_name.className = "input-group-text"
span_name.textContent = "name"

var partner_name = document.createElement('input');
partner_name.id = "partner_name"
partner_name.className = "form-control"
partner_name.setAttribute("placeholder", "Name");
partner_name.name = "name"

partner_div.appendChild(span_name)
partner_div.appendChild(partner_name)

//------------------------------to-------------------------------------------------

var sym_div = document.createElement('div')
sym_div.classList = "input-group p-2"

var span_sym = document.createElement('span')
span_sym.className = "input-group-text"
span_sym.textContent = "Sym"

var sym_input = document.createElement('input');
sym_input.className = "form-control"
sym_input.setAttribute("placeholder", "Add a sym key");
sym_input.name = "sym"

sym_div.appendChild(span_sym)
sym_div.appendChild(sym_input)



var Asym_div = document.createElement('div')
Asym_div.classList = "input-group p-2"

var span_Asym = document.createElement('span')
span_Asym.className = "input-group-text"
span_Asym.textContent = "Asym"

var Asym_input = document.createElement('input');
Asym_input.className = "form-control"
Asym_input.setAttribute("placeholder", "Add a Asym key");
Asym_input.name = "Asym"

Asym_div.appendChild(span_Asym)
Asym_div.appendChild(Asym_input)

//------------------------------msg-------------------------------------------------

var title_keys = document.createElement('div')
title_keys.innerHTML = "Keys"
title_keys.className = "center_element custom_title"

//------------------------------btn submit-------------------------------------------------
var btn_partner_div = document.createElement('div')
btn_partner_div.className = "m-2 p-2 d-grid gap-2"

var btn_sub = document.createElement('button')
btn_sub.innerHTML = 'Submit'
btn_sub.id = "btn_sub"
btn_sub.style.boxShadow = "0 2px 5px 0 rgba(0, 0, 0, .2), 0 2px 10px 0 rgba(0, 0, 0, .1)"
btn_sub.className = 'btn btn-primary'

btn_partner_div.appendChild(btn_sub)

init_partner_form.appendChild(partner_div)
init_partner_form.appendChild(title_keys)
init_partner_form.appendChild(sym_div)
init_partner_form.appendChild(Asym_div)
init_partner_form.appendChild(btn_partner_div)



btn_sub.addEventListener('click', (e) => {
    var obj_kes = {}
    let sym = sym_input.value
    let Asym = Asym_input.value

    obj_kes.sym = sym
    obj_kes.Asym = Asym

    init_list.push(obj_kes)


    console.log(init_list)
})

//-------------------------------------------------------------------------------------------//

var shape_id = ''
var parent_shape = document.getElementById('parent-shape').addEventListener('dragstart', (e) => {
    shape_id = e.target.id
})
var container = stage.container()
var containerRect = stage.container().getBoundingClientRect();


function tst() {
    var partner = new RectNode()

}

container.addEventListener('dragover', (e) => {
    e.preventDefault()
})

container.addEventListener('drop', (e) => {
    e.preventDefault()
    stage.setPointersPositions(e)

    var pos = stage.getPointerPosition()
    if (shape_id == 'square') {
        create_rect(pos.x, pos.y, layer, stage)
        partner_counter++
        count++
    }


})

//-------------------------------------------------------------------------------------------//
function toolbox_manager(type) {
    switch (type) {
        case 'rect':

            break;
        case 'arrow':
            // free_drawing(stage, layer, true);
            draw_arrow(stage, layer);
            break;
        case 'text':
            // free_drawing(stage, layer, true);
            write_text(stage, layer);

            break;
        case 'break_arrow':
            // free_drawing(stage, layer, true);
            self_arrow(stage, layer);

            break;
        case 'palet':
            console.log(json)
                // ln(stage, layer)
                // alert("palet");
            break;
        case 'pen':
            free_drawing(stage, layer, 'brush', false);
            // $('body').awesomeCursor('pencil')
            break;
        case 'eraser':
            free_drawing(stage, layer, '', false);
            break;
        default:
            console.log("default")
    }
}
//-------------------------------------------------------------------------------------------//

function selectValuesInParentheses(str) {
    var match = str.match(/\(([^)]+)\)/);
    return match ? match[1] : '';
}