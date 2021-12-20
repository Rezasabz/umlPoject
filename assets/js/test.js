var stage = new Konva.Stage({
    container: 'container',
    width: window.innerWidth,
    height: window.innerHeight
});

var layer = new Konva.Layer();

var first_point = {}
var second_point = {}

var group = new Konva.Group({
    x: 150,
    y: 150,
    rotation: 0,
    draggable: true,
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
    strokeWidth: 5,
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

group.add(rect1, output)
layer.add(group);
stage.add(layer);

group.on('click', (e) => {
    first_point.clientX = e.evt.clientX
    first_point.clientY = e.evt.clientY
    console.log("F => ", first_point)

})

var line_diff = new Konva.Line({
    stroke: 'black',
});

layer.add(line_diff)
    // create new transformer
var tr = new Konva.Transformer();
layer.add(tr);
// tr.attachTo(group);
layer.draw();



var group_hash = new Konva.Group({
    x: 180,
    y: 180,
    rotation: 0,
    draggable: true,
});

var lin_hash = new Konva.Line({
    points: [100, -40, 100, 20],
    stroke: 'black',
    strokeWidth: 5,
});
var output_hash = new Konva.Line({
    points: [103, 130, 103, 75],
    stroke: 'black',
    strokeWidth: 5,
});

var poly_hash = new Konva.Line({
    points: [50, 20, 150, 20, 130, 75, 75, 75],
    fill: '#00D2FF',
    stroke: 'black',
    strokeWidth: 1,
    closed: true,
});
var label_hash = new Konva.Label({
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

group_hash.add(lin_hash, output_hash, poly_hash)
layer.add(group_hash);
stage.add(layer);

group_hash.on('click', (e) => {
    second_point.clientX = e.evt.clientX
    second_point.clientY = e.evt.clientY
    line_diff.points([first_point.clientX, first_point.clientY, second_point.clientX, second_point.clientY])

    console.log("S => ", second_point)
})
var tr_hash = new Konva.Transformer({
    borderDash: [3, 3],
    centeredScaling: true,
    rotationSnaps: [0, 90, 180, 270],
});
//         this.detach_resize(tr)
//         this.atach_resize(group, tr)
layer.draw();