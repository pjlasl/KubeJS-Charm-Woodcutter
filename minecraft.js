onEvent('recipes', event => {

    var modType   = 'minecraft:woodcutting';  

    var logs = ['acacia','birch','dark_oak','jungle','oak','spruce'];
    var stems = ['crimson','warped'];
    var planks = logs.concat(stems);

    var mItems = ['chest;1','bowl;4','ladder;3','stick;8'];
    var lItems = ['boat;1','button;4','door;3','fence;3','fence_gate;1','planks;4','pressure_plate;4','sign;1', 'slab;4','stairs;4','stripped;1','trapdoor;2']
    var pItems = [mItems[1],mItems[3],'trapdoor;1'];

    var modIds = ['charm'];

    const IsModLoaded = (modId) => {
        if (!Platform.isLoaded(modId)) {
            return false;
        } else {
            return true;
        }
    }

    // Check for loaded Mods, exit if not present
    for (var i=0; i <= modIds.length - 1; i++) {
        if (!IsModLoaded(modIds[i])) return;
    }

    const multiCut = (woodType, item, count) => {
        event.custom({
            'type': modType,
            'ingredient': {
                'item': woodType
            },
            'result': item,
            'count': count
        })    
    }    

    for(var i=0; i <= logs.length - 1; i++) {
        
        var logType = logs[i] + '_log';

        for(var m=0; m <= mItems.length - 1; m++) {
            var split = mItems[m].split(';');
            multiCut(logType, 'minecraft:' + split[0], parseInt(split[1]));
        }

        for(var l=0; l <= lItems.length - 1; l++) {
            var split = lItems[l].split(';');
            if (split[0].indexOf('stripped') >= 0) {
                multiCut(logType, 'minecraft:' + split[0] + '_' + logType, parseInt(split[1]));
            } else {
                multiCut(logType, 'minecraft:' + logs[i] + '_' + split[0], parseInt(split[1]));
            }
        }
    }

    for (var i=0; i <=stems.length - 1; i++) {
        var stemType = stems[i] + '_stem';

        for(var m=0; m <= mItems.length - 1; m++) {
            var split = mItems[m].split(';');
            multiCut(stemType, 'minecraft:' + split[0], parseInt(split[1]));
        }

        for(var l=0; l <= lItems.length - 1; l++) {
            var split = lItems[l].split(';');
            if (split[0].indexOf('stripped') >= 0) {
                multiCut(stemType, 'minecraft:' + split[0] + '_' + stemType, parseInt(split[1]));
            } else {
                multiCut(stemType, 'minecraft:' + stems[i] + '_' + split[0], parseInt(split[1]));
            }
            
        }
    }

    for (var i=0; i <=planks.length - 1; i++) {
        var plankType = planks[i] + '_planks';

        for(var m=0; m <= pItems.length - 1; m++) {
            var split = pItems[m].split(';');            
            if (split[0].indexOf('trapdoor') >= 0) {
                multiCut(plankType, 'minecraft:' + planks[i] + '_' + split[0], parseInt(split[1]));
            } else {
                multiCut(plankType, 'minecraft:' + split[0], parseInt(split[1]));
            }
            
        }   
    }
    
})