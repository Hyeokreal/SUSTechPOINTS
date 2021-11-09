// size is the dimension of the object in x/y/z axis, with unit meter.
var obj_type_map = {
    Car:              {color: '#00FF00',  size:[4.5, 1.8, 1.5]},
    Truck:            {color: '#00FFFF',  size:[10., 2.8, 3]},
    Bus:              {color: '#FFFF00',  size:[13, 3, 3.5]},
    Pedestrian:       {color: '#FF0000',  size:[0.4, 0.5, 1.7]},
    Cycle:            {color: '#FF8800',  size:[1.6, 0.6, 1.6]},
    PersonalMobility: {color: '#00FFFF',  size:[1.6, 0.6, 1.6]},
    TrafficCone:      {color: '#00AAFF',  size:[0.3, 0.3, 1.0]},
    OtherVehicle:     {color: '#00FF00',  size:[4.5, 1.8, 1.5]},
    Unknown:          {color: '#FF0000',  size:[4.5, 1.8, 1.5]},
}


function guess_obj_type_by_dimension(scale){

    var max_score = 0;
    var max_name = 0;
    for (var i in obj_type_map){
        var o = obj_type_map[i];
        var scorex = o.size[0]/scale.x;
        var scorey = o.size[1]/scale.y;

        if (scorex>1) scorex = 1/scorex;
        if (scorey>1) scorey = 1/scorey;

        if (scorex + scorey > max_score){
            max_score = scorex + scorey;
            max_name = i;
        }
    };

    console.log("guess type", max_name);
    return max_name;
}


function get_obj_cfg_by_type(name){
    if (obj_type_map[name]){
        return obj_type_map[name];
    }
    else{
        return obj_type_map["Unknown"];
    }
}

var name_array = []

function build_name_array(){
    for (var n in obj_type_map){
        name_array.push(n);
    }
}


function get_next_obj_type_name(name){

    if (name_array.length == 0)    {
        build_name_array();
    }

    var idx = name_array.findIndex(function(n){return n==name;})
    idx+=1;
    idx %= name_array.length;

    return name_array[idx];
}

export {obj_type_map, get_obj_cfg_by_type, get_next_obj_type_name, guess_obj_type_by_dimension}
