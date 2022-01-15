// Get the current frame's height and width:
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
var i = 1;
var j = 1;
var x = 50
var y = 10;
var tex = 200;
var blockSnapSize = 30;

var count = 0
var partner_counter = 0
var arrow_count = 0
var rect_list = []
var get_last_position_arrow = 100
var i = 0

var ct = 0

var send_list = []
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

var input_def_note
var input_params_note

var input_reciver
var input_def
var input_params

var input_reciver_test
var input_def_test
var input_params_test

var input_reciver_test_tagify
var input_def_test_tagify
var input_params_test_tagify

// ---------------------------- get Id ----------------------------//
var invalid_empty_rec = document.querySelector('#invalid-empty-rec')
    // ----------------------------------------------------------------//


// var gridLayer = new Konva.Layer();
// var padding = blockSnapSize;
// console.log(width, padding, width / padding);
// for (var i = 0; i < width / padding; i++) {
//     gridLayer.add(new Konva.Line({
//         points: [Math.round(i * padding) + 0.5, 0, Math.round(i * padding) + 0.5, height],
//         stroke: '#ddd',
//         strokeWidth: 1,
//     }));
// }

// gridLayer.add(new Konva.Line({ points: [0, 0, 10, 10] }));
// for (var j = 0; j < height / padding; j++) {
//     gridLayer.add(new Konva.Line({
//         points: [0, Math.round(j * padding), width, Math.round(j * padding)],
//         stroke: '#ddd',
//         strokeWidth: 0.5,
//     }));
// }

// stage.add(gridLayer);

stage.add(layer)
var json


function NotEmpty(obj) {
    return Object.keys(obj).length !== 0;
}


// function draw_arrow(){

// }

// Rectangle And Line
// class RectNode {

function getFormId(id) {
    var btn_param = document.getElementById(id)
    return btn_param
}
// class RectNode {

// }

var opt = document.getElementById('options')
var opt_note = document.getElementById('options_note')
var delete_shape = document.getElementById('btnradio3')
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

var data_input = ''





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


// var json = stage.toJSON();

let currentShape;





var shape_id = ''
var parent_shape = document.getElementById('parent-shape').addEventListener('dragstart', (e) => {
    shape_id = e.target.id
})
var container = stage.container()
var containerRect = stage.container().getBoundingClientRect();


function tst() {
    var partner = new RectNode()

}

var params_dictinary = []

container.addEventListener('dragover', (e) => {
    e.preventDefault()
})
var currentGroupName = {};

var target = ''
var tr_target = ''

var group_ = {
    x: {},
    y: {},
    name,
}
var b = document.getElementById('test')
var btn_ = document.getElementById('btn_init')
var frm = document.getElementById('init-form')
var arrow_list = []


// ---------------------------------new code ---------------------------------------------//
function add_element_to_array_if_not_exist(array, partner_list, element, val, resolve = null, labelName) {
    var flag = false
    if (array.length !== 0) {
        array.forEach(a => {
            if (a.children[2].attrs.text === val) {
                flag = true
                if (resolve != null) {
                    resolve('Name already exist !')

                }
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
                if (resolve != null) {
                    resolve()
                }
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

        if (resolve != null)
            resolve()
    }

    // console.log(rect_list)
    // console.log(create_tmp_partner_list())
}

function create_tmp_partner_list() {
    var tmp_partner_list = []
    rect_list.forEach(rc => {
        tmp_partner_list.push(rc.children[2].attrs.text)
    })
    return tmp_partner_list
}

function listToString(list) {
    var str = '';
    for (var i = 0; i < list.length; i++) {
        str += list[i] + "\n";
    }
    return str;
}

function gn_obj() {
    var general_obj_partner = {
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
            name: "partner" + partner_counter,
            rotation: 0,
            id: "rect" + count,
        }),
        labelName: new Konva.Text({
            fontFamily: 'Calibri',
            fontSize: 18,
            padding: 5,
            fill: 'black',
            text: 'Partner' + partner_counter,
            align: 'center',

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

function not_new() {
    var note_maker = {
        text_note: new Konva.Text({
            // text: obj_partner.define + "\n" + listToString(dict_params).trim("\n"),
            fontSize: 13,
            // fontStyle: "italic",
            fontFamily: 'Calibri',
            fill: '#000',
            width: 130,
            padding: 5,
            align: 'left'
        }),

        base_node: new Konva.Rect({
            width: 165,
            // height: text_note.height(),
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
        // let cumputing_x = Math.sign(arrow_distance.points()[2]) == 1 ? connect_node.from.getX - 110 : connect_node.from.getX + 60
        note_group: new Konva.Group({
            // x: cumputing_x,
            // y: connect_node.arrow.attrs.y + 10,
            width: 130,
            height: 25,
            draggable: true,
            id: "note_" + arrow_count,
            name: "note_" + arrow_count
        })
    }
    return note_maker
}

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



        // if (obj.group.attrs.name.includes("partner")) {
        //     console.log("name => ", obj.group.attrs)


        obj.group.absolutePosition({
            x: pos.x,
            y: pos.y,
        })
        obj.group.add(obj.line, obj.rec, obj.labelName)
        add_element_to_array_if_not_exist(rect_list, global_partner_list, obj.group, obj.labelName.text(), null, obj.labelName)

        // if (pos.children) {

        //     obj.labelName.text(pos.children[2].attrs.text)

        // }
        layer.add(obj.group)


        obj.group.on('click', (e) => {
            // console.log(global_partner_list.partners)
            opt.style.display = 'initial';
            if (!NotEmpty(obj_group)) {
                opt.style.top =
                    e.target.parent.attrs.y + 75 + 'px';
                opt.style.left =
                    e.target.parent.attrs.x + 370 + 'px';
                opt.addEventListener('click', () => {
                    opt.style.display = 'none';
                })
            } else {
                opt.style.display = 'initial';
                opt.style.top =
                    obj_group.y + 75 + 'px';
                opt.style.left =
                    obj_group.x + 370 + 'px';
                opt.addEventListener('click', () => {
                    opt.style.display = 'none';
                })
            }
            if (e.target.parent.children.length > 2) {
                currentGroupName.sender = e.target.parent.children[2].attrs.text
            }
            currentGroupName.name = e.target.parent.attrs.name
            currentGroupName.getX = e.target.parent.attrs.x
            currentGroupName.getY = e.target.parent.attrs.y
            currentGroupName.bar = obj.group.children[0].attrs

            var container = stage.container();

            container.tabIndex = 1;
            // focus it
            // also stage will be in focus on its click
            container.focus();
            obj.group.addEventListener('keydown', (el) => {
                    if (el.keyCode === 27) {
                        obj.resize_gr.detach()
                        btn_draw_shape.style.display = 'none';
                    } else if (el.keyCode === 46) {
                        console.log("46")
                    } else {
                        return;
                    }
                    layer.batchDraw();
                })
                // init_partner(obj.group)
        })
        obj.group.on('dragmove', (e) => {
            obj_group.x = e.target.getClientRect().x
            obj_group.y = e.target.getClientRect().y
            opt.style.display = 'initial';
            opt.style.top =
                obj_group.y + 75 + 'px';
            opt.style.left =
                obj_group.x + 370 + 'px';
            opt.addEventListener('click', () => {
                opt.style.display = 'none';
            })
        })

        obj.group.on('dblclick', (ev) => {
            Swal.fire({
                html: '<input id="swal-input1" class="swal2-input">' +
                    '<input id="swal-input2" class="swal2-input">',
                title: 'Enter Name',
                input: 'text',
                inputAttributes: {
                    autocapitalize: 'off'
                },
                showCancelButton: true,
                confirmButtonText: 'Submit',
                showLoaderOnConfirm: true,
                inputValidator: (value) => {
                    return new Promise((resolve) => {
                        if (value !== '') {
                            add_element_to_array_if_not_exist(rect_list, global_partner_list, obj.group, value, resolve, obj.labelName)
                        } else {
                            resolve('Name is required')
                        }
                    })
                }
            })
            frm.reset()
        })
        obj.group.on("contextmenu", (e) => {
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
                    rect_list.filter((fil) => {
                        if (fil.attrs.id === e.target.parent.attrs.id) {
                            var index = rect_list.indexOf(fil)
                        }
                        e.target.parent.destroy()
                    })
                    obj.resize_gr.destroy()
                    opt.style.display = "none"
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
            // } else if (obj.group.attrs.name.includes("arrow_")) {
            //     console.log("arrow ", obj.group.attrs)
            // }
    }


    if (obj.rec) {
        obj.rec.on('mouseover', () => {
            stage.container().style.cursor = 'pointer';
        })
        obj.rec.on('mouseleave', () => {
            stage.container().style.cursor = 'default';
        })
    }

    if (obj.resize_gr) {
        obj.resize_gr.on('transform', (e) => {
            obj.resize_gr.setAttrs({
                width: Math.max(obj.group.width() * obj.group.scaleX(), 5),
                height: Math.max(obj.group.height() * obj.group.scaleY(), 5),
                scaleX: 1,
                scaleY: 1,
            })
        })
        layer.add(obj.resize_gr)
    }
    var obj_group = {}





    stage.add(layer)


    // var invalid_empty_def = document.querySelector('#invalid-empty-def')
    // var invalid_empty_params = document.querySelector('#invalid-empty-params')
    var state_reciver = false
    var state_define = false
    var state_parametrs = false
    $('#btnradio2').click(() => {
            if (state_reciver == true && state_define == true && state_parametrs == true) {
                invalid_empty_rec.style.display = "none"
                    // invalid_empty_def.style.display = "none"
                    // invalid_empty_params.style.display = "none"
            }
        })
        // var white_list_partner = []
        // for (var i = 0; i < global_partner_list.partners.length; i++) {
        //     white_list_partner.push(global_partner_list.partners[i])
        // }


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





    input_reciver_test = new Tagify(document.querySelector('input[name=reciver]'), {
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

    // input_reciver_test.addTags(["banana", "orange", "apple"])

    // input_reciver_test.on('add', (e) => {
    //     console.log("add", e)
    // })
    input_def_test = new Tagify(document.querySelector('input[name=define]'), {
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
        // .on('add', function(e, tagName) {})

    // })
    input_params_test = new Tagify(document.querySelector('input[name=params]'))

    console.log(input_reciver_test.value)

    // input_reciver = $('input[name=reciver]').tagify({
    //         whitelist: [],
    //         maxTags: 10,
    //         // transformTag: transformTag,
    //         dropdown: {
    //             maxItems: 20, // <- mixumum allowed rendered suggestions
    //             classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
    //             enabled: 0, // <- show suggestions on focus
    //             closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    //         }
    //     })
    //     .on('add', function(e, tagName) {

    //     })
    //     .on("invalid", function(e, tagName) {
    //         console.log("invalid", tagName)
    //     })
    //     .on('input', (e) => {
    //         if (state_reciver == true) {
    //             invalid_empty_rec.style.display = "none"
    //         }
    //     })

    // // console.log(global_partner_list.partners.toString())
    // // console.log(global_partner_list.partners)
    // var jqTagify = input_reciver.data('tagify');
    // input_def = $('input[name=define]').tagify({
    //         whitelist: key_word_list,
    //         maxTags: 10,
    //         transformTag: transformTag,
    //         dropdown: {
    //             maxItems: 20, // <- mixumum allowed rendered suggestions
    //             classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
    //             enabled: 0, // <- show suggestions on focus
    //             closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    //         }
    //     })
    //     .on('add', function(e, tagName) {})
    //     .on("invalid", function(e, tagName) {})
    //     .on('input', (e) => {
    //         // if (state_reciver == true) {
    //         //     invalid_empty_def.style.display = "none"
    //         // }
    //         // console.log(e)
    //     })
    // var jqTagify_1 = input_def.data('tagify');
    // input_params = $('input[name=parametrs]').tagify({
    //         whitelist: key_word_list,
    //         maxTags: 10,
    //         transformTag: transformTag,
    //         dropdown: {
    //             maxItems: 20, // <- mixumum allowed rendered suggestions
    //             classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
    //             enabled: 0, // <- show suggestions on focus
    //             closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    //         }
    //     })
    //     .on('add', function(e, tagName) {})
    //     .on("invalid", function(e, tagName) {})
    //     .on('input', (e) => {
    //         if (state_reciver == true) {
    //             invalid_empty_params.style.display = "none"
    //         }
    //     })
    // var jqTagify_2 = input_params.data('tagify');
    var btn_param = getFormId('submit_btn')
    var btn_param_note = getFormId('submit_btn_note')
    var obj_partner = {}
    var connect_node = {
        from: {},
        to: {},
        arrow: {},
    }

    if (obj.arrow_group) {
        obj.arrow_group.add(obj.arrow_distance, obj.lableArrow)
        layer.add(obj.arrow_group)
    }
    // if (obj.note_group) {
    //     obj.note_group.add(obj.base_node, obj.text_note);
    //     layer.add(obj.note_group)
    //     obj.note_group.on('click', (e) => {
    //         console.log("note ", e)
    //         opt_note.style.display = 'initial';
    //         // if (!NotEmpty(obj_group)) {
    //         opt_note.style.top =
    //             e.target.parent.attrs.y + 75 + 'px';
    //         opt_note.style.left =
    //             e.target.parent.attrs.x + 410 + 'px';
    //         opt_note.addEventListener('click', () => {
    //             opt_note.style.display = 'none';
    //         })
    //     })

    // }


    // -----------------------note tagify -----------------------//
    input_def_note = $('input[name=define_note]').tagify({
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
        .on('add', function(e, tagName) {})
        .on("invalid", function(e, tagName) {})
        .on('input', (e) => {
            // if (state_reciver == true) {
            //     invalid_empty_def.style.display = "none"
            // }
            // console.log(e)
        })
    var jqTagify_note_1 = input_def_note.data('tagify');
    input_params_note = $('input[name=parametrs_note]').tagify({
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
        .on('add', function(e, tagName) {})
        .on("invalid", function(e, tagName) {})
        .on('input', (e) => {
            // if (state_reciver == true) {
            //     invalid_empty_params.style.display = "none"
            // }
        })
    var jqTagify_note_2 = input_params_note.data('tagify');
    // ----------------------------------------------------------//



    // jqTagify.removeAllTags.bind(jqTagify)
    // jqTagify_1.removeAllTags.bind(jqTagify_1)
    // jqTagify_2.removeAllTags.bind(jqTagify_2)
    function params_to_note_parser(input_params, index) {
        var params_arr = []
        var p = []
        console.log("======> ", input_params_test.value)
        if (input_params_test.value.trim() != '') {
            var length_params = jQuery.parseJSON(input_params_test.value).length
            var handle_text_note = input_params_test.value
                // var handle_text_note = jQuery.parseJSON(array_state_note[index].params.key)
            var str_params = ''
            for (var i = 0; i < length_params; i++) {
                params_arr.push(handle_text_note[i])
                str_params += "P" + (index) + i.toString() + " = " + jQuery.parseJSON(input_params_test.value)[i].value + "\n"
                p.push(" P" + (index) + i.toString())
            }
        }
        return { key: handle_text_note, value: str_params, label: p }
    }





    // $('#submit_btn').on('click', jqTagify.removeAllTags.bind(jqTagify))
    // $('#submit_btn').on('click', jqTagify_1.removeAllTags.bind(jqTagify_1))
    // $('#submit_btn').on('click', jqTagify_2.removeAllTags.bind(jqTagify_2))

    // $('#btn_note1').click((e) => {
    //     console.log("note_state", array_state_note)
    //         // array_state_note.filter(st => {
    //         //     if (e.terget.parent.attrs.name === st.note_name) {
    //         //         var input_def_note = $('input[name=define_note]').tagify({
    //         //                 whitelist: key_word_list,
    //         //                 maxTags: 10,
    //         //                 transformTag: transformTag,
    //         //                 dropdown: {
    //         //                     maxItems: 20, // <- mixumum allowed rendered suggestions
    //         //                     classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
    //         //                     enabled: 0, // <- show suggestions on focus
    //         //                     closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    //         //                 }
    //         //             })
    //         //             .on('add', function(e, tagName) {})
    //         //             .on("invalid", function(e, tagName) {})
    //         //             .on('input', (e) => {
    //         //                 if (state_reciver == true) {
    //         //                     invalid_empty_def.style.display = "none"
    //         //                 }
    //         //                 console.log(e)
    //         //             })
    //         //         var jqTagify_note = input_def_note.data('tagify');
    //         //         //     var input_def_note = $('input[name=define_note]').tagify({
    //         //         //             // whitelist: key_word_list,
    //         //         //             maxTags: 10,
    //         //         //             transformTag: transformTag,
    //         //         //             dropdown: {
    //         //         //                 maxItems: 20, // <- mixumum allowed rendered suggestions
    //         //         //                 classname: "tags-look", // <- custom classname for this dropdown, so it could be targeted
    //         //         //                 enabled: 0, // <- show suggestions on focus
    //         //         //                 closeOnSelect: false // <- do not hide the suggestions dropdown once an item has been selected
    //         //         //             }
    //         //         //         })
    //         //         //         // new Tagify(input_def_note)
    //         //         //         .on('add', (e, target) => {
    //         //         //             console.log(target)
    //         //         //         })
    //         //     }
    //         // })

    //     // $('#note_def').val(note_state.define)
    //     // input_def.on('add', note_state.define)
    //     // input_params.on('add', note_state.params)
    //     // console.log("object", e.target.parent)
    //     // console.log("object -> ", array_state_note)
    // })

    // btn_param_note.addEventListener('click', (e) => {
    //     input_def.on('input', (e, target) => {
    //             console.log(target)
    //         })
    //         // if (input_def.val() != '') {
    //         //     obj_partner.define = jQuery.parseJSON(input_def.val())
    //         //     obj_partner.define.forEach(def => {
    //         //         if (def.value.includes("=")) {
    //         //             let split_mosavi = def.value.split("=")
    //         //             macro_list.push({
    //         //                 name: split_mosavi[0].trim(),
    //         //                 value: split_mosavi[1].trim()
    //         //             })
    //         //         }
    //         //         console.log("object obj_partner.define > ", macro_list)
    //         //     })
    //         //     obj_partner.define = obj_partner.define.map(function(elem) {
    //         //         return elem.value;
    //         //     }).join(",")

    //     // }
    //     // if (input_def.val() != '') {
    //     //     obj_partner.params = jQuery.parseJSON(input_params.val())
    //     //     obj_partner.params = obj_partner.params.map(function(elem) {
    //     //         return elem.value;
    //     //     }).join(",")
    //     // }
    // })

    partner_counter++
    count++
}

function create(data) {
    const obj_arr = []
    var state = [data];
    state.forEach((i) => {

        // console.log("state ", i.children)
        // if (i.className == 'Layer') {
        //     obj.layer = new Konva.Layer({...i });

        // }
        i.children.forEach((j) => {
                const obj = {}
                switch (j.className) {
                    case "Group":
                        if (j.attrs.name.includes("partner")) {
                            obj.group = new Konva.Group({
                                draggable: true,
                                name: j.attrs.name,
                                x: j.attrs.x,
                                y: j.attrs.y,
                            });

                            j.children.forEach((ch) => {
                                switch (ch.className) {
                                    case "Line":
                                        obj.line = new Konva.Line({...ch });
                                        obj.group.add(obj.line);
                                        break;
                                    case "Rect":
                                        obj.rec = new Konva.Rect({...ch });
                                        obj.group.add(obj.rec);
                                        break;
                                    case "Text":
                                        obj.labelName = new Konva.Text({...ch });
                                        obj.group.add(obj.labelName);
                                        break;
                                }
                            })
                            obj_arr.push(obj)

                        } else if (j.attrs.name.includes("arrow")) {
                            obj.arrow_group = new Konva.Group({
                                draggable: true,
                                name: j.attrs.name,
                                // x: j.attrs.x,
                                // y: j.attrs.y,
                            });

                            j.children.forEach((ch) => {
                                switch (ch.className) {
                                    case "Arrow":
                                        obj.arrow_distance = new Konva.Arrow({...ch });
                                        obj.arrow_group.add(obj.arrow_distance);
                                        break;
                                    case "Text":
                                        obj.lableArrow = new Konva.Text({...ch });
                                        obj.arrow_group.add(obj.lableArrow);
                                        break;
                                }
                            })
                            obj_arr.push(obj)

                        } else {
                            obj.note_group = new Konva.Group({
                                draggable: true,
                                name: j.attrs.name,
                                // x: j.attrs.x,
                                // y: j.attrs.y,
                            });

                            j.children.forEach((ch) => {
                                switch (ch.className) {
                                    case "Rect":
                                        obj.base_node = new Konva.Rect({...ch });
                                        obj.note_group.add(obj.base_node);
                                        break;
                                    case "Text":
                                        obj.text_note = new Konva.Text({...ch });
                                        obj.note_group.add(obj.text_note);
                                        break;
                                }
                            })
                            obj_arr.push(obj)
                        }
                        // obj_arr.push(obj)
                        break;
                    case "Transformer":
                        obj.resize_gr = new Konva.Transformer({...j });
                        obj_arr.push(obj)
                        break;

                }

            })
            // stg.add(layer);
    })
    return obj_arr
}

function import_file() {

    var load_file = new FuncTool()
    var pos = stage.getPointerPosition()
    document.querySelector("#file-input").addEventListener('change', function() {
        // files that user has chosen
        var all_files = this.files;
        if (all_files.length == 0) {
            alert('Error : No file selected');
            return;
        }

        // first file selected by user
        var file = all_files[0];

        // files types allowed
        var allowed_types = ['application/json'];
        if (allowed_types.indexOf(file.type) == -1) {
            alert('Error : Incorrect file type');
            return;
        }

        // Max 5 MB allowed
        var max_size_allowed = 5 * 1024 * 1024
        if (file.size > max_size_allowed) {
            alert('Error : Exceeded size 5MB');
            return;
        }

        var reader = new FileReader();

        // file reading finished successfully
        reader.addEventListener('load', function(e) {
            var text = e.target.result;
            console.log(create(JSON.parse(text)))

            var opened_file_json = create(JSON.parse(text))
            opened_file_json.forEach(create => {
                    partnerEventHandler(create)
                    if (create.group)
                        rect_list.push(create.group)
                        // if(create.)
                    if (create.arrow_distance) {
                        arrow_list.push({ arrow: create.arrow_distance })

                    }
                    if (create.lableArrow) {
                        params_arr.push(create.lableArrow.attrs.text)
                    }


                })
                // console.log(create.arrow_distance)
            console.log(arrow_list)

            // opened_file_json[0].forEach(g => {

            //     })
            // console.log(create(JSON.parse(text), stage))
            // load_file.import_f(text)

            // console.log(text)
            if (text == "") {
                alert('Error :File Is Empty!')
            }
        });

        // file reading failed
        reader.addEventListener('error', function() {
            alert('Error : Failed to read file');
        });

        // read as text file
        reader.readAsText(file);
    });
}


//---------------------------------------------------------------------------------------//


// var arrow_distance = ''
// var simpleText = ''
// var text_note = ''
// var base_node = ''
container.addEventListener('drop', (e) => {
    e.preventDefault()
    stage.setPointersPositions(e)


    var pos = stage.getPointerPosition()
    if (shape_id == 'square') {
        partnerEventHandler(gn_obj(), pos)
            // console.log("pos ", pos)
    }


})


// -------------------------------form params-------------------------------------//

btn_param.addEventListener('click', (e) => {
    var note_state = {}
    var note_obj = not_new()

    if (input_reciver_test.value !== '') {
        // var check_reciver = jQuery.parseJSON(input_reciver.val()).map(function(elem) {
        //     return elem.value;
        // }).join(",")
        console.log("object")

        var check_reciver = JSON.parse(input_params_test.value).map(function(elem) {
            return elem.value;
        }).join(",")

        // check_reciver = check_reciver
        console.log(check_reciver)
        rect_list.forEach(rc => {
                if (rc.children[2].attrs.text === check_reciver) {
                    invalid_empty_rec.style.display = "none"
                        // invalid_empty_def.style.display = "none"
                        // invalid_empty_params.style.display = "none"

                    if (NotEmpty(obj_partner))
                        obj_partner = {}

                    obj_partner.reciver = jQuery.parseJSON(input_params_test.value)
                    obj_partner.reciver = obj_partner.reciver.map(function(elem) {
                        return elem.value;
                    }).join(",")
                    console.log(input_def_test.val())
                    if (input_def_test.val() != '') {
                        obj_partner.define = jQuery.parseJSON(input_def_test.value)
                        obj_partner.define.forEach(def => {
                            if (def.value.includes("=")) {
                                let split_mosavi = def.value.split("=")
                                macro_list.push({
                                    name: split_mosavi[0].trim(),
                                    value: split_mosavi[1].trim()
                                })
                            }
                            // console.log("object obj_partner.define > ", macro_list)
                        })
                        obj_partner.define = obj_partner.define.map(function(elem) {
                            return elem.value;
                        }).join(",")

                    }
                    // if (input_def.val() != '') {
                    //     obj_partner.params = jQuery.parseJSON(input_params.val())
                    //     obj_partner.params = obj_partner.params.map(function(elem) {
                    //         return elem.value;
                    //     }).join(",")
                    // }

                    obj_partner.partnerName = currentGroupName.name
                    obj_partner.sender = currentGroupName.sender


                    send_list.push(obj_partner)
                        // console.log("object => ", send_list)
                        // var defi = jQuery.parseJSON(input_def.val())
                        // console.log(defi)


                    connect_node.from = currentGroupName
                    rect_list.forEach((el) => {
                        if (el.children[2].attrs.text === obj_partner.reciver) {
                            connect_node.to.name = el.attrs.name
                            connect_node.to.getX = el.attrs.x
                            connect_node.to.getY = el.attrs.y
                            connect_node.to.bar = el.children[0].attrs
                        }
                    })

                    connect_node.to.transmitterName = connect_node.from.name
                    connect_node.from.reciverName = connect_node.to.name
                        // connect_node.from.sender = currentGroupName.sender
                    connect_node.to.message = connect_node.from.params
                        // connect_node.from.bar = currentGroupName.bar

                    // console.log(send_list)
                    var distance_partner
                    if (Math.sign(distance_partner)) {
                        distance_partner = connect_node.to.getX - connect_node.from.getX - 50
                    } else {
                        distance_partner = connect_node.to.getX - connect_node.from.getX + 50
                    }

                    function dist_y() {
                        let d
                        if (arrow_list.length === 0) {
                            d = connect_node.from.getY + 30
                        } else {
                            d = arrow_list.slice(-1)[0].arrow.attrs.y + 50
                        }
                        return d
                    }
                    var firstItem = connect_node.from.getY + 20
                    var arrow_group = new Konva.Group({
                        name: "arrow_" + arrow_count,
                        draggable: true,
                    })
                    var arrow_distance = new Konva.Arrow({
                        x: connect_node.from.getX,
                        y: dist_y(),
                        // y: arrow_list.length === 0 ? firstItem : arrow_list.slice(-1)[0].arrow.attrs.y + 50,
                        points: [connect_node.from.bar.points[0], connect_node.from.getY, distance_partner, connect_node.from.getY],
                        // points: [connect_node.from.bar.points[0], connect_node.from.bar.points[1], connect_node.to.bar.points[2], connect_node.to.bar.points[3]],
                        pointerLength: 10,
                        pointerWidth: 10,
                        fill: 'black',
                        stroke: 'black',
                        strokeWidth: 2,
                        // draggable: true, 
                        // id: "arrow_" + arrow_count
                    });




                    // layer.add(arrow_distance)

                    arrow_distance.on("contextmenu", (e) => {
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
                            if (e.target.getClassName() === "Arrow") {
                                e.target.destroy()
                            }
                        })

                    })

                    connect_node.arrow = arrow_distance


                    var lableArrow = new Konva.Text({
                        x: Math.sign(arrow_distance.points()[2]) == 1 ? connect_node.arrow.attrs.x + 100 : connect_node.arrow.attrs.x - 20,
                        // y: connect_node.from.bar.points[0],
                        y: arrow_list.length === 0 ? connect_node.from.getY + 70 : arrow_list.slice(-1)[0].arrow.attrs.y + 40,
                        // text: "hdh",
                        fontSize: 20,
                        fontFamily: 'Calibri',
                        fill: 'green',
                    });

                    // layer.add(lableArrow);
                    arrow_group.add(arrow_distance, lableArrow)

                    layer.add(arrow_group)
                        // if (obj.arrow_group) {
                        //     obj.arrow_group.add(obj.arrow_distance, obj.lableArrow)
                        //     layer.add(obj.arrow_group)
                        // }
                    note_state.note_name = note_obj.note_group.attrs.name
                    note_state.define = input_def_test.value

                    note_state.params = params_to_note_parser(input_params, array_state_note.length)

                    // let tmp_note_state = []
                    // let str_note_param = ''
                    // for (let i = 0; i < note_state.params.length; i++) {
                    //     tmp_note_state.push(" P" + (array_state_note.length - 1).toString() + i.toString())
                    //     str_note_param += " P" + (array_state_note.length - 1).toString() + i.toString() + " = " + note_state.params[i].value + "\n"

                    // }



                    lableArrow.text(note_state.params.label)
                        // lableArrow.text(array_state_note.findIndex(i => i.note_name === note_state.note_name))

                    console.log("state notes => ", array_state_note)

                    let cumputing_x = Math.sign(arrow_distance.points()[2]) == 1 ? connect_node.from.getX - 110 : connect_node.from.getX + 60
                    note_obj.note_group.absolutePosition({
                        x: cumputing_x,
                        y: connect_node.arrow.attrs.y + 10,
                    })


                    // note_obj.text_note.text(obj_partner.define + "\n" + listToString(dict_params).trim("\n"))
                    note_obj.text_note.text(obj_partner.define + "\n" + note_state.params.value.trim("\n"))

                    note_obj.base_node.height(note_obj.text_note.height())

                    note_obj.note_group.add(note_obj.base_node, note_obj.text_note);

                    note_state.note = note_obj.note_group
                    note_state.PartnerReciver = input_reciver_test.value
                    note_state.arrow = arrow_distance
                    note_state.lableArrow = lableArrow
                    array_state_note.push(note_state)
                    console.log(array_state_note)
                        // note_obj.note_group.on('click', (e) => {
                        //     console.log("note ", e)
                        //     opt_note.style.display = 'initial';
                        //     // if (!NotEmpty(obj_group)) {
                        //     opt_note.style.top =
                        //         e.target.parent.attrs.y + 75 + 'px';
                        //     opt_note.style.left =
                        //         e.target.parent.attrs.x + 410 + 'px';
                        //     opt_note.addEventListener('click', () => {
                        //         opt_note.style.display = 'none';
                        //     })
                        //     var index_note = 0
                        //     array_state_note.filter((st, i) => {
                        //             if (st.note_name === e.target.parent.attrs.name) {
                        //                 // console.log("if ======> ", i)
                        //                 input_def_note.val(st.define)
                        //                 input_params_note.val(st.params.key)
                        //                 index_note = i

                    //             }
                    //         })
                    //         // console.log("2 =>", array_state_note)
                    //     $('#submit_btn_note').on('click', () => {

                    //         // let PTNP = params_to_note_parser(input_params_note, index_note)
                    //         console.log("event => ", input_params_note.val())
                    //             // console.log(input_def_note.val())
                    //             // array_state_note.filter((st, idx) => {
                    //             //     if (st.note_name === e.target.parent.attrs.name) {

                    //         // if (input_def_note.val() != '') {
                    //         //     st.define = jQuery.parseJSON(input_def_note.val())
                    //         //     st.define.forEach(def => {
                    //         //         if (def.value.includes("=")) {
                    //         //             let split_mosavi = def.value.split("=")
                    //         //             macro_list.push({
                    //         //                 name: split_mosavi[0].trim(),
                    //         //                 value: split_mosavi[1].trim()
                    //         //             })
                    //         //         }
                    //         //         // console.log("object obj_partner.define > ", macro_list)
                    //         //     })
                    //         //     st.define = input_def_note.val()

                    //         // }


                    //         // ---------------------------------new ---------------------------------------------//
                    //         // var params_arr = []
                    //         var p = []
                    //         var str_params = ''
                    //         if (input_params_note.val().trim() != '') {
                    //             // var length_params = jQuery.parseJSON(input_params_note.val()).length
                    //             // var handle_text_note = input_params.val()
                    //             var handle_text_note = jQuery.parseJSON(input_params_note.val())

                    //             for (var i = 0; i < handle_text_note.length; i++) {
                    //                 // params_arr.push(handle_text_note[i])
                    //                 str_params += " P" + (index_note) + i.toString() + " = " + handle_text_note[i].value + "\n"
                    //                 p.push(" P" + (index_note) + i.toString())
                    //             }
                    //         }
                    //         // ---------------------------------------------------------------------------------//



                    //         // st.define = jQuery.parseJSON(input_def_note.val())
                    //         array_state_note[index_note].params = { key: input_params_note.val(), value: str_params, label: p }
                    //         array_state_note[index_note].define = input_def_note.val()
                    //             // e.target.parent.children[1].attrs.text = jQuery.parseJSON(input_def_note.val()).map(function(elem) {
                    //             //         return elem.value;
                    //             //     }).join(",") + "\n" + st.params.value

                    //         note_obj.text_note.text(jQuery.parseJSON(input_def_note.val()).map(function(elem) {
                    //             return elem.value;
                    //         }).join(",") + "\n" + array_state_note[index_note].params.value)
                    //         note_obj.base_node.height(note_obj.text_note.height())
                    //         lableArrow.text(array_state_note[index_note].params.label)
                    //             // console.log(e.target.parent.children[1].attrs.text)
                    //         opt_note.style.display = 'none';
                    //         $('#note_modal').modal('toggle')

                    //         // }



                    //         // })

                    //         console.log("1 =>", array_state_note)
                    //     })
                    // })

                    layer.add(note_obj.note_group)

                    connect_node.note = note_obj.note_group
                    arrow_list.push(connect_node)
                    arrow_count++
                    console.log(arrow_list)
                    $('#staticBackdrop').modal('toggle')

                    json = obj.group.toJSON()
                    currentGroupName = {}

                } else {
                    invalid_empty_rec.innerHTML = "There is no partner with this name !"
                    invalid_empty_rec.style.display = "block"
                }
            })
            // } else {
            //     invalid_empty_rec.innerHTML = "This field is required !"
            //     invalid_empty_rec.style.display = 'block'
            //         // invalid_empty_def.style.display = 'block'
            //         // invalid_empty_params.style.display = 'block'
            //     state_reciver = true
            //     state_define = true
            //     state_parametrs = true
    }
})

// -------------------------------------------------------------------------------//



// -------------------------------------------------- Wraper -----------------------------------//

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
// ---------------------------------------------------------------------------------------------//



$('#btn_run').click(function() {
    parser_msg_to_partner(send_list)
        // var code = $('#console').val(JSON.stringify(function_array) + "\n" + JSON.stringify(nonce_array));
        // var code = $('#console').val(JSON.stringify(global_partner_list));
        // ------------------------------- پارسر اصلی برای تنظیم مقادیر پارتنرها --------------------------//
    var code = $('#console').val(JSON.stringify(parser_msg_to_partner(send_list)));


    eval(code);
})

delete_shape.addEventListener('click', () => {

        rect_list.filter((fil) => {
            // console.log(target.attrs.id)
            if (fil.attrs.id === target.attrs.id) {
                var index = rect_list.indexOf(fil)
                    // console.log(index)
                rect_list.splice(index, 1)
            }


            // arrow_list.forEach((a) => {
            //     if (fil.attrs.name === a.from.name || fil.attrs.name === a.to.name) {
            //         const idx = arrow_list.indexOf(a)
            //         arrow_list.splice(idx, 1)
            //         arrow_distance.destroy()
            //         note_group.destroy()

            //     }
            // })


            // console.log(fil)

        })
        target.destroy()
        tr_target.destroy()

        // resize_gr.destroy()
        //     // arr_dif.destroy()
        //     // grp_array.destroy()
        // opt.style.display = "none"





        // resize_gr.nodes([])
        // e.target.parent.destroy()
        // console.log(e.target.parent)
        // resize_gr.destroy()

        // e.target.parent.destroy()

        // console.log("11111111111> ", rect_list)
        // arr_dif.destroy()
        // grp_array.destroy()
        // btn_draw_shape.style.display = 'none';
        // // remove shape of rect_list
        // rect_list.filter((fil) => {
        //     if (fil.id === e.target.attrs.id) {
        //         const index = rect_list.indexOf(fil)
        //         rect_list.splice(index, 1)
        //     }

        //     arrow_list.forEach((a) => {
        //         if (fil.attrs.name === a.from.name || fil.attrs.name === a.to.name) {
        //             const idx = arrow_list.indexOf(a)
        //             arrow_list.splice(idx, 1)
        //             arrow_distance.destroy()
        //             note_group.destroy()

        //         }
        //     })

        // })

        // console.log("0000000000> ", rect_list)

    })
    // b.addEventListener('click', (e) => {
    //         console.log(currentGroupName)
    //     })

btn_save = document.getElementById('save');
btn_save.addEventListener('click', (e) => {
        // console.log(array_json)
        // shape_list.forEach(sh => {
        //         console.log(sh)
        //             // array_json.push(sh.toJSON())
        //     })
        var blob = new Blob([layer.toJSON()], {
            type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "sample.json");
        // var s = new FuncTool()
        // s.saveStaticDataToFile(shape_list)
        // this.saveStaticDataToFile(stage)
    })
    //-----------------------------------------------------------------------------
    // var state = [data];
    // var layer = new Konva.Layer();
    // stage.add(layer);

// // create function will destroy previous drawing
// // then it will created required nodes and attach all events
// function create() {
//     layer.destroyChildren();
//     state.forEach((item, index) => {
//         console.log(item)
//         var group = new Konva.Group({
//             draggable: true,
//             name: item.attrs.name,
//         });
//         layer.add(group);

//         item.children.forEach((ch => {
//             switch (ch.className) {
//                 case "Line":
//                     var line = new Konva.Line({...ch });
//                     group.add(line);
//                     break;
//                 case "Rect":
//                     var rect = new Konva.Rect({...ch });
//                     group.add(rect);
//                     break;
//                 case "Text":
//                     var text = new Konva.Text({...ch });
//                     group.add(text);
//                     break;
//             }
//         }))
//     });
// }

// document
//     .querySelector('#create-yoda')
//     .addEventListener('click', function() {
//         create(state);
//     });


stage.on('click', (e) => {
    e.evt.preventDefault();
    if (e.target === stage) {
        console.log("object")
            // console.log(e.target)
            // obj.resize_gr.nodes([]);
            // obj.group.draggable(false)
        btn_draw_shape.style.display = 'none'
        opt.style.display = 'none'
        opt_note.style.display = 'none'
        return;
    }

    if (e.target.parent.getClassName() === "Group") {
        switch (e.target.parent.children[1].className) {
            case "Text":
                array_state_note.filter((fil, index) => {
                    if (fil.note.attrs.name === e.target.parent.attrs.name) {
                        console.log(fil)
                        opt_note.style.display = 'initial'
                        opt_note.style.top =
                            e.target.parent.attrs.y + 75 + 'px';
                        opt_note.style.left =
                            e.target.parent.attrs.x + 410 + 'px';
                        opt_note.addEventListener('click', () => {
                            opt_note.style.display = 'none';
                        })
                        invalid_empty_rec.style.display = "none"
                            // input_reciver.on('add', JSON.parse(fil.PartnerReciver).map((item) => {
                            //     return item.value
                            // }))
                            // input_reciver.on('add', JSON.parse(fil.define).map((item) => {
                            //     return item.value
                            // }))
                            // input_reciver.on('add', JSON.parse(fil.params.key).map((item) => {
                            //     return item.value
                            // }))

                        input_reciver_test.addTags(fil.PartnerReciver)
                        input_def_test.addTags(fil.define)
                        input_params_test.addTags(fil.params.key)
                            // input_def.add(fil.define)
                            // input_params.add(fil.params.key)


                        $('#submit_btn').on('click', (e) => {
                            e.preventDefault()

                            // ---------------------------------new ---------------------------------------------//
                            var p = []
                            let str_params = ""
                            if (input_params_test.val().trim() != '') {
                                var handle_text_note = jQuery.parseJSON(input_params_test.val())
                                for (let i = 0; i < handle_text_note.length; i++) {
                                    str_params += " P" + (index) + i.toString() + " = " + handle_text_note[i].value + "\n"
                                    p.push(" P" + (index) + i.toString())
                                }
                            }
                            // ---------------------------------------------------------------------------------//
                            // array_state_note[index].params = { key: input_params.val(), value: str_params, label: p }
                            // array_state_note[index].define = input_params.val()
                            console.log(input_reciver_test.val())
                            console.log(input_def_test.val())
                            fil.PartnerReciver = input_reciver_test.val()
                            fil.define = input_def_test.val()
                            fil.params = { key: input_params_test.val(), value: str_params, label: p }
                            console.log(array_state_note)
                            opt_note.style.display = 'none';
                            fil.note.children[1].text(fil.params.value)
                            fil.lableArrow.text(fil.params.label)
                            $('#staticBackdrop').modal('toggle')
                            console.log(array_state_note)
                        })


                    }

                })





                // note_obj.note_group.on('click', (e) => {
                //     console.log("note ", e)
                //     opt_note.style.display = 'initial';
                //     // if (!NotEmpty(obj_group)) {
                //     opt_note.style.top =
                //         e.target.parent.attrs.y + 75 + 'px';
                //     opt_note.style.left =
                //         e.target.parent.attrs.x + 410 + 'px';
                //     opt_note.addEventListener('click', () => {
                //         opt_note.style.display = 'none';
                //     })
                //     var index_note = 0
                //     array_state_note.filter((st, i) => {
                //             if (st.note_name === e.target.parent.attrs.name) {
                //                 // console.log("if ======> ", i)
                //                 input_def_note.val(st.define)
                //                 input_params_note.val(st.params.key)
                //                 index_note = i

                //             }
                //         })
                //         // console.log("2 =>", array_state_note)
                //     $('#submit_btn_note').on('click', () => {

                //         // let PTNP = params_to_note_parser(input_params_note, index_note)
                //         console.log("event => ", input_params_note.val())
                //             // console.log(input_def_note.val())
                //             // array_state_note.filter((st, idx) => {
                //             //     if (st.note_name === e.target.parent.attrs.name) {

                //         // if (input_def_note.val() != '') {
                //         //     st.define = jQuery.parseJSON(input_def_note.val())
                //         //     st.define.forEach(def => {
                //         //         if (def.value.includes("=")) {
                //         //             let split_mosavi = def.value.split("=")
                //         //             macro_list.push({
                //         //                 name: split_mosavi[0].trim(),
                //         //                 value: split_mosavi[1].trim()
                //         //             })
                //         //         }
                //         //         // console.log("object obj_partner.define > ", macro_list)
                //         //     })
                //         //     st.define = input_def_note.val()

                //         // }


                //         // ---------------------------------new ---------------------------------------------//
                //         // var params_arr = []
                //         var p = []
                //         var str_params = ''
                //         if (input_params_note.val().trim() != '') {
                //             // var length_params = jQuery.parseJSON(input_params_note.val()).length
                //             // var handle_text_note = input_params.val()
                //             var handle_text_note = jQuery.parseJSON(input_params_note.val())

                //             for (var i = 0; i < handle_text_note.length; i++) {
                //                 // params_arr.push(handle_text_note[i])
                //                 str_params += " P" + (index_note) + i.toString() + " = " + handle_text_note[i].value + "\n"
                //                 p.push(" P" + (index_note) + i.toString())
                //             }
                //         }
                //         // ---------------------------------------------------------------------------------//



                //         // st.define = jQuery.parseJSON(input_def_note.val())
                //         array_state_note[index_note].params = { key: input_params_note.val(), value: str_params, label: p }
                //         array_state_note[index_note].define = input_def_note.val()
                //             // e.target.parent.children[1].attrs.text = jQuery.parseJSON(input_def_note.val()).map(function(elem) {
                //             //         return elem.value;
                //             //     }).join(",") + "\n" + st.params.value

                //         note_obj.text_note.text(jQuery.parseJSON(input_def_note.val()).map(function(elem) {
                //             return elem.value;
                //         }).join(",") + "\n" + array_state_note[index_note].params.value)
                //         note_obj.base_node.height(note_obj.text_note.height())
                //         lableArrow.text(array_state_note[index_note].params.label)
                //             // console.log(e.target.parent.children[1].attrs.text)
                //         opt_note.style.display = 'none';
                //         $('#note_modal').modal('toggle')

                //         // }



                //         // })

                //         console.log("1 =>", array_state_note)
                //     })
                // })
        }

    }

    // if (e.target) {

    // }

    // target = e.target.parent
    // tr_target = obj.resize_gr
    // if (obj.group) {
    //     console.log(obj)
    //         // obj.resize_gr.nodes([e.target.parent]);
    // }
})

// stage.on('click', function(e) {
//     // e.target is a clicked Konva.Shape or current stage if you clicked on empty space
//     // if (e.target.className === "Note")
//     console.log('note', e.target.parent);
//     // console.log(
//     //     'usual click on ' + JSON.stringify(stage.getPointerPosition())
//     // );
// });









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


// var btn_run = document.getElementById('btn_run')

// btn_run.addEventListener('click', () => {
//     console.log("object")
//     document.getElementById('console').value = 'test'
// })



// var function_array = []
// var nonce_array = []
// var tmp_func_content
// var split_array
// var i = 0

// function is_function(str){
//   return str.includes("(") || str.includes(")")
// }

// function func_content(func){
//   var obj_function = {}
//   var function_name
//   var counter = 0
//   var first_parantez = 0
//   var end_parantez = 0
//   for(var i=0;i<func.length; i++){
//     var c = func[i]
//     if(c == "("){
//       if(counter == 0) {
//         function_name = func.slice(0,i).trim()
//         first_parantez = i+1
//       }
//       counter++
//     }
//     if(c == ")"){
//       counter--
//       if(counter == 0) 
//         end_parantez = i
//     }
//   }
//   //return func.substring(first_parantez,end_parantez)
//   var cont = func.substring(first_parantez,end_parantez)
//   obj_function.name = function_name.replace(',','')
//   obj_function.content = splite_content(cont)
//   return obj_function
// }

// function splite_content(content){
//   var split_array = []
//   var split_array_tmp = []
//   var counter = 0
//   var index = 0
//   //var end_parantez = 0
//   for(var i=0;i<content.length; i++){
//     var c = content[i]
//     if(counter == 0 & c == ","){
//       split_array.push(content.substring(index,i))
//       index = i
//     }

//     if(c == "("){
//       counter++
//     }
//     if(c == ")"){
//       counter--
//     }
//   }
//   split_array.push(content.substring(index,content.length))
//   return split_array
// }

// function splite_string(str){

//     // split_array = splite_content(str)

//   // console.log(split_array)
//   str.forEach((sp)=>{
//     // sp = sp.replace(',','')
//     if(is_function(sp)){
//         tmp_func_content = func_content(sp)
//         // function_array[i] = func_content(sp)
//         // i=i+1
//         function_array.push(func_content(sp))
//         // console.log("====> ", i)
//         splite_string(func_content(sp).content)

//     }else{
//       nonce_array.push(sp.replace(',',''))
//     }

//   })

// }
// splite_string(splite_content("f(a,b,h(c)),g(a,b),h(d,n,m(s))"))
// console.log(function_array, "\n"+ nonce_array )