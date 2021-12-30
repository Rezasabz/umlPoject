var data = {
    "attrs": {
        "name": "partner0",
        "x": 340,
        "y": 58,
        "id": "rect0"
    },
    "className": "Group",
    "children": [{
            "attrs": {
                "points": [
                    50,
                    50,
                    50,
                    220,
                    50,
                    460
                ],
                "stroke": "black",
                "strokeWidth": 3,
                "lineJoin": "round",
                "dash": [
                    33,
                    10
                ]
            },
            "className": "Line"
        },
        {
            "attrs": {
                "width": 98,
                "height": 50,
                "fill": "#ffff",
                "stroke": "#7a797f",
                "shadowOpacity": 0.4,
                "shadowBlur": 2,
                "shadowColor": "black",
                "shadowOffsetX": 1,
                "shadowOffsetY": 1,
                "cornerRadius": [
                    5,
                    5,
                    5,
                    5
                ],
                "id": "rect0"
            },
            "className": "Rect"
        },
        {
            "attrs": {
                "fontFamily": "Calibri",
                "fontSize": 18,
                "padding": 5,
                "fill": "black",
                "align": "center"
            },
            "className": "Text"
        }
    ]
}


// initial state
var state = [data];

// our history
var appHistory = [state];
var appHistoryStep = 0;

var width = window.innerWidth;
var height = window.innerHeight;
var stage = new Konva.Stage({
    container: 'container',
    width: width,
    height: height,
});

var layer = new Konva.Layer();
stage.add(layer);

// create function will destroy previous drawing
// then it will created required nodes and attach all events
function create() {


    stage.forEach((i) => {
        i.children.forEach((j) => {
            switch (j.className) {
                case "Group":
                    var group = new Konva.Group({
                        draggable: true,
                        name: item.attrs.name,
                    });
                    layer.add(group);
                    item.children.forEach((ch) => {
                        switch (ch.className) {
                            case "Line":
                                var line = new Konva.Line({...ch });
                                group.add(line);
                                break;
                            case "Rect":
                                var rect = new Konva.Rect({...ch });
                                group.add(rect);
                                break;
                            case "Text":
                                var text = new Konva.Text({...ch });
                                group.add(text);
                                break;
                        }
                    })
                    break;
            }
        })
    })




    // layer.destroyChildren();
    // state.forEach((item, index) => {
    //     console.log(item)
    //     var group = new Konva.Group({
    //         draggable: true,
    //         name: item.attrs.name,
    //     });
    //     layer.add(group);

    //     item.children.forEach((ch => {
    //         switch (ch.className) {
    //             case "Line":
    //                 var line = new Konva.Line({...ch });
    //                 group.add(line);
    //                 break;
    //             case "Rect":
    //                 var rect = new Konva.Rect({...ch });
    //                 group.add(rect);
    //                 break;
    //             case "Text":
    //                 var text = new Konva.Text({...ch });
    //                 group.add(text);
    //                 break;
    //         }
    //     }))
    // });
}

//
function saveStateToHistory(state) {
    appHistory = appHistory.slice(0, appHistoryStep + 1);
    appHistory = appHistory.concat([state]);
    appHistoryStep += 1;
}
// create(state);

document
    .querySelector('#create-yoda')
    .addEventListener('click', function() {
        create(state);
    });