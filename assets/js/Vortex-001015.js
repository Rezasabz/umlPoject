//#region Global Variables
var count = 0
var partner_counter = 0
var arrow_count = 0
var invalid_empty_rec = document.querySelector('#invalid-empty-rec')
var opt = getFormId('options')
var opt_note = getFormId('options_note')
var btn_param = getFormId('submit_btn')
var btn_edit = getFormId('edit_btn')
var btn_delete = getFormId('btn_delete')
var btn_delete_note = getFormId('btn_delete_note')
var btn_init = getFormId('btn_init')
let currentShape;
var shape_id = ''
var parent_shape = document.getElementById('parent-shape').addEventListener('dragstart', (e) => {
    shape_id = e.target.id
})

var currentGroupName = {};

var target = ''
var tr_target = ''

var group_ = {
    x: {},
    y: {},
    name,
}
var obj_partner = {}

var connect_node2 = {
    id: 1000,
    from: '',
    to: '',
    arrow: '',
    message: {},
    note: {}
}

//---------- اندیس گروه کلیک شده ------------//
// این فلگ برای ثبت فرم مورد استفاده قرار می گیرد
var flag_cliced_group
    //-----------------------------------------//
    //#endregion

//#region Global Arrays
var rect_list = []
var send_list = []
var arrow_list = []
var params_dictinary = []
var init_list = []
var params_arr = []
var array_json = []
var macro_list = []
var function_array = []
var nonce_array = []
var array_state_note = []
var key_word_list = ["Hash(message)", "Mac(message,key)", "Enc(message,key)", "Dec(message,key)", "Sign(message,key)", "Verify(sign,key)", "AEnc(message,key)", "ADec(message,key)"]
var global_partner_list = {
        partners: []
    }
    //#endregion

//#region Stage Design
var width = document.getElementById('container').offsetWidth;
var height = document.getElementById('container').offsetHeight;
var GUIDELINE_OFFSET = 5;

var stage = new Konva.Stage({
    container: "container",
    // width: 3000,
    width: width,
    height: height
});
var layer = new Konva.Layer();
stage.add(layer)
var container = stage.container()
var containerRect = stage.container().getBoundingClientRect();
//#endregion


//#region Form

//#region Send Form
function transformTag(tagData) {
    var check_valid = error_handler_func(tagData.value)
    if (check_valid == false) {
        tagData.__isValid = false
        tagData.color = "hsl(353.4,40.5%,69%)"
        tagData.style = "--tag-bg:" + tagData.color;
    } else {
        tagData.__isValid = true
    }
}
var input_reciver = new Tagify(document.querySelector('input[name=reciver]'), {
    whitelist: [],
    maxTags: 10,
    transformTag: transformTag,
    dropdown: {
        maxItems: 20, // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0, // <- show suggestions on focus
        closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    }
})
var input_def = new Tagify(document.querySelector('input[name=define]'), {
    whitelist: key_word_list,
    maxTags: 10,
    transformTag: transformTag,
    dropdown: {
        maxItems: 20, // <- mixumum allowed rendered suggestions
        classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
        enabled: 0, // <- show suggestions on focus
        closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    }
})
var input_params = new Tagify(document.querySelector('input[name=params]'), {
        whitelist: key_word_list,
        maxTags: 10,
        transformTag: transformTag,
        dropdown: {
            maxItems: 20, // <- mixumum allowed rendered suggestions
            classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
            enabled: 0, // <- show suggestions on focus
            closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
        }
    })
    //#endregion

//#region Form Edit
// ----- دکمه ثبت تغییرات در فرم ------//
btn_param.addEventListener('click', (e) => {
    var msg_obj = {}
    var reciver_value = $('input[name=reciver]').val()
    var define_value = $('input[name=define]').val()
    var params_value = $('input[name=params]').val()

    console.log(reciver_value)

    if (reciver_value !== '') {
        var check_reciver = JSON.parse(reciver_value).map(function(elem) {
            return elem.value;
        })
        rect_list.forEach(rc => {
            if (rc.children[2].attrs.text === check_reciver[0]) {
                invalid_empty_rec.style.display = "none"
                if (NotEmpty(obj_partner))
                    obj_partner = {}

                obj_partner.reciver = reciver_value != '' ? JSON.parse(reciver_value).map(function(elem) {
                    return elem.value;
                }) : []
                connect_node2.to = rc.attrs.name
            }
        })
        obj_partner.define = define_value != '' ? JSON.parse(define_value).map(function(elem) {
            return elem.value;
        }) : []
        obj_partner.define.forEach(def => {
            if (def.includes("=")) {
                let split_mosavi = def.split("=")
                macro_list.push({
                    name: split_mosavi[0].trim(),
                    value: split_mosavi[1].trim()
                })
            }
        })
        msg_obj.define = obj_partner.define
        obj_partner.params = params_value != '' ? JSON.parse(params_value).map(function(elem) {
            return elem.value;
        }) : []
        msg_obj.params = obj_partner.params
        connect_node2.message = msg_obj
        connect_node2.note = msg_obj

        obj_partner.partnerName = connect_node2.from
        obj_partner.sender = connect_node2.from
        send_list.push(obj_partner)

        let index_arrow
        if (connect_node2.id != 1000) {
            index_arrow = connect_node2.id
            arrow_list[index_arrow].arrow.destroy()
        } else {
            connect_node2.id = arrow_list.length
            index_arrow = connect_node2.id
            arrow_list.push(connect_node2)
        }

        console.log("index_arrow => ", index_arrow)

        draw_arrow_from_arrow_list(index_arrow)
        arrow_count++
        $('#staticBackdrop').modal('toggle')
        opt.style.display = 'none'
        opt_note.style.display = 'none';
    }

})
let inputs = [input_reciver, input_def, input_params]

function remove_all_tag(inputs) {

    for (let i = 0; i < inputs.length; i++) {
        btn_param.addEventListener('click', inputs[i].removeAllTags.bind(inputs[i]))
    }
}
remove_all_tag(inputs)
    // btn_param.on('click', input_reciver.removeAllTags.bind(input_reciver))
    // btn_param.on('click', input_def.removeAllTags.bind(input_def))
    // btn_param.on('click', input_params.removeAllTags.bind(input_params))
    //#endregion

//#region Delete Function
function delete_function(btn_id) {
    btn_id.addEventListener('click', (e) => {

        var index_connect_node = arrow_list[connect_node2.id]
        console.log(index_connect_node)
        index_connect_node.arrow.destroy()
        arrow_list.splice(index_connect_node, 1)
            // connect_node_list.splice(index_connect_node, 1)
        arrow_count--
        remove_all_tag()
    })
}

delete_function(btn_delete_note)

//#endregion
//#endregion

//#region Global Functions
//#region Partner Shape  
//----- اشیا داخل شکل پارتنر ---------//
function gn_obj(lbl) {
    var general_obj_partner = {
        labelName: new Konva.Text({
            fontFamily: 'Calibri',
            fontSize: 18,
            padding: 5,
            fill: 'black',
            text: `Partner${partner_counter}`,
            align: 'center',

        }),
        rec: new Konva.Rect({
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
        }),
        line: new Konva.Line({
            points: [50, 50, 50, 220, 50, 460],
            stroke: 'black',
            strokeWidth: 3,
            lineJoin: 'round',
            dash: [33, 10],
            draggable: false,
        }),
        node: new Konva.Rect({
            width: 7,
            height: 7,
            fill: null,
            stroke: 'blue',
            strokeWidth: 2,
        }),
        group: new Konva.Group({
            draggable: true,
            name: "partner" + partner_counter,
            rotation: 0,
            id: "rect" + count,
        }),


        resize_gr: new Konva.Transformer({
            ignoreStroke: true,
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
            padding: 5,
        }),
        // resize_arrow: new Konva.Transformer({
        //     ignoreStroke: true,
        //     borderDash: [3, 3],
        //     centeredScaling: true,
        //     rotationSnaps: [0, 90, 180, 270],
        //     padding: 5,
        // }),


    }
    return general_obj_partner
}
//#endregion
//#region Note
//----- اشیا داخل شکل نوت ---------//
function not_new() {
    var note_maker = {
        text_note: new Konva.Text({
            fontSize: 13,
            fontFamily: 'Calibri',
            fill: '#000',
            width: 130,
            padding: 5,
            align: 'left'
        }),

        base_node: new Konva.Rect({
            width: 165,
            fill: '#fdfd80',
            shadowOpacity: 0.4,
            shadowBlur: 2,
            cornerRadius: [0, 0, 0, 0],
            shadowColor: 'black',
            shadowOffset: {
                x: 1,
                y: 1
            },
            strokeWidth: 4,
        }),
        note_group: new Konva.Group({

            width: 130,
            height: 25,
            draggable: true,
            id: "note_" + arrow_count,
            name: "note_" + arrow_count
        })
    }
    return note_maker
}
//#endregion
function add_element_to_array_if_not_exist(array, partner_list, element, val, labelName) {
    var flag = false
    if (array.length !== 0) {
        array.forEach(a => {
            if (a.children[2].attrs.text === val) {
                flag = true
                    // if (resolve != null) {
                    //     resolve('Name already exist !')

                // }
                return
            } else if (a.attrs.id === element.attrs.id && flag == false) {
                flag = true
                element.add(labelName)
                labelName.text(val)
                var measure_text = labelName.measureSize(labelName.text())
                labelName.absolutePosition({
                        x: element.attrs.x - (measure_text.width / 2) + (element.children[1].attrs.width / 2) - 5,
                        y: element.attrs.y - (measure_text.height / 2) + (element.children[1].attrs.height / 2) - 5,
                    })
                    // if (resolve != null) {
                    //     resolve()
                    // }
            }

        })
    }
    if (array.length === 0 || flag == false) {
        array.push(element)
        element.add(labelName)

        labelName.text(val)
        var measure_text = labelName.measureSize(labelName.text())
        labelName.absolutePosition({
            x: element.attrs.x - (measure_text.width / 2) + (element.children[1].attrs.width / 2) - 5,
            y: element.attrs.y - (measure_text.height / 2) + (element.children[1].attrs.height / 2) - 5,
        })
        array_json.push(element.toJSON())

        // if (resolve != null)
        //     resolve()
    }
}

//#region Create Partner Shape
//----- ساختن اجزای پارتنر در زمان درگ یا باز کردن فایل ---------//
function partnerEventHandler(obj, p = null) {

    var pos = {}
    if (p != null) {
        pos = p
    } else {
        if (obj.group) {
            pos.x = obj.group.attrs.x
            pos.y = obj.group.attrs.y
        }
    }
    if (obj.group) {
        obj.group.absolutePosition({
            x: pos.x,
            y: pos.y,
        })
        obj.group.add(obj.rec, obj.labelName, obj.line)
        var measure_text = obj.labelName.measureSize(obj.labelName.text())
        obj.labelName.absolutePosition({
            x: obj.group.attrs.x - (measure_text.width / 2) + (obj.group.children[0].attrs.width / 2) - 5,
            y: obj.group.attrs.y - (measure_text.height / 2) + (obj.group.children[0].attrs.height / 2) - 5,
        })

        if (rect_list.length != 0) {
            rect_list.forEach(a => {
                if (a.name() != obj.group.name()) {
                    rect_list.push(obj.group)
                }
            })
        } else {
            rect_list.push(obj.group)
        }
    }
    partner_counter++
    count++

    return obj
}
//#endregion

//#endregion


//#region Event Handlers
container.addEventListener('drop', (e) => {
    e.preventDefault()
    stage.setPointersPositions(e)


    var pos = stage.getPointerPosition()
    if (shape_id == 'square') {
        var partner = partnerEventHandler(gn_obj(), pos)
        layer.add(partner.group)

    }
})

stage.on('click', (e) => {
    e.evt.preventDefault();

    if (e.target === stage) {
        opt.style.display = 'none'
        opt_note.style.display = 'none';
        return;
    }

    var group
    if (e.target.parent.getClassName() === "Group") {
        if (e.target.parent.parent.name().includes('arrow')) {
            console.log("object 1 ", arrow_list)
            arrow_list.filter((fil, index) => {
                if (fil.arrow.attrs.name === e.target.parent.parent.attrs.name) {
                    connect_node2.id = index
                    console.log(index)
                    connect_node2.from = fil.from
                    console.log("object 2", fil.from)
                    opt_note.style.display = 'initial'
                    opt_note.style.top =
                        e.target.parent.attrs.y + 75 + 'px';
                    opt_note.style.left =
                        e.target.parent.attrs.x + 410 + 'px';
                    opt_note.addEventListener('click', () => {
                        opt_note.style.display = 'none';
                    })
                    invalid_empty_rec.style.display = "none"
                    input_reciver.addTags(fil.to)
                    input_def.addTags(fil.message.define)
                    input_params.addTags(fil.message.params)
                }
            })
        } else if (e.target.parent.name().includes('partner')) {
            opt.style.display = 'initial'
            opt.style.left = e.target.parent.attrs.x + 370 + 'px';
            opt.style.top = e.target.parent.attrs.y + 75 + 'px';
            rect_list.filter((fil, index) => {
                if (fil.attrs.name === e.target.parent.attrs.name) {
                    connect_node2 = {
                            id: 1000,
                            from: '',
                            to: '',
                            arrow: '',
                            message: {},
                            note: {}
                        }
                        //-------مقدار دهی نود ابتدایی فلش ---------//
                    connect_node2.from = fil.attrs.name
                        // ------ گرفتن شکل انتخاب شده ------------//
                    group = fil


                    // flag_cliced_group = index
                }
            })

            // ----------- دکمه ثبت انتخاب یا تغییر نام پارتنر و وارد کردن کلیدها -----------//
            btn_init.addEventListener('click', (e) => {
                var name_value = $('input[name=name]').val()
                var sym_value = $('input[name=sym]').val()
                var Asym_value = $('input[name=Asym]').val()
                if (name_value !== '') {
                    rect_list.forEach(rc => {
                        if (rc.name() === connect_node2.from) {
                            rc.children[1].text(name_value)
                            var measure_text = rc.children[1].measureSize(rc.children[1].text())
                            rc.children[1].absolutePosition({
                                x: rc.attrs.x - (measure_text.width / 2) + (rc.children[0].attrs.width / 2) - 5,
                                y: rc.attrs.y - (measure_text.height / 2) + (rc.children[0].attrs.height / 2) - 5,
                            })
                        }
                    })
                    $('#initial').modal('toggle')
                    opt.style.display = 'none'
                    opt_note.style.display = 'none';
                    name_value = ''

                } else {
                    alert('لطفا نام و کلید را وارد کنید')
                }
            })
            console.log(rect_list)
                //------- بروز محل المان ها پس از جابجایی شکل انتخاب شده ------//
            group.on('dragmove', () => {
                console.log("e.target.parent")
                opt.style.left = e.target.parent.attrs.x + 370 + 'px';
                opt.style.top = e.target.parent.attrs.y + 75 + 'px';
            })

        }
    }

})

// stage.on('dragmove', (e) => {
//     var group
//         if (e.target.parent.getClassName() === "Group") {
//             rect_list.forEach(gr=>{
//                 if(gr.attrs.name == e.target.parent.getClassName())
//                  group = gr
//             })

//             group.on('dragmove')
//         console.log("e.target.parent")
//             }
//     })
//#endregion

//#region Parser
var tmp_func_content
var split_array
var i = 0
var flag_error_func = 1000

function is_function(str) {
    return str.includes("(") || str.includes(")")
}

function is_macro(str) {
    var res = null
    macro_list.forEach(mc => {
        if (mc.name == str) {
            res = mc.value
        }
    })
    return res
}

function error_handler_func(func) {
    var check_func = is_function(func)
        // console.log(check_func)
    if (check_func == false) {
        return true
    } else {
        var out_func = func_content(func)
            // console.log(out_func)
        switch (out_func.name) {
            case "Hash":
                if (out_func.content.length < 1) {
                    // console.log("object")
                    return false
                }
                break;
            case "Mac":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "Enc":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "Dec":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "Sign":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "Verify":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "AEnc":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            case "ADec":
                if (out_func.content.length < 2) {
                    return false
                }
                break;
            default:
                return true
        }
    }
}

function func_content(func) {
    var obj_function = {}
    var function_name
    var counter = 0
    var first_parantez = 0
    var end_parantez = 0
    for (var i = 0; i < func.length; i++) {
        var c = func[i]
        if (c == "(") {
            if (counter == 0) {
                function_name = func.slice(0, i).trim()
                first_parantez = i + 1
            }
            counter++
        }
        if (c == ")") {
            counter--
            if (counter == 0)
                end_parantez = i
        }
    }
    var cont = func.substring(first_parantez, end_parantez)
    obj_function.name = function_name.replace(',', '')
    obj_function.content = splite_content(cont)
    return obj_function
}

function splite_content(content) {
    var split_array = []
    var split_array_tmp = []
    var counter = 0
    var index = 0
    for (var i = 0; i < content.length; i++) {
        var c = content[i]
        if (counter == 0 & c == ",") {
            split_array.push(content.substring(index, i))
            index = i
        }
        if (c == "(") {
            counter++
        }
        if (c == ")") {
            counter--
        }
    }
    var tmp_content = content.substring(index, content.length)
    if (tmp_content != '') {
        split_array.push(tmp_content)
    }
    return split_array
}

function splite_string(str) {

    str.forEach((sp) => {
        // ------------ for macro check
        let res_macro = is_macro(sp)
        if (res_macro != null) {
            sp = res_macro
        }
        //-----------------
        if (is_function(sp)) {
            fn = func_content(sp)
            var func_exist_index = is_contain(function_array, fn.name)
            if (func_exist_index < function_array.length) {
                if (fn.content.length !== function_array[func_exist_index].content.length) {
                    flag_error_func = func_exist_index
                }
            } else {
                function_array.push(fn)
            }
            splite_string(func_content(sp).content)
        } else {
            nonce_array.push(sp.replace(',', ''))
        }
    })
}

function parser_msg_to_partner(str) {
    var array_partner = []
    str.forEach((s) => {
        var index = is_contain(array_partner, s.sender)
        if (index === array_partner.length) {
            var new_partner = {
                name: '',
                sym_key: [],
                Asym_key: [],
                messages: [],
                nonces: {
                    new_array: [],
                    var_array: []
                }
            }
            new_partner.name = s.sender
            new_partner.messages.push(s)
            array_partner.push(new_partner)
        } else {
            array_partner[index].messages.push(s)
        }
        var index_1 = is_contain(array_partner, s.reciver)
        if (index_1 === array_partner.length) {
            var new_partner = {
                name: '',
                sym_key: [],
                Asym_key: [],
                messages: [],
                nonces: {
                    new_array: [],
                    var_array: []
                }
            }
            new_partner.name = s.reciver
            new_partner.messages.push(s)
            array_partner.push(new_partner)
        } else {
            array_partner[index_1].messages.push(s)
        }

    })

    array_partner.forEach(n => {
        n.messages.forEach(m => {
            splite_string(splite_content(m.params))
            var nonce = nonce_array
            nonce.forEach(ns => {
                if (!n.nonces.var_array.includes(ns) && !n.nonces.new_array.includes(ns) && ns.trim() != '') {
                    if (n.name === m.sender) {
                        n.nonces.new_array.push(ns)
                    } else {
                        n.nonces.var_array.push(ns)
                    }
                }
            })
        })
    })
    return array_partner
}

function is_contain(arr, partner) {
    for (var i = 0; i < arr.length; i++) {
        if (arr[i].name === partner) {
            // console.log("1 ",i)
            return i
        }
    }
    return arr.length

}
//#endregion

//#region Send Messages
function send_msg(from, to, msg, arrow_index, arrow_fill = 'black', lbl_fontSize = 20, lbl_fill = 'green', y2 = null) {
    //------------- تبدیل پارمترهای ورودی به آبجکت --------//
    let lbl_msg = ''
    let note_msg = msg.define.join("\n")
    note_msg += "\n"
    let array_obj_params = params_to_note_parser(msg.params, arrow_index)
    array_obj_params.forEach(ar => {
            lbl_msg += `(${ar.key})  `
            note_msg += `\n${ar.key} = ${ar.value}`
        })
        //------------- مختصات رسم فلش ------------//
    var first_x = 0
    var first_y = 0
    var second_x = 0
    var second_y = 0
    rect_list.forEach(el => {
        if (el.attrs.name === from) {
            first_x = el.getX()
            first_y = el.getY()
        } else if (el.attrs.name === to) {
            second_x = el.getX()
            second_y = el.getY()
        }
    })

    var distance_partner = second_x - first_x
    var arrow_group = new Konva.Group({
        name: "arrow_" + arrow_count,
        draggable: true,
    })
    var arrow = new Konva.Arrow({
        x: first_x,
        y: first_y,
        points: [0, 0, distance_partner, 0],
        pointerLength: 10,
        pointerWidth: 10,
        fill: arrow_fill,
        stroke: arrow_fill,
        strokeWidth: 2,
    });
    // connect_node.arrow = arrow
    var labelArrow = new Konva.Text({
        text: lbl_msg,
        x: arrow.getX(),
        y: arrow.getY(),
        fontSize: lbl_fontSize,
        fontFamily: 'Calibri',
        fill: lbl_fill,
    });


    let note_group = new Konva.Group({
        x: first_x,
        y: first_y,
        width: 130,
        height: 25,
        draggable: true,
        id: "note_" + arrow_count,
        name: "note_" + arrow_count
    })

    let text_note = new Konva.Text({
        text: note_msg,
        fontSize: 13,
        fontFamily: 'Calibri',
        fill: '#000',
        // width: 200,
        padding: 10,
        align: 'left'
    })

    let base_node = new Konva.Rect({
            width: text_note.width(),
            height: text_note.height(),
            fill: '#fdfd80',
            shadowOpacity: 0.4,
            shadowBlur: 2,
            cornerRadius: [0, 0, 0, 0],
            shadowColor: 'black',
            shadowOffset: {
                x: 1,
                y: 1
            },
            strokeWidth: 4,
        })
        // text_note.text(note_msg)
    note_group.add(base_node, text_note)
    arrow_group.add(arrow, labelArrow, note_group)
    layer.add(arrow_group)
    console.log("arrow list => ", arrow_list)
    return { arrow: arrow_group, lbl_arrow: labelArrow }
}

// ------------ پارس کردن پارامترهای ورودی به برچسب فلش و محتوای نوت ----------//
function params_to_note_parser(input_params, index) {
    var p = []
    var length_params = input_params.length
    for (var i = 0; i < length_params; i++) {
        let label_message = {
            key: "P" + (index) + i.toString(),
            value: input_params[i]
        }
        p.push(label_message)
    }
    return p
}

function draw_arrow_from_arrow_list(index) {

    let idx_arrow_list = arrow_list[index]
    console.log(idx_arrow_list)
    let drawed_arrow = send_msg(idx_arrow_list.from, idx_arrow_list.to, idx_arrow_list.message, index)
    arrow_list[index].arrow = drawed_arrow.arrow


}
//#endregion


//#region File Manager
//#endregion

//#region Toobox
//#region NotEmpty
function NotEmpty(obj) {
    return Object.keys(obj).length !== 0;
}
//#endregion
function getFormId(id) {
    var btn_param = document.getElementById(id)
    return btn_param
}

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

//#endregion