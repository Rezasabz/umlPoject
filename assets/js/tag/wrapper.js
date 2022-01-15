// var obj_function = {
//   // name : '',
//   // content: '',
// }
class ParamsParser {
    // constructor(func_array = []){
    //   this.func_array = func_array
    //   // this.nonc_array = nonc_array
    // }

    get res(func_array) {
        return this.splite_string(func_array)
    }
    function_array = []
    nonce_array = []
    tmp_func_content
    split_array
    i = 0

    is_function(str) {
        return str.includes("(") || str.includes(")")
    }

    func_content(func) {
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
        //return func.substring(first_parantez,end_parantez)
        var cont = func.substring(first_parantez, end_parantez)
        obj_function.name = function_name.replace(',', '')
        obj_function.content = this.splite_content(cont)
        return obj_function
    }

    splite_content(content) {
        var split_array = []
        var split_array_tmp = []
        var counter = 0
        var index = 0
            //var end_parantez = 0
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
        split_array.push(content.substring(index, content.length))
        return split_array
    }

    splite_string(str) {

        // split_array = splite_content(str)

        // console.log(split_array)
        str.forEach((sp) => {
            // sp = sp.replace(',','')
            if (this.is_function(sp)) {
                this.tmp_func_content = this.func_content(sp)
                    // function_array[i] = func_content(sp)
                    // i=i+1
                this.function_array.push(this.func_content(sp))
                    // console.log("====> ", i)
                this.splite_string(this.func_content(sp).content)

            } else {
                this.nonce_array.push(sp.replace(',', ''))
            }

        })

    }



}


const params = new ParamsParser()
console.log(params.res(['a', 'b', 'h(c)']))



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


console.log(params.res(['a', 'b', 'h(c)']))




// ----------------------------------------00103------------------------------//
// var message = {
//   sender,
//   reciver,
//   msg:[],
//   idx,
// }

// var nonce = {
//   new_nonce:[],
//   var_nonce:[]
// }

// var partner = {
//   name,
//   sym_key:[],
//   Asym_key:[],
//   messages:[],
//   nonces:[]
// }



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
                nonces: []
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
                nonces: []
            }
            new_partner.name = s.reciver
            new_partner.messages.push(s)
            array_partner.push(new_partner)
        } else {
            array_partner[index_1].messages.push(s)
        }

    })
    console.log(array_partner[0].messages.forEach(f => {
            return f
        }))
        // console.log(array_partner[0].messages)
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

var test_msg = [{
            "define": "sdcd",
            "params": "dvd,dff",
            "partnerName": "partner1",
            "reciver": "a",
            "sender": "b"

        },
        {
            "define": "sdcd",
            "params": "rrr,ttt",
            "partnerName": "partner2",
            "reciver": "b",
            "sender": "a"

        },
        {
            "define": "sdcd",
            "params": "dvd,dff",
            "partnerName": "partner1",
            "reciver": "a",
            "sender": "b"

        },
    ]
    // var test = ["a","g","r","y","u"]
    // is_contain(test, "y")
parser_msg_to_partner(test_msg)








// var message = {
//   sender,
//   reciver,
//   msg:[],
//   idx,
// }

// var nonce = {
//   new_nonce:[],
//   var_nonce:[]
// }

// var partner = {
//   name,
//   sym_key:[],
//   Asym_key:[],
//   messages:[],
//   nonces:[]
// }


var function_array = []
var nonce_array = []
var tmp_func_content
var split_array
var i = 0

function is_function(str) {
    return str.includes("(") || str.includes(")")
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
    split_array.push(content.substring(index, content.length))
    return split_array
}

function splite_string(str) {

    str.forEach((sp) => {
        if (is_function(sp)) {
            tmp_func_content = func_content(sp)
            function_array.push(func_content(sp))
            splite_string(func_content(sp).content)
        } else {
            nonce_array.push(sp.replace(',', ''))
        }
    })

    // return nonce_array
}
// splite_string(splite_content("f(a,b,h(c)),g(a,b),h(d,n,m(s))"))
//   console.log(function_array, "\n"+ nonce_array )



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
                // console.log(nonce)
            nonce.forEach(ns => {
                if (!n.nonces.var_array.includes(ns) && !n.nonces.new_array.includes(ns)) {
                    if (n.name === m.sender) {
                        n.nonces.new_array.push(ns)
                    } else {
                        n.nonces.var_array.push(ns)
                    }
                }
            })
        })
    })

    console.log(array_partner[0])

    // console.log(array_partner[0].messages)
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

var test_msg = [{
            "define": "sdcd",
            "params": "x",
            "partnerName": "partner1",
            "reciver": "a",
            "sender": "b"

        },
        {
            "define": "sdcd",
            "params": "f(y)",
            "partnerName": "partner2",
            "reciver": "b",
            "sender": "a"

        },
        {
            "define": "sdcd",
            "params": "f(g(z))",
            "partnerName": "partner1",
            "reciver": "a",
            "sender": "b"

        },
    ]
    // var test = ["a","g","r","y","u"]
    // is_contain(test, "y")
    // parser_msg_to_partner(test_msg)  "params": "f(g(z))",)




// var message = {
//   sender,
//   reciver,
//   msg:[],
//   idx,
// }

// var nonce = {
//   new_nonce:[],
//   var_nonce:[]
// }

// var partner = {
//   name,
//   sym_key:[],
//   Asym_key:[],
//   messages:[],
//   nonces:[]
// }


var function_array = []
var nonce_array = []
var tmp_func_content
var split_array
var i = 0
var flag_error_func = 1000

function is_function(str) {
    return str.includes("(") || str.includes(")")
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
    split_array.push(content.substring(index, content.length))
    return split_array
}

function splite_string(str) {

    str.forEach((sp) => {
        if (is_function(sp)) {
            fn = func_content(sp)
                // console.log("tmp => ", tmp_func_content)
                // tmp_func_content.forEach(fn =>{
            var func_exist_index = is_contain(function_array, fn.name)
            if (func_exist_index < function_array.length) {
                if (fn.content.length !== function_array[func_exist_index].content.length) {
                    flag_error_func = func_exist_index
                }
            } else {
                function_array.push(fn)
            }
            // })
            // function_array.push(func_content(sp))
            splite_string(func_content(sp).content)
        } else {
            nonce_array.push(sp.replace(',', ''))
        }
    })

    // return nonce_array
}
// splite_string(splite_content("f(a,b,h(c)),g(a,b),h(d,n,m(s))"))




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
                // console.log(nonce)
            nonce.forEach(ns => {
                if (!n.nonces.var_array.includes(ns) && !n.nonces.new_array.includes(ns)) {
                    if (n.name === m.sender) {
                        n.nonces.new_array.push(ns)
                    } else {
                        n.nonces.var_array.push(ns)
                    }
                }
            })
        })
    })

    console.log(array_partner)

    // console.log(array_partner[0].messages)
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

var test_msg = [{
            "define": "sdcd",
            "params": "x",
            "partnerName": "partner1",
            "reciver": "a",
            "sender": "b"

        },
        {
            "define": "sdcd",
            "params": "g(x),f(y,t)",
            "partnerName": "partner2",
            "reciver": "b",
            "sender": "a"

        },
        {
            "define": "sdcd",
            "params": "f(g(z))",
            "partnerName": "partner1",
            "reciver": "a",
            "sender": "b"

        },
    ]
    // var test = ["a","g","r","y","u"]
    // is_contain(test, "y")
parser_msg_to_partner(test_msg)
console.log("Func ===> ", function_array)
console.log("flag ---> ", flag_error_func)