onEvent('recipes', event => {
    
    var modId = 'wild_explorer';
    
    var modType   = 'minecraft:woodcutting';  

    var logs = ['cherry_oak','palm'];
    var stems = ['dark_amaranth']       
    var planks = logs;

    var mItems = ['chest;1','bowl;4','ladder;3','stick;8'];
    var lItems = ['button;4','door;3','fence;3','fence_gate;1','planks;4','pressure_plate;4','slab;4','stairs;4','stripped;1','trapdoor;2']
    var pItems = [mItems[1],mItems[3],'trapdoor;1'];

    var modIds = ['charm','wild_explorer'];

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

        // converts log to minecraft items
        for(var m=0; m <= mItems.length - 1; m++) {
            var split = mItems[m].split(';');
            multiCut(modId + ':' + logType, 'minecraft:' + split[0], parseInt(split[1]));
        }

        // converts log to specific items
        for(var l=0; l <= lItems.length - 1; l++) {
            var split = lItems[l].split(';');
            if (split[0].indexOf('stripped') >= 0) {
                multiCut(modId + ':' + logType, modId + ':' + split[0] + '_' + logType, parseInt(split[1]));
            } else {
                multiCut(modId + ':' + logType, modId + ':' + logs[i] + '_' + split[0], parseInt(split[1]));
            }
        }
    }

    for (var i=0; i <=stems.length - 1; i++) {
        var stemType = stems[i] + '_stem';

        for(var m=0; m <= mItems.length - 1; m++) {
            var split = mItems[m].split(';');
            multiCut(modId + ':' + stemType, 'minecraft:' + split[0], parseInt(split[1]));
        }

        for(var l=0; l <= lItems.length - 1; l++) {
            var split = lItems[l].split(';');
            if (split[0].indexOf('stripped') >= 0) {
                multiCut(modId + ':' + stemType, modId + ':' + split[0] + '_' + stemType, parseInt(split[1]));                
            } else {
                multiCut(modId + ':' + stemType, modId + ':' + stems[i] + '_' + split[0], parseInt(split[1]));                
            }
            
        }
    }

    for (var i=0; i <=planks.length - 1; i++) {
        var plankType = planks[i] + '_planks';

        for(var m=0; m <= pItems.length - 1; m++) {
            var split = pItems[m].split(';');            
            if (split[0].indexOf('trapdoor') >= 0) {
                multiCut(modId + ':' + plankType, modId + ':' + planks[i] + '_' + split[0], parseInt(split[1]));
            } else {
                multiCut(modId + ':' + plankType, 'minecraft:' + split[0], parseInt(split[1]));
            }
            
        }   
    }
    
})