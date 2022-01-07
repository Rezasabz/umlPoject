// var width = document.getElementById('container').offsetWidth;
// var height = document.getElementById('container').offsetHeight;

// var stage = new Konva.Stage({
//     container: "container",
//     width: 3000,
//     height: height
// });
// var layer = new Konva.Layer();


// stage.add(layer)
var first_point = {}
var second_point = {}

var cache_point = {}
    // var line_diff

var shape_list = []
var mac_count = 0
var hash_count = 0
var rand_count = 0
var sign_count = 0
var encryption_count = 0
var decryption_count = 0
var verify_count = 0
var xor_count = 0
var concat_count = 0
var seprator_count = 0
var f_count = 0
const OUTPUT = "outputCircle"
const KEY = "keyCircle"
const PLAIN_TEXT = "plain_textCircle"
const SAMPLE = "sampleCircle"
const S = "sCircle"
const INPUT = "inputCircle"

// var lastLine;

class FuncTool {



    isEmpty(obj) {
        return Object.keys(obj).length === 0;
    }
    NotEmpty(obj) {
        return Object.keys(obj).length !== 0;
    }
    detach_resize(tr, shape) {
        stage.on('click', (e) => {
            // stage.find('Transformer').destroy();
            if (e.target.parent == null) {
                tr.remove()
                shape.draggable(false)
            }
        })
    }
    atach_resize(shape, tr, stage) {
        // stage.find('Transformer').destroy();
        shape.on('click', (e) => {

            if (e.evt.ctrlKey == true) {
                layer.add(tr);
                tr.attachTo(shape)
                shape.draggable(true)
            }

        })
    }

    connect_shapes(group, connect_circ, lineShape, obj, objShape) {
        var js
        var line_diff
        group.on('dragmove', (e) => {

            shape_list.forEach((f) => {
                if (f.name === group.name()) {
                    f.connectors.forEach((conn) => {
                        if (this.NotEmpty(conn)) {
                            if (conn.fromPoint.name === group.name()) {
                                conn.fromPoint.clientX = connect_circ.absolutePosition().x
                                conn.fromPoint.clientY = connect_circ.absolutePosition().y
                            } else {
                                conn.toPoint.clientX = connect_circ.absolutePosition().x
                                conn.toPoint.clientY = connect_circ.absolutePosition().y
                            }
                            conn.line.setPoints([conn.fromPoint.clientX, conn.fromPoint.clientY, conn.toPoint.clientX, conn.toPoint.clientY])
                            layer.draw()
                        }
                    })

                }
            })

        })
        connect_circ.on('mouseenter', (e) => {
            console.log(connect_circ.name())
            stage.container().style.cursor = 'crosshair';

            // obj.output = {
            //     x: e.evt.layerX,
            //     y: e.evt.layerY
            // }
            objShape.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = objShape.output.x
                second_point.clientY = objShape.output.y
                second_point.name = obj.name
                second_point.pointName = connect_circ.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                    // obj.fromPoint = first_point
                    // obj.toPoint = second_point
                objShape.fromPoint = first_point
                objShape.toPoint = second_point
                objShape.name = second_point.pointName


            }
        })

        connect_circ.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape == null) {
                    lineShape = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    // obj.output = {
                    //     x: e.evt.layerX,
                    //     y: e.evt.layerY
                    // }
                    objShape.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = objShape.output.x
                        first_point.clientY = objShape.output.y
                        first_point.name = obj.name
                        first_point.pointName = connect_circ.name()
                            // obj.fromPoint = first_point
                            // obj.toPoint = second_point
                        objShape.fromPoint = first_point
                        objShape.toPoint = second_point
                            // objShape.name = connect_circ.name()
                    }
                } else {
                    console.log("else")
                    lineShape = null
                }
                connect_circ.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape != null) {
                    const pos = stage.getPointerPosition();
                    lineShape.setPoints([lineShape.points()[0], lineShape.points()[1], pos.x, pos.y]);
                    layer.add(lineShape)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape != null) {
                    lineShape.destroy();
                    lineShape = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })

                    shape_list.forEach(sh => {
                        // sh.line.push(line_diff)
                        sh.connectors.forEach(conn => {
                            console.log(conn)
                            if (this.NotEmpty(conn) && conn.fromPoint.pointName == connect_circ.name())
                                conn.line = line_diff
                        })

                    })

                    layer.add(line_diff)
                    console.log("shapes 1", shape_list)
                        // obj.fromPoint = first_point
                        // obj.toPoint = second_point
                    objShape.fromPoint = first_point
                    objShape.toPoint = second_point
                    objShape.name = connect_circ.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                    // js = group.toJSON()
                    var json = stage.toJSON()
                        // var json = JSON.stringify(shape_list)


                    console.log("OBJ => ", obj)
                    console.log("shapes 2", json)
                        // console.log("array", array_points[0])
                        // console.log(group.toJSON())
                }
            });
            layer.draw();

        })
        connect_circ.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
    }

    connect_shapes_3Point(group, lineShape, lineShape_key, lineShape_plain_text, obj, obj_output, obj_key, obj_plainText, outputCircle, keyCircle, plain_textCircle, line_diff) {
        outputCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_output.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_output.output.x
                second_point.clientY = obj_output.output.y
                second_point.name = obj.name
                second_point.pointName = outputCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_output.fromPoint = first_point
                obj_output.toPoint = second_point
                obj_output.name = second_point.pointName
            }

        })
        outputCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape == null) {
                    lineShape = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_output.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_output.output.x
                        first_point.clientY = obj_output.output.y
                        first_point.name = obj.name
                        first_point.pointName = outputCircle.name()
                        obj_output.fromPoint = first_point
                        obj_output.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape = null
                }
                outputCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape != null) {
                    const pos = stage.getPointerPosition();
                    lineShape.setPoints([lineShape.points()[0], lineShape.points()[1], pos.x, pos.y]);
                    layer.add(lineShape)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape != null) {
                    lineShape.destroy();
                    lineShape = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })

                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == outputCircle.name())
                                conn.line = line_diff
                        })

                    })

                    layer.add(line_diff)
                    obj_output.fromPoint = first_point
                    obj_output.toPoint = second_point
                    obj_output.name = outputCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        group.on('dragmove', (e) => {

            shape_list.forEach((f) => {
                if (f.name === group.name()) {
                    f.connectors.forEach((conn) => {
                        if (this.NotEmpty(conn)) {
                            if (conn.fromPoint.name === group.name()) {
                                if (conn.fromPoint.pointName === OUTPUT) {
                                    conn.fromPoint.clientX = outputCircle.absolutePosition().x
                                    conn.fromPoint.clientY = outputCircle.absolutePosition().y
                                } else if (conn.fromPoint.pointName === KEY) {
                                    conn.fromPoint.clientX = keyCircle.absolutePosition().x
                                    conn.fromPoint.clientY = keyCircle.absolutePosition().y
                                } else {
                                    conn.fromPoint.clientX = plain_textCircle.absolutePosition().x
                                    conn.fromPoint.clientY = plain_textCircle.absolutePosition().y
                                }

                            } else {
                                if (conn.toPoint.pointName === OUTPUT) {
                                    conn.toPoint.clientX = outputCircle.absolutePosition().x
                                    conn.toPoint.clientY = outputCircle.absolutePosition().y
                                } else if (conn.toPoint.pointName === KEY) {
                                    conn.toPoint.clientX = keyCircle.absolutePosition().x
                                    conn.toPoint.clientY = keyCircle.absolutePosition().y
                                } else {
                                    conn.toPoint.clientX = plain_textCircle.absolutePosition().x
                                    conn.toPoint.clientY = plain_textCircle.absolutePosition().y
                                }

                            }
                            conn.line.setPoints([conn.fromPoint.clientX, conn.fromPoint.clientY, conn.toPoint.clientX, conn.toPoint.clientY])
                            layer.draw()
                        }
                    })

                }
            })

        })
        outputCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
        keyCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_key.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_key.output.x
                second_point.clientY = obj_key.output.y
                second_point.name = obj.name
                second_point.pointName = keyCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_key.fromPoint = first_point
                obj_key.toPoint = second_point
                obj_key.name = second_point.pointName
            }
        })
        keyCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape_key == null) {
                    lineShape_key = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_key.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_key.output.x
                        first_point.clientY = obj_key.output.y
                        first_point.name = obj.name
                        first_point.pointName = keyCircle.name()
                        obj_key.fromPoint = first_point
                        obj_key.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape_key = null
                }
                keyCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape_key != null) {
                    const pos = stage.getPointerPosition();
                    lineShape_key.setPoints([lineShape_key.points()[0], lineShape_key.points()[1], pos.x, pos.y]);
                    layer.add(lineShape_key)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape_key != null) {
                    lineShape_key.destroy();
                    lineShape_key = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })


                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            //         // console.log(conn)
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == keyCircle.name())
                                conn.line = line_diff
                        })
                    })


                    console.log("1 ", line_diff)
                    layer.add(line_diff)
                        // line_diff = null
                    console.log("2 ", line_diff)
                    obj_key.fromPoint = first_point
                    obj_key.toPoint = second_point
                    obj_key.name = keyCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        keyCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
        plain_textCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_plainText.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_plainText.output.x
                second_point.clientY = obj_plainText.output.y
                second_point.name = obj.name
                second_point.pointName = plain_textCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_plainText.fromPoint = first_point
                obj_plainText.toPoint = second_point
                obj_plainText.name = second_point.pointName
            }
        })
        plain_textCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape_plain_text == null) {
                    lineShape_plain_text = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_plainText.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_plainText.output.x
                        first_point.clientY = obj_plainText.output.y
                        first_point.name = obj.name
                        first_point.pointName = plain_textCircle.name()
                        obj_plainText.fromPoint = first_point
                        obj_plainText.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape_plain_text = null
                }
                plain_textCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape_plain_text != null) {
                    const pos = stage.getPointerPosition();
                    lineShape_plain_text.setPoints([lineShape_plain_text.points()[0], lineShape_plain_text.points()[1], pos.x, pos.y]);
                    layer.add(lineShape_plain_text)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape_plain_text != null) {
                    lineShape_plain_text.destroy();
                    lineShape_plain_text = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })


                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == plain_textCircle.name())
                                conn.line = line_diff
                        })
                    })

                    layer.add(line_diff)
                    obj_plainText.fromPoint = first_point
                    obj_plainText.toPoint = second_point
                    obj_plainText.name = plain_textCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        plain_textCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
    }
    connect_shapes_4Point(group, lineShape, lineShape_key, lineShape_plain_text, lineShape_s, obj, obj_output, obj_key, obj_plainText, obj_s, outputCircle, keyCircle, plain_textCircle, sCircle, line_diff) {
        outputCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_output.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_output.output.x
                second_point.clientY = obj_output.output.y
                second_point.name = obj.name
                second_point.pointName = outputCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_output.fromPoint = first_point
                obj_output.toPoint = second_point
                obj_output.name = second_point.pointName
            }

        })
        outputCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape == null) {
                    lineShape = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_output.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_output.output.x
                        first_point.clientY = obj_output.output.y
                        first_point.name = obj.name
                        first_point.pointName = outputCircle.name()
                        obj_output.fromPoint = first_point
                        obj_output.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape = null
                }
                outputCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape != null) {
                    const pos = stage.getPointerPosition();
                    lineShape.setPoints([lineShape.points()[0], lineShape.points()[1], pos.x, pos.y]);
                    layer.add(lineShape)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape != null) {
                    lineShape.destroy();
                    lineShape = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })

                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == outputCircle.name())
                                conn.line = line_diff
                        })

                    })

                    layer.add(line_diff)
                    obj_output.fromPoint = first_point
                    obj_output.toPoint = second_point
                    obj_output.name = outputCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        group.on('dragmove', (e) => {

            shape_list.forEach((f) => {
                if (f.name === group.name()) {
                    f.connectors.forEach((conn) => {
                        if (this.NotEmpty(conn)) {
                            if (conn.fromPoint.name === group.name()) {
                                if (conn.fromPoint.pointName === OUTPUT) {
                                    conn.fromPoint.clientX = outputCircle.absolutePosition().x
                                    conn.fromPoint.clientY = outputCircle.absolutePosition().y
                                } else if (conn.fromPoint.pointName === KEY) {
                                    conn.fromPoint.clientX = keyCircle.absolutePosition().x
                                    conn.fromPoint.clientY = keyCircle.absolutePosition().y
                                } else if (conn.fromPoint.pointName === INPUT) {
                                    conn.fromPoint.clientX = outputCircle.absolutePosition().x
                                    conn.fromPoint.clientY = outputCircle.absolutePosition().y
                                } else if (conn.fromPoint.pointName === S) {
                                    conn.fromPoint.clientX = sCircle.absolutePosition().x
                                    conn.fromPoint.clientY = sCircle.absolutePosition().y
                                } else {
                                    conn.fromPoint.clientX = plain_textCircle.absolutePosition().x
                                    conn.fromPoint.clientY = plain_textCircle.absolutePosition().y
                                }

                            } else {
                                if (conn.toPoint.pointName === OUTPUT) {
                                    conn.toPoint.clientX = outputCircle.absolutePosition().x
                                    conn.toPoint.clientY = outputCircle.absolutePosition().y
                                } else if (conn.toPoint.pointName === KEY) {
                                    conn.toPoint.clientX = keyCircle.absolutePosition().x
                                    conn.toPoint.clientY = keyCircle.absolutePosition().y

                                } else if (conn.toPoint.pointName === INPUT) {
                                    conn.toPoint.clientX = outputCircle.absolutePosition().x
                                    conn.toPoint.clientY = outputCircle.absolutePosition().y
                                } else if (conn.toPoint.pointName === S) {
                                    conn.toPoint.clientX = sCircle.absolutePosition().x
                                    conn.toPoint.clientY = sCircle.absolutePosition().y
                                } else {
                                    conn.toPoint.clientX = plain_textCircle.absolutePosition().x
                                    conn.toPoint.clientY = plain_textCircle.absolutePosition().y
                                }

                            }
                            conn.line.setPoints([conn.fromPoint.clientX, conn.fromPoint.clientY, conn.toPoint.clientX, conn.toPoint.clientY])
                            layer.draw()
                        }
                    })

                }
            })

        })
        outputCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
        keyCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_key.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_key.output.x
                second_point.clientY = obj_key.output.y
                second_point.name = obj.name
                second_point.pointName = keyCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_key.fromPoint = first_point
                obj_key.toPoint = second_point
                obj_key.name = second_point.pointName
            }
        })
        keyCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape_key == null) {
                    lineShape_key = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_key.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_key.output.x
                        first_point.clientY = obj_key.output.y
                        first_point.name = obj.name
                        first_point.pointName = keyCircle.name()
                        obj_key.fromPoint = first_point
                        obj_key.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape_key = null
                }
                keyCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape_key != null) {
                    const pos = stage.getPointerPosition();
                    lineShape_key.setPoints([lineShape_key.points()[0], lineShape_key.points()[1], pos.x, pos.y]);
                    layer.add(lineShape_key)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape_key != null) {
                    lineShape_key.destroy();
                    lineShape_key = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })


                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            //         // console.log(conn)
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == keyCircle.name())
                                conn.line = line_diff
                        })
                    })


                    console.log("1 ", line_diff)
                    layer.add(line_diff)
                        // line_diff = null
                    console.log("2 ", line_diff)
                    obj_key.fromPoint = first_point
                    obj_key.toPoint = second_point
                    obj_key.name = keyCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        keyCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
        plain_textCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_plainText.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_plainText.output.x
                second_point.clientY = obj_plainText.output.y
                second_point.name = obj.name
                second_point.pointName = plain_textCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_plainText.fromPoint = first_point
                obj_plainText.toPoint = second_point
                obj_plainText.name = second_point.pointName
            }
        })
        plain_textCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape_plain_text == null) {
                    lineShape_plain_text = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_plainText.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_plainText.output.x
                        first_point.clientY = obj_plainText.output.y
                        first_point.name = obj.name
                        first_point.pointName = plain_textCircle.name()
                        obj_plainText.fromPoint = first_point
                        obj_plainText.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape_plain_text = null
                }
                plain_textCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape_plain_text != null) {
                    const pos = stage.getPointerPosition();
                    lineShape_plain_text.setPoints([lineShape_plain_text.points()[0], lineShape_plain_text.points()[1], pos.x, pos.y]);
                    layer.add(lineShape_plain_text)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape_plain_text != null) {
                    lineShape_plain_text.destroy();
                    lineShape_plain_text = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })


                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == plain_textCircle.name())
                                conn.line = line_diff
                        })
                    })

                    layer.add(line_diff)
                    obj_plainText.fromPoint = first_point
                    obj_plainText.toPoint = second_point
                    obj_plainText.name = plain_textCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        plain_textCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
        sCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_s.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_s.output.x
                second_point.clientY = obj_s.output.y
                second_point.name = obj.name
                second_point.pointName = sCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_s.fromPoint = first_point
                obj_s.toPoint = second_point
                obj_s.name = second_point.pointName
            }
        })
        sCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape_s == null) {
                    lineShape_s = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_s.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_s.output.x
                        first_point.clientY = obj_s.output.y
                        first_point.name = obj.name
                        first_point.pointName = sCircle.name()
                        obj_s.fromPoint = first_point
                        obj_s.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape_plain_text = null
                }
                sCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape_s != null) {
                    const pos = stage.getPointerPosition();
                    lineShape_s.setPoints([lineShape_s.points()[0], lineShape_s.points()[1], pos.x, pos.y]);
                    layer.add(lineShape_s)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape_s != null) {
                    lineShape_s.destroy();
                    lineShape_s = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })


                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == sCircle.name())
                                conn.line = line_diff
                        })
                    })

                    layer.add(line_diff)
                    obj_s.fromPoint = first_point
                    obj_s.toPoint = second_point
                    obj_s.name = sCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        sCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
    }
    connect_shapes_5Point(group, lineShape, lineShape_key, lineShape_plain_text, lineShape_s, lineShape_sample, obj, obj_output, obj_key, obj_plainText, obj_s, obj_sample, outputCircle, keyCircle, plain_textCircle, sCircle, sampleCircle, line_diff) {
        outputCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_output.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_output.output.x
                second_point.clientY = obj_output.output.y
                second_point.name = obj.name
                second_point.pointName = outputCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_output.fromPoint = first_point
                obj_output.toPoint = second_point
                obj_output.name = second_point.pointName
            }

        })
        outputCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape == null) {
                    lineShape = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_output.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_output.output.x
                        first_point.clientY = obj_output.output.y
                        first_point.name = obj.name
                        first_point.pointName = outputCircle.name()
                        obj_output.fromPoint = first_point
                        obj_output.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape = null
                }
                outputCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape != null) {
                    const pos = stage.getPointerPosition();
                    lineShape.setPoints([lineShape.points()[0], lineShape.points()[1], pos.x, pos.y]);
                    layer.add(lineShape)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape != null) {
                    lineShape.destroy();
                    lineShape = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })

                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == outputCircle.name())
                                conn.line = line_diff
                        })

                    })

                    layer.add(line_diff)
                    obj_output.fromPoint = first_point
                    obj_output.toPoint = second_point
                    obj_output.name = outputCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        group.on('dragmove', (e) => {

            shape_list.forEach((f) => {
                if (f.name === group.name()) {
                    f.connectors.forEach((conn) => {
                        if (this.NotEmpty(conn)) {
                            if (conn.fromPoint.name === group.name()) {
                                if (conn.fromPoint.pointName === OUTPUT) {
                                    conn.fromPoint.clientX = outputCircle.absolutePosition().x
                                    conn.fromPoint.clientY = outputCircle.absolutePosition().y
                                } else if (conn.fromPoint.pointName === KEY) {
                                    conn.fromPoint.clientX = keyCircle.absolutePosition().x
                                    conn.fromPoint.clientY = keyCircle.absolutePosition().y
                                } else if (conn.fromPoint.pointName === INPUT) {
                                    conn.fromPoint.clientX = outputCircle.absolutePosition().x
                                    conn.fromPoint.clientY = outputCircle.absolutePosition().y
                                } else if (conn.fromPoint.pointName === S) {
                                    conn.fromPoint.clientX = sCircle.absolutePosition().x
                                    conn.fromPoint.clientY = sCircle.absolutePosition().y
                                } else {
                                    conn.fromPoint.clientX = plain_textCircle.absolutePosition().x
                                    conn.fromPoint.clientY = plain_textCircle.absolutePosition().y
                                }

                            } else {
                                if (conn.toPoint.pointName === OUTPUT) {
                                    conn.toPoint.clientX = outputCircle.absolutePosition().x
                                    conn.toPoint.clientY = outputCircle.absolutePosition().y
                                } else if (conn.toPoint.pointName === KEY) {
                                    conn.toPoint.clientX = keyCircle.absolutePosition().x
                                    conn.toPoint.clientY = keyCircle.absolutePosition().y

                                } else if (conn.toPoint.pointName === INPUT) {
                                    conn.toPoint.clientX = outputCircle.absolutePosition().x
                                    conn.toPoint.clientY = outputCircle.absolutePosition().y
                                } else if (conn.toPoint.pointName === S) {
                                    conn.toPoint.clientX = sCircle.absolutePosition().x
                                    conn.toPoint.clientY = sCircle.absolutePosition().y
                                } else {
                                    conn.toPoint.clientX = plain_textCircle.absolutePosition().x
                                    conn.toPoint.clientY = plain_textCircle.absolutePosition().y
                                }

                            }
                            conn.line.setPoints([conn.fromPoint.clientX, conn.fromPoint.clientY, conn.toPoint.clientX, conn.toPoint.clientY])
                            layer.draw()
                        }
                    })

                }
            })

        })
        outputCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
        keyCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_key.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_key.output.x
                second_point.clientY = obj_key.output.y
                second_point.name = obj.name
                second_point.pointName = keyCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_key.fromPoint = first_point
                obj_key.toPoint = second_point
                obj_key.name = second_point.pointName
            }
        })
        keyCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape_key == null) {
                    lineShape_key = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_key.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_key.output.x
                        first_point.clientY = obj_key.output.y
                        first_point.name = obj.name
                        first_point.pointName = keyCircle.name()
                        obj_key.fromPoint = first_point
                        obj_key.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape_key = null
                }
                keyCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape_key != null) {
                    const pos = stage.getPointerPosition();
                    lineShape_key.setPoints([lineShape_key.points()[0], lineShape_key.points()[1], pos.x, pos.y]);
                    layer.add(lineShape_key)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape_key != null) {
                    lineShape_key.destroy();
                    lineShape_key = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })


                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            //         // console.log(conn)
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == keyCircle.name())
                                conn.line = line_diff
                        })
                    })


                    console.log("1 ", line_diff)
                    layer.add(line_diff)
                        // line_diff = null
                    console.log("2 ", line_diff)
                    obj_key.fromPoint = first_point
                    obj_key.toPoint = second_point
                    obj_key.name = keyCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        keyCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
        plain_textCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_plainText.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_plainText.output.x
                second_point.clientY = obj_plainText.output.y
                second_point.name = obj.name
                second_point.pointName = plain_textCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_plainText.fromPoint = first_point
                obj_plainText.toPoint = second_point
                obj_plainText.name = second_point.pointName
            }
        })
        plain_textCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape_plain_text == null) {
                    lineShape_plain_text = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_plainText.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_plainText.output.x
                        first_point.clientY = obj_plainText.output.y
                        first_point.name = obj.name
                        first_point.pointName = plain_textCircle.name()
                        obj_plainText.fromPoint = first_point
                        obj_plainText.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape_plain_text = null
                }
                plain_textCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape_plain_text != null) {
                    const pos = stage.getPointerPosition();
                    lineShape_plain_text.setPoints([lineShape_plain_text.points()[0], lineShape_plain_text.points()[1], pos.x, pos.y]);
                    layer.add(lineShape_plain_text)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape_plain_text != null) {
                    lineShape_plain_text.destroy();
                    lineShape_plain_text = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })


                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == plain_textCircle.name())
                                conn.line = line_diff
                        })
                    })

                    layer.add(line_diff)
                    obj_plainText.fromPoint = first_point
                    obj_plainText.toPoint = second_point
                    obj_plainText.name = plain_textCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        plain_textCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
        sCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_s.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_s.output.x
                second_point.clientY = obj_s.output.y
                second_point.name = obj.name
                second_point.pointName = sCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_s.fromPoint = first_point
                obj_s.toPoint = second_point
                obj_s.name = second_point.pointName
            }
        })
        sCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape_s == null) {
                    lineShape_s = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_s.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_s.output.x
                        first_point.clientY = obj_s.output.y
                        first_point.name = obj.name
                        first_point.pointName = sCircle.name()
                        obj_s.fromPoint = first_point
                        obj_s.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape_plain_text = null
                }
                sCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape_s != null) {
                    const pos = stage.getPointerPosition();
                    lineShape_s.setPoints([lineShape_s.points()[0], lineShape_s.points()[1], pos.x, pos.y]);
                    layer.add(lineShape_s)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape_s != null) {
                    lineShape_s.destroy();
                    lineShape_s = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })


                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == sCircle.name())
                                conn.line = line_diff
                        })
                    })

                    layer.add(line_diff)
                    obj_s.fromPoint = first_point
                    obj_s.toPoint = second_point
                    obj_s.name = sCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        sCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
        sampleCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_sample.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_sample.output.x
                second_point.clientY = obj_sample.output.y
                second_point.name = obj.name
                second_point.pointName = sampleCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_sample.fromPoint = first_point
                obj_sample.toPoint = second_point
                obj_sample.name = second_point.pointName
            }
        })
        sampleCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape_sample == null) {
                    lineShape_sample = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_sample.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_sample.output.x
                        first_point.clientY = obj_sample.output.y
                        first_point.name = obj.name
                        first_point.pointName = sampleCircle.name()
                        obj_sample.fromPoint = first_point
                        obj_sample.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape_plain_text = null
                }
                sampleCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape_sample != null) {
                    const pos = stage.getPointerPosition();
                    lineShape_sample.setPoints([lineShape_sample.points()[0], lineShape_sample.points()[1], pos.x, pos.y]);
                    layer.add(lineShape_sample)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape_sample != null) {
                    lineShape_sample.destroy();
                    lineShape_sample = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })


                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == sampleCircle.name())
                                conn.line = line_diff
                        })
                    })

                    layer.add(line_diff)
                    obj_sample.fromPoint = first_point
                    obj_sample.toPoint = second_point
                    obj_sample.name = sampleCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        sampleCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
    }



    hash_function(x, y, layer, stage) {


        var obj = {}
        var obj_input = {}
        var obj_output = {}

        var group = new Konva.Group({
            x: x - 60,
            y: y - 20,
            rotation: 0,
            draggable: false,
        });

        var input = new Konva.Line({
            points: [103, -40, 103, 20],
            stroke: 'black',
            strokeWidth: 2,
        });
        var inputCircle = new Konva.Circle({
            x: 103,
            y: -40,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "inputCircle"
        });
        var output = new Konva.Line({
            points: [103, 130, 103, 75],
            stroke: 'black',
            strokeWidth: 2,
        });
        var outputCircle = new Konva.Circle({
            x: 103,
            y: 130,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "outputCircle"
        });


        var poly = new Konva.Line({
            points: [50, 20, 150, 20, 130, 75, 75, 75],
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 1,
            closed: true,
        });
        var label = new Konva.Label({
            x: 82,
            y: 32,
            opacity: 0.75,
        });

        label.add(
            new Konva.Text({
                text: 'HASH',
                fontFamily: 'Calibri',
                fontSize: 14,
                padding: 5,
                fill: 'black',
            })
        );

        let lineInput = null
        let lineShape = null;
        var line_diff


        outputCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_output.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_output.output.x
                second_point.clientY = obj_output.output.y
                second_point.name = obj.name
                second_point.pointName = outputCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_output.fromPoint = first_point
                obj_output.toPoint = second_point
                obj_output.name = second_point.pointName
            }

        })
        outputCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape == null) {
                    lineShape = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_output.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_output.output.x
                        first_point.clientY = obj_output.output.y
                        first_point.name = obj.name
                        first_point.pointName = outputCircle.name()
                        obj_output.fromPoint = first_point
                        obj_output.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape = null
                }
                outputCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape != null) {
                    const pos = stage.getPointerPosition();
                    lineShape.setPoints([lineShape.points()[0], lineShape.points()[1], pos.x, pos.y]);
                    layer.add(lineShape)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape != null) {
                    lineShape.destroy();
                    lineShape = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })

                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == outputCircle.name())
                                conn.line = line_diff
                        })

                    })

                    layer.add(line_diff)
                    obj_output.fromPoint = first_point
                    obj_output.toPoint = second_point
                    obj_output.name = outputCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        group.on('dragmove', (e) => {

            shape_list.forEach((f) => {
                if (f.name === group.name()) {
                    f.connectors.forEach((conn) => {
                        if (this.NotEmpty(conn)) {
                            if (conn.fromPoint.name === group.name()) {
                                if (conn.fromPoint.pointName === OUTPUT) {
                                    conn.fromPoint.clientX = outputCircle.absolutePosition().x
                                    conn.fromPoint.clientY = outputCircle.absolutePosition().y
                                } else {
                                    conn.fromPoint.clientX = inputCircle.absolutePosition().x
                                    conn.fromPoint.clientY = inputCircle.absolutePosition().y
                                }

                            } else {
                                if (conn.toPoint.pointName === OUTPUT) {
                                    conn.toPoint.clientX = outputCircle.absolutePosition().x
                                    conn.toPoint.clientY = outputCircle.absolutePosition().y
                                } else {
                                    conn.toPoint.clientX = inputCircle.absolutePosition().x
                                    conn.toPoint.clientY = inputCircle.absolutePosition().y
                                }

                            }
                            conn.line.setPoints([conn.fromPoint.clientX, conn.fromPoint.clientY, conn.toPoint.clientX, conn.toPoint.clientY])
                            layer.draw()
                        }
                    })

                }
            })

        })
        outputCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
        inputCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_input.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_input.output.x
                second_point.clientY = obj_input.output.y
                second_point.name = obj.name
                second_point.pointName = inputCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_input.fromPoint = first_point
                obj_input.toPoint = second_point
                obj_input.name = second_point.pointName
            }
        })
        inputCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineInput == null) {
                    lineInput = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_input.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_input.output.x
                        first_point.clientY = obj_input.output.y
                        first_point.name = obj.name
                        first_point.pointName = inputCircle.name()
                        obj_input.fromPoint = first_point
                        obj_input.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineInput = null
                }
                inputCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineInput != null) {
                    const pos = stage.getPointerPosition();
                    lineInput.setPoints([lineInput.points()[0], lineInput.points()[1], pos.x, pos.y]);
                    layer.add(lineInput)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineInput != null) {
                    lineInput.destroy();
                    lineInput = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })


                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            //         // console.log(conn)
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == inputCircle.name())
                                conn.line = line_diff
                        })
                    })


                    console.log("1 ", line_diff)
                    layer.add(line_diff)
                        // line_diff = null
                    console.log("2 ", line_diff)
                    obj_input.fromPoint = first_point
                    obj_input.toPoint = second_point
                    obj_input.name = inputCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        inputCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });



        // this.connect_shapes(group, linCircle, lineC, obj, obj_input)
        // this.connect_shapes(group, outputCircle, lineShape, obj, obj_output)

        group.add(poly, input, output, label, inputCircle, outputCircle)
        layer.add(group);
        stage.add(layer);

        obj.name = 'hash_' + hash_count
        group.name('hash_' + hash_count)
        hash_count++
        obj.position = group.getAbsolutePosition()
        obj.connectors = []
        obj.connectors.push(obj_output, obj_input)
        shape_list.push(obj)
        console.log(shape_list)

        var tr = new Konva.Transformer({
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
        });
        this.detach_resize(tr, group)
        this.atach_resize(group, tr, stage)
        layer.draw();

    }
    mac_function(x, y, layer, stage) {



        var obj = {}
        var obj_plainText = {}
        var obj_key = {}
        var obj_output = {}
            // var arr_elements = []

        var group = new Konva.Group({
            x: x - 60,
            y: y - 20,
            rotation: 0,
            draggable: false,
        });

        var lin = new Konva.Line({
            points: [130, -40, 130, 20],
            stroke: 'black',
            strokeWidth: 2,
        });
        var keyCircle = new Konva.Circle({
            x: 130,
            y: -40,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: KEY
        });
        var plain_text = new Konva.Line({
            points: [70, -40, 70, 20],
            stroke: 'black',
            strokeWidth: 2,
        });
        var plain_textCircle = new Konva.Circle({
            x: 70,
            y: -40,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: PLAIN_TEXT
        });
        var output = new Konva.Line({
            points: [103, 130, 103, 75],
            stroke: 'black',
            strokeWidth: 2,
        });
        var outputCircle = new Konva.Circle({
            x: 103,
            y: 130,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: OUTPUT
        });


        var poly = new Konva.Line({
            points: [50, 20, 150, 20, 130, 75, 75, 75],
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 1,
            closed: true,
        });
        var label = new Konva.Label({
            x: 82,
            y: 32,
            opacity: 0.75,
        });

        label.add(
            new Konva.Text({
                text: 'MAC',
                fontFamily: 'Calibri',
                fontSize: 14,
                padding: 5,
                fill: 'black',
            })
        );

        let lineShape = null;
        let lineShape_key = null;
        let lineShape_plain_text = null;
        var line_diff


        this.connect_shapes_3Point(group, lineShape, lineShape_key, lineShape_plain_text, obj, obj_output, obj_key, obj_plainText, outputCircle, keyCircle, plain_textCircle, line_diff)
        group.add(poly, lin, plain_text, output, label, keyCircle, plain_textCircle, outputCircle)
        layer.add(group);
        stage.add(layer);

        obj.name = 'mac_' + mac_count
        group.name('mac_' + mac_count)
        mac_count++
        obj.position = group.getAbsolutePosition()
        obj.connectors = []
            // obj.connectors.line = {}
        obj.connectors.push(obj_output, obj_key, obj_plainText)
            // obj.line = []
        shape_list.push(obj)
        console.log(shape_list)


        var tr = new Konva.Transformer({
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
        });
        this.detach_resize(tr, group)
        this.atach_resize(group, tr, stage)
        layer.draw();
    }
    sign_function(x, y, layer, stage) {
        var obj = {}
        var obj_plainText = {}
        var obj_key = {}
        var obj_output = {}
        var group = new Konva.Group({
            x: x - 60,
            y: y - 20,
            rotation: 0,
            draggable: false,
        });

        var lin = new Konva.Line({
            points: [130, -40, 130, 20],
            stroke: 'black',
            strokeWidth: 2,
        });
        var keyCircle = new Konva.Circle({
            x: 130,
            y: -40,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "keyCircle"
        });
        var plain_text = new Konva.Line({
            points: [70, -40, 70, 20],
            stroke: 'black',
            strokeWidth: 2,
        });
        var plain_textCircle = new Konva.Circle({
            x: 70,
            y: -40,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "plain_textCircle"
        });
        var output = new Konva.Line({
            points: [103, 130, 103, 75],
            stroke: 'black',
            strokeWidth: 2,
        });
        var outputCircle = new Konva.Circle({
            x: 103,
            y: 130,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "outputCircle"
        });

        var poly = new Konva.Line({
            points: [50, 20, 150, 20, 130, 75, 75, 75],
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 2,
            closed: true,
        });
        var label = new Konva.Label({
            x: 82,
            y: 32,
            opacity: 0.75,
        });

        label.add(
            new Konva.Text({
                text: 'SIGN',
                fontFamily: 'Calibri',
                fontSize: 14,
                padding: 5,
                fill: 'black',
            })
        );


        let lineShape = null;
        let lineShape_key = null;
        let lineShape_plain_text = null;
        var line_diff

        this.connect_shapes_3Point(group, lineShape, lineShape_key, lineShape_plain_text, obj, obj_output, obj_key, obj_plainText, outputCircle, keyCircle, plain_textCircle, line_diff)

        group.add(poly, lin, plain_text, output, label, keyCircle, plain_textCircle, outputCircle)
        layer.add(group);
        stage.add(layer);

        obj.name = 'sign_' + sign_count
        group.name('sign_' + sign_count)
        sign_count++
        obj.position = group.getAbsolutePosition()
        obj.connectors = []
        obj.connectors.push(obj_output, obj_key, obj_plainText)
        shape_list.push(obj)


        var tr = new Konva.Transformer({
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
        });
        this.detach_resize(tr, group)
        this.atach_resize(group, tr)
        layer.draw();
    }
    encryption_function(x, y, layer, stage) {
        var obj = {}
        var obj_plainText = {}
        var obj_key = {}
        var obj_output = {}
        var group = new Konva.Group({
            x: x - 60,
            y: y - 20,
            rotation: 0,
            draggable: false,
        });

        var rect1 = new Konva.Rect({
            width: 100,
            height: 50,
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 1,
        });


        var lin = new Konva.Line({
            points: [80, -50, 80, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var keyCircle = new Konva.Circle({
            x: 80,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "keyCircle"
        });
        var plain_text = new Konva.Line({
            points: [20, -50, 20, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var plain_textCircle = new Konva.Circle({
            x: 20,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "plain_textCircle"
        });
        var output = new Konva.Line({
            points: [50, 50, 50, 100],
            stroke: 'black',
            strokeWidth: 2,
        });
        var outputCircle = new Konva.Circle({
            x: 50,
            y: 100,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "outputCircle"
        });
        var label = new Konva.Label({
            x: 33,
            y: 12,
            opacity: 0.75,
        });

        label.add(
            new Konva.Text({
                text: 'ENC',
                fontFamily: 'Calibri',
                fontSize: 14,
                padding: 5,
                fill: 'black',
            })
        );


        let lineShape = null;
        let lineShape_key = null;
        let lineShape_plain_text = null;

        var line_diff

        this.connect_shapes_3Point(group, lineShape, lineShape_key, lineShape_plain_text, obj, obj_output, obj_key, obj_plainText, outputCircle, keyCircle, plain_textCircle, line_diff)

        group.add(rect1, lin, plain_text, output, label, keyCircle, plain_textCircle, outputCircle)
        layer.add(group);
        stage.add(layer);

        obj.name = 'enc_' + encryption_count
        group.name('enc_' + encryption_count)
        encryption_count++
        obj.position = group.getAbsolutePosition()
        obj.connectors = []
        obj.connectors.push(obj_output, obj_key, obj_plainText)
        shape_list.push(obj)


        var tr = new Konva.Transformer({
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
        });
        this.detach_resize(tr, group)
        this.atach_resize(group, tr, stage)
        layer.draw();
    }
    decryption_function(x, y, layer, stage) {
        var obj = {}
        var obj_plainText = {}
        var obj_key = {}
        var obj_output = {}
        var group = new Konva.Group({
            x: x - 60,
            y: y - 20,
            rotation: 0,
            draggable: false,
        });

        var rect1 = new Konva.Rect({
            width: 100,
            height: 50,
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 1,
        });


        var lin = new Konva.Line({
            points: [80, -50, 80, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var keyCircle = new Konva.Circle({
            x: 80,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "keyCircle"
        });
        var plain_text = new Konva.Line({
            points: [20, -50, 20, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var plain_textCircle = new Konva.Circle({
            x: 20,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "plain_textCircle"
        });
        var output = new Konva.Line({
            points: [50, 50, 50, 100],
            stroke: 'black',
            strokeWidth: 2,
        });
        var outputCircle = new Konva.Circle({
            x: 50,
            y: 100,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "outputCircle"
        });
        var label = new Konva.Label({
            x: 33,
            y: 12,
            opacity: 0.75,
        });

        label.add(
            new Konva.Text({
                text: 'DEC',
                fontFamily: 'Calibri',
                fontSize: 14,
                padding: 5,
                fill: 'black',
            })
        );

        let lineShape = null;
        let lineShape_key = null;
        let lineShape_plain_text = null;

        var line_diff

        this.connect_shapes_3Point(group, lineShape, lineShape_key, lineShape_plain_text, obj, obj_output, obj_key, obj_plainText, outputCircle, keyCircle, plain_textCircle, line_diff)

        group.add(rect1, lin, plain_text, output, label, keyCircle, plain_textCircle, outputCircle)
        layer.add(group);
        stage.add(layer);

        var tr = new Konva.Transformer({
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
        });
        this.detach_resize(tr, group)
        this.atach_resize(group, tr)
        layer.draw();

        obj.name = 'dec_' + decryption_count
        group.name('dec_' + decryption_count)
        decryption_count++
        obj.position = group.getAbsolutePosition()
        obj.connectors = []
        obj.connectors.push(obj_output, obj_key, obj_plainText)
        shape_list.push(obj)
    }
    verify_function(x, y, layer, stage) {
        var obj = {}
        var obj_plainText = {}
        var obj_key = {}
        var obj_output = {}
        var obj_s = {}
        var group = new Konva.Group({
            x: x - 60,
            y: y - 20,
            rotation: 0,
            draggable: false,
        });

        var rect1 = new Konva.Rect({
            width: 100,
            height: 50,
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 1,
        });


        var lin = new Konva.Line({
            points: [80, -50, 80, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var keyCircle = new Konva.Circle({
            x: 80,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "keyCircle"
        });
        var output = new Konva.Line({
            points: [50, 50, 50, 100],
            stroke: 'black',
            strokeWidth: 2,
        });
        var outputCircle = new Konva.Circle({
            x: 50,
            y: 100,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "outputCircle"
        });
        var plain_text = new Konva.Line({
            points: [20, -50, 20, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var plain_textCircle = new Konva.Circle({
            x: 20,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "plain_textCircle"
        });

        var s = new Konva.Line({
            points: [50, -50, 50, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var sCircle = new Konva.Circle({
            x: 50,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "sCircle"
        });


        var label = new Konva.Label({
            x: 27,
            y: 12,
            opacity: 0.75,
        });

        label.add(
            new Konva.Text({
                text: 'VERIFY',
                fontFamily: 'Calibri',
                fontSize: 14,
                padding: 5,
                fill: 'black',
            })
        );


        var tr = new Konva.Transformer({
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
        });
        this.detach_resize(tr, group)
        this.atach_resize(group, tr)

        let lineShape = null;
        let lineShape_key = null;
        let lineShape_plain_text = null;
        let lineShape_s = null;
        var line_diff
        this.connect_shapes_4Point(group, lineShape, lineShape_key, lineShape_plain_text, lineShape_s, obj, obj_output, obj_key, obj_plainText, obj_s, outputCircle, keyCircle, plain_textCircle, sCircle, line_diff)
        group.add(rect1, lin, plain_text, output, label, keyCircle, plain_textCircle, s, sCircle, outputCircle)
        layer.add(group);
        stage.add(layer);

        obj.name = 'verify_' + verify_count
        group.name('verify_' + verify_count)
        verify_count++
        obj.position = group.getAbsolutePosition()
        obj.connectors = []
        obj.connectors.push(obj_output, obj_key, obj_plainText, obj_s)
        shape_list.push(obj)


    }
    rand_function(x, y, layer, stage) {
        var obj = {}
        var obj_output = {}
        var group = new Konva.Group({
            x: x - 60,
            y: y - 20,
            rotation: 0,
            draggable: false,
        });

        var rect1 = new Konva.Rect({

            width: 100,
            height: 50,
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 1,
        });
        var output = new Konva.Line({
            points: [50, 50, 50, 100],
            stroke: 'black',
            strokeWidth: 2,
        });

        var label = new Konva.Label({
            x: 29,
            y: 12,
            opacity: 0.75,
        });

        label.add(
            new Konva.Text({
                text: 'RAND',
                fontFamily: 'Calibri',
                fontSize: 14,
                padding: 5,
                fill: 'black',
            })
        );
        var outputCircle = new Konva.Circle({
            x: 50,
            y: 100,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "outputCircle"
        });
        // this.handle_mouseenter(outputCircle, obj)
        // this.handle_mouseleave(outputCircle)
        let lineShape = null;
        this.connect_shapes(group, outputCircle, lineShape, obj, obj_output)
            // this.handle_mousedown(outputCircle, obj, lineShape)
            // this.handle_dragmove_output_circle(group, outputCircle)

        group.add(rect1, label, output, outputCircle)
        layer.add(group);
        stage.add(layer);

        obj.name = 'rand_' + rand_count
        group.name('rand_' + rand_count)
        rand_count++
        obj.position = group.getAbsolutePosition()
        obj.connectors = []
        obj.connectors.push(obj_output)
        obj.line = []
        shape_list.push(obj)
        console.log(shape_list)

        var tr = new Konva.Transformer({
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
        });

        this.detach_resize(tr, group)
        this.atach_resize(group, tr)
        layer.draw();

    }
    xor_function(x, y, layer, stage) {

    }
    concat_function(x, y, layer, stage) {
        var obj = {}
        var obj_plainText = {}
        var obj_key = {}
        var obj_output = {}
        var obj_s = {}
        var obj_sample = {}
        var group = new Konva.Group({
            x: x - 60,
            y: y - 20,
            rotation: 0,
            draggable: false,
        });

        var rect1 = new Konva.Rect({
            width: 100,
            height: 50,
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 1,
        });


        var lin = new Konva.Line({
            points: [90, -50, 90, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var keyCircle = new Konva.Circle({
            x: 90,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "keyCircle"
        });
        var output = new Konva.Line({
            points: [50, 50, 50, 100],
            stroke: 'black',
            strokeWidth: 2,
        });
        var outputCircle = new Konva.Circle({
            x: 50,
            y: 100,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "outputCircle"
        });
        var plain_text = new Konva.Line({
            points: [10, -50, 10, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var plain_textCircle = new Konva.Circle({
            x: 10,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "plain_textCircle"
        });

        var s = new Konva.Line({
            points: [36, -50, 36, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var sCircle = new Konva.Circle({
            x: 36,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "sCircle"
        });

        var sample = new Konva.Line({
            points: [63, -50, 63, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var sampleCircle = new Konva.Circle({
            x: 63,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "sampleCircle"
        });

        var label = new Konva.Label({
            x: 24,
            y: 12,
            opacity: 0.75,
        });

        label.add(
            new Konva.Text({
                text: 'CONCAT',
                fontFamily: 'Calibri',
                fontSize: 14,
                padding: 5,
                fill: 'black',
            })
        );


        var tr = new Konva.Transformer({
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
        });
        this.detach_resize(tr, group)
        this.atach_resize(group, tr)

        let lineShape = null;
        let lineShape_key = null;
        let lineShape_plain_text = null;
        let lineShape_s = null;
        let lineShape_sample = null;
        var line_diff
        this.connect_shapes_5Point(group, lineShape, lineShape_key, lineShape_plain_text, lineShape_s, lineShape_sample, obj, obj_output, obj_key, obj_plainText, obj_s, obj_sample, outputCircle, keyCircle, plain_textCircle, sCircle, sampleCircle, line_diff)

        group.add(rect1, lin, plain_text, output, label, keyCircle, plain_textCircle, s, sCircle, outputCircle, sample, sampleCircle)
        layer.add(group);
        stage.add(layer);

        obj.name = 'concat_' + concat_count
        group.name('concat_' + concat_count)
        concat_count++
        obj.position = group.getAbsolutePosition()
        obj.connectors = []
        obj.connectors.push(obj_output, obj_key, obj_plainText, obj_s, obj_sample)
        shape_list.push(obj)
    }

    seperator_function(x, y, layer, stage) {
        var obj = {}
        var obj_plainText = {}
        var obj_key = {}
        var obj_input = {}
        var obj_s = {}
        var group = new Konva.Group({
            x: x - 60,
            y: y - 20,
            rotation: 0,
            draggable: false,
        });

        var rect1 = new Konva.Rect({
            width: 100,
            height: 50,
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 1,
        });


        var lin = new Konva.Line({
            points: [80, 50, 80, 100],
            stroke: 'black',
            strokeWidth: 2,
        });
        var keyCircle = new Konva.Circle({
            x: 80,
            y: 100,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "keyCircle"
        });
        var input = new Konva.Line({
            points: [50, -50, 50, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var inputCircle = new Konva.Circle({
            x: 50,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "inputCircle"
        });
        var plain_text = new Konva.Line({
            points: [20, 50, 20, 100],
            stroke: 'black',
            strokeWidth: 2,
        });
        var plain_textCircle = new Konva.Circle({
            x: 20,
            y: 100,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "plain_textCircle"
        });

        var s = new Konva.Line({
            points: [50, 50, 50, 100],
            stroke: 'black',
            strokeWidth: 2,
        });
        var sCircle = new Konva.Circle({
            x: 50,
            y: 100,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "sCircle"
        });


        var label = new Konva.Label({
            x: 16,
            y: 14,
            opacity: 0.75,
        });

        label.add(
            new Konva.Text({
                text: 'SEPRATOR',
                fontFamily: 'Calibri',
                fontSize: 14,
                padding: 5,
                fill: 'black',
            })
        );


        var tr = new Konva.Transformer({
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
        });
        this.detach_resize(tr, group)
        this.atach_resize(group, tr)

        let lineShape = null;
        let lineShape_key = null;
        let lineShape_plain_text = null;
        let lineShape_s = null;
        var line_diff
        this.connect_shapes_4Point(group, lineShape, lineShape_key, lineShape_plain_text, lineShape_s, obj, obj_input, obj_key, obj_plainText, obj_s, inputCircle, keyCircle, plain_textCircle, sCircle, line_diff)

        group.add(rect1, lin, plain_text, input, label, keyCircle, plain_textCircle, s, sCircle, inputCircle)
        layer.add(group);
        stage.add(layer);

        obj.name = 'verify_' + seprator_count
        group.name('verify_' + seprator_count)
        seprator_count++
        obj.position = group.getAbsolutePosition()
        obj.connectors = []
        obj.connectors.push(obj_input, obj_key, obj_plainText, obj_s)
        shape_list.push(obj)
    }

    f_function(x, y, layer, stage) {
        var obj = {}
        var obj_input = {}
        var obj_output = {}
        var group = new Konva.Group({
            x: x - 60,
            y: y - 20,
            rotation: 0,
            draggable: false,
        });

        var rect1 = new Konva.Rect({
            width: 100,
            height: 50,
            fill: '#00D2FF',
            stroke: 'black',
            strokeWidth: 1,
        });


        var input = new Konva.Line({
            points: [50, -50, 50, 1],
            stroke: 'black',
            strokeWidth: 2,
        });
        var inputCircle = new Konva.Circle({
            x: 50,
            y: -50,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "inputCircle"
        });
        var output = new Konva.Line({
            points: [50, 50, 50, 100],
            stroke: 'black',
            strokeWidth: 2,
        });
        var outputCircle = new Konva.Circle({
            x: 50,
            y: 100,
            radius: 3,
            fill: "#ffeb3b",
            stroke: "black",
            strokeWidth: 2,
            name: "outputCircle"
        });
        var label = new Konva.Label({
            x: 41,
            y: 14,
            opacity: 0.75,
        });

        label.add(
            new Konva.Text({
                text: 'F',
                fontFamily: 'Calibri',
                fontSize: 14,
                padding: 5,
                fill: 'black',
            })
        );

        var label_input = new Konva.Label({
            x: inputCircle.absolutePosition().x - 20,
            y: inputCircle.absolutePosition().y - 25,
            opacity: 0.75,
        });
        label_input.add(
            new Konva.Text({
                text: 'input',
                fontFamily: 'Calibri',
                fontSize: 14,
                padding: 5,
                fill: 'black',
            })
        );

        let lineInput = null
        let lineShape = null;
        var line_diff

        outputCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_output.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_output.output.x
                second_point.clientY = obj_output.output.y
                second_point.name = obj.name
                second_point.pointName = outputCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_output.fromPoint = first_point
                obj_output.toPoint = second_point
                obj_output.name = second_point.pointName
            }


        })
        outputCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineShape == null) {
                    lineShape = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_output.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_output.output.x
                        first_point.clientY = obj_output.output.y
                        first_point.name = obj.name
                        first_point.pointName = outputCircle.name()
                        obj_output.fromPoint = first_point
                        obj_output.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineShape = null
                }
                outputCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineShape != null) {
                    const pos = stage.getPointerPosition();
                    lineShape.setPoints([lineShape.points()[0], lineShape.points()[1], pos.x, pos.y]);
                    layer.add(lineShape)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineShape != null) {
                    lineShape.destroy();
                    lineShape = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })

                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == outputCircle.name())
                                conn.line = line_diff
                        })

                    })

                    layer.add(line_diff)
                    obj_output.fromPoint = first_point
                    obj_output.toPoint = second_point
                    obj_output.name = outputCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        group.on('dragmove', (e) => {

            shape_list.forEach((f) => {
                if (f.name === group.name()) {
                    f.connectors.forEach((conn) => {
                        if (this.NotEmpty(conn)) {
                            if (conn.fromPoint.name === group.name()) {
                                if (conn.fromPoint.pointName === OUTPUT) {
                                    conn.fromPoint.clientX = outputCircle.absolutePosition().x
                                    conn.fromPoint.clientY = outputCircle.absolutePosition().y
                                } else {
                                    conn.fromPoint.clientX = inputCircle.absolutePosition().x
                                    conn.fromPoint.clientY = inputCircle.absolutePosition().y
                                }

                            } else {
                                if (conn.toPoint.pointName === OUTPUT) {
                                    conn.toPoint.clientX = outputCircle.absolutePosition().x
                                    conn.toPoint.clientY = outputCircle.absolutePosition().y
                                } else {
                                    conn.toPoint.clientX = inputCircle.absolutePosition().x
                                    conn.toPoint.clientY = inputCircle.absolutePosition().y
                                }

                            }
                            conn.line.setPoints([conn.fromPoint.clientX, conn.fromPoint.clientY, conn.toPoint.clientX, conn.toPoint.clientY])
                            layer.draw()
                        }
                    })

                }
            })

        })
        outputCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });
        inputCircle.on('mouseenter', (e) => {
            stage.container().style.cursor = 'crosshair';
            obj_input.output = {
                x: e.evt.layerX,
                y: e.evt.layerY
            }
            if (!this.isEmpty(first_point) && this.isEmpty(second_point)) {
                second_point.clientX = obj_input.output.x
                second_point.clientY = obj_input.output.y
                second_point.name = obj.name
                second_point.pointName = inputCircle.name()
                second_point.target = first_point.name
                first_point.target = obj.name
                obj_input.fromPoint = first_point
                obj_input.toPoint = second_point
                obj_input.name = second_point.pointName
            }
            console.log(outputCircle.absolutePosition().x)

        })
        inputCircle.on('mousedown touchstart', (e) => {
            stage.on('mousedown touchstart', () => {
                const pos = stage.getPointerPosition();
                if (lineInput == null) {
                    lineInput = new Konva.Line({
                        points: [pos.x, pos.y],
                        stroke: 'red',
                        strokeWidth: 1,
                        fill: 'black',
                    });
                    obj_input.output = {
                        x: e.evt.layerX,
                        y: e.evt.layerY
                    }
                    if (this.isEmpty(first_point)) {
                        first_point.clientX = obj_input.output.x
                        first_point.clientY = obj_input.output.y
                        first_point.name = obj.name
                        first_point.pointName = inputCircle.name()
                        obj_input.fromPoint = first_point
                        obj_input.toPoint = second_point
                    }
                } else {
                    console.log("else")
                    lineInput = null
                }
                inputCircle.off('mousedown touchstart')
            });
            stage.on('mousemove touchmove', () => {
                if (lineInput != null) {
                    const pos = stage.getPointerPosition();
                    lineInput.setPoints([lineInput.points()[0], lineInput.points()[1], pos.x, pos.y]);
                    layer.add(lineInput)
                    layer.batchDraw();

                }
            });
            stage.on('mouseup touchend', (e) => {
                if (lineInput != null) {
                    lineInput.destroy();
                    lineInput = null
                    layer.batchDraw();

                    line_diff = new Konva.Line({
                        points: [first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY],
                        stroke: 'black',
                    })


                    shape_list.forEach(sh => {
                        sh.connectors.forEach(conn => {
                            //         // console.log(conn)
                            if (this.NotEmpty(conn) && conn.fromPoint.name == group.name() && conn.toPoint.target == group.name() && conn.fromPoint.pointName == inputCircle.name())
                                conn.line = line_diff
                        })
                    })


                    console.log("1 ", line_diff)
                    layer.add(line_diff)
                        // line_diff = null
                    console.log("2 ", line_diff)
                    obj_input.fromPoint = first_point
                    obj_input.toPoint = second_point
                    obj_input.name = inputCircle.name()
                    first_point = {}
                    second_point = {}
                    stage.off('mouseup touchend')
                    stage.off('mousedown touchstart')

                }
            });
            layer.draw();

        })
        inputCircle.on('mouseleave', (e) => {
            stage.container().style.cursor = 'default';
        });

        group.add(rect1, input, inputCircle, output, outputCircle, label, label_input)
        layer.add(group);
        stage.add(layer);

        obj.name = 'f_' + f_count
        group.name('f_' + f_count)
        f_count++
        obj.position = group.getAbsolutePosition()
        obj.connectors = []
        obj.connectors.push(obj_output, obj_input)
        shape_list.push(obj)


        var tr = new Konva.Transformer({
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
        });
        this.detach_resize(tr, group)
        this.atach_resize(group, tr, stage)
        layer.draw();
    }


    saveStaticDataToFile(node) {
        var a = node.toJSON()
        var blob = new Blob([a], {
            type: "text/plain;charset=utf-8"
        });
        saveAs(blob, "sample.json");
    }

    import_f(file) {



        var s = Konva.Node.create(JSON.stringify(file), 'container');
        // s.draggable(true)
        var tr = new Konva.Transformer({
            borderDash: [3, 3],
            centeredScaling: true,
            rotationSnaps: [0, 90, 180, 270],
        });
        s.on('click', (e) => {
            console.log("00000")
            tr.nodes([s])
        })

        // this.atach_resize(s, tr, stage)
    }



}

// var array_json = []
// btn_save = document.getElementById('save');
// btn_save.addEventListener('click', (e) => {
//     console.log(shape_list.toJSON())
//         // shape_list.forEach(sh => {
//         //         console.log(sh)
//         //             // array_json.push(sh.toJSON())
//         //     })
//         // var blob = new Blob(array_json, {
//         //     type: "text/plain;charset=utf-8"
//         // });
//         // saveAs(blob, "sample.json");
//         // var s = new FuncTool()
//         // s.saveStaticDataToFile(shape_list)
//         // this.saveStaticDataToFile(stage)
// })

// function save() {
//     var s = new FuncTool()
//     s.saveStaticDataToFile()
// }

// function create(data, stg) {
//     const obj = {}
//     var state = [data];
//     state.forEach((i) => {
//         if (i.className == 'Layer') {
//             obj.layer = new Konva.Layer({...i });

//         }
//         i.children.forEach((j) => {
//                 switch (j.className) {
//                     case "Group":
//                         obj.group = new Konva.Group({
//                             draggable: true,
//                             name: j.attrs.name,
//                             x: j.attrs.x,
//                             y: j.attrs.y,
//                         });
//                         layer.add(obj.group);
//                         obj.group.on('click', (e) => {
//                             console.log(obj.group.name())
//                                 // tr.nodes([group])
//                         })
//                         j.children.forEach((ch) => {
//                             switch (ch.className) {
//                                 case "Line":
//                                     obj.group.line = new Konva.Line({...ch });
//                                     obj.group.add(obj.group.line);
//                                     break;
//                                 case "Rect":
//                                     obj.group.rec = new Konva.Rect({...ch });
//                                     obj.group.add(obj.group.rec);
//                                     break;
//                                 case "Text":
//                                     obj.group.labelName = new Konva.Text({...ch });
//                                     obj.group.add(obj.group.labelName);
//                                     break;
//                             }
//                         })
//                         break;
//                     case "Text":
//                         obj.simpleText = new Konva.Text({...j });
//                         layer.add(obj.simpleText);
//                         break;

//                     case "Arrow":
//                         obj.arrow_distance = new Konva.Arrow({...j });
//                         layer.add(obj.arrow_distance);
//                         break;
//                     case "Transformer":
//                         obj.resize_gr = new Konva.Transformer({...j });

//                         layer.add(obj.resize_gr);
//                         // tr.attachTo(group)

//                         break;
//                 }
//             })
//             // stg.add(layer);
//     })
//     return obj
// }

// function import_file() {

//     var load_file = new FuncTool()

//     document.querySelector("#file-input").addEventListener('change', function() {
//         // files that user has chosen
//         var all_files = this.files;
//         if (all_files.length == 0) {
//             alert('Error : No file selected');
//             return;
//         }

//         // first file selected by user
//         var file = all_files[0];

//         // files types allowed
//         var allowed_types = ['application/json'];
//         if (allowed_types.indexOf(file.type) == -1) {
//             alert('Error : Incorrect file type');
//             return;
//         }

//         // Max 5 MB allowed
//         var max_size_allowed = 5 * 1024 * 1024
//         if (file.size > max_size_allowed) {
//             alert('Error : Exceeded size 5MB');
//             return;
//         }

//         var reader = new FileReader();

//         // file reading finished successfully
//         reader.addEventListener('load', function(e) {
//             var text = e.target.result;
//             console.log(create(JSON.parse(text), stage))
//                 // create(JSON.parse(text), stage)
//                 // load_file.import_f(text)

//             // console.log(text)
//             if (text == "") {
//                 alert('Error :File Is Empty!')
//             }
//         });

//         // file reading failed
//         reader.addEventListener('error', function() {
//             alert('Error : Failed to read file');
//         });

//         // read as text file
//         reader.readAsText(file);
//     });
// }


function exportToPdf() {
    document.getElementById('export-pdf').addEventListener('click', (e) => {
        var pdf = new jsPDF('l', 'px', [stage.width(), stage.height()]);
        pdf.setTextColor('#000000');

        pdf.addImage(
            stage.toDataURL({ pixelRatio: 1 }),
            0,
            0,
            stage.width(),
            stage.height()
        );

        pdf.save('canvas.pdf');
    })
}
// import_file()
exportToPdf()

// var cont = stage.container()
// var shape_id = ''
// var parent_shape = document.getElementById('parent-shape-func').addEventListener('dragstart', (e) => {
//     shape_id = e.target.id
// })


container.addEventListener('dragover', (e) => {
    e.preventDefault()

})


container.addEventListener('drop', (e) => {
    e.preventDefault()
    stage.setPointersPositions(e)


    var pos = stage.getPointerPosition()
        // console.log(pos)
    var entity = new FuncTool()
    switch (shape_id) {
        case 'hash':
            entity.hash_function(pos.x, pos.y, layer, stage)
            break;
        case 'mac':
            entity.mac_function(pos.x, pos.y, layer, stage)
            break;
        case 'enc':
            entity.encryption_function(pos.x, pos.y, layer, stage)
            break;
        case 'dec':
            entity.decryption_function(pos.x, pos.y, layer, stage)
            break;
        case 'sign':
            entity.sign_function(pos.x, pos.y, layer, stage)
            break;
        case 'verify':
            entity.verify_function(pos.x, pos.y, layer, stage)
            break;
        case 'rand':
            entity.rand_function(pos.x, pos.y, layer, stage)
            break;
        case 'concat':
            entity.concat_function(pos.x, pos.y, layer, stage)
            break;
        case 'seperator':
            entity.seperator_function(pos.x, pos.y, layer, stage)
            break;
        case 'f':
            entity.f_function(pos.x, pos.y, layer, stage)
            break;

    }


})