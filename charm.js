onEvent('recipes', event => {

    var modType   = 'minecraft:woodcutting';  

    var logs = ['acacia','birch','dark_oak','jungle','oak','spruce'];
    var stems = ['crimson','warped'];

    var mItems = ['chest;1','ladder;3'];
    
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
            multiCut(logType, 'charm:' + logs[i] + '_' + split[0], parseInt(split[1]));
        }        
    }

    for (var i=0; i <=stems.length - 1; i++) {
        var stemType = stems[i] + '_stem';

        for(var m=0; m <= mItems.length - 1; m++) {
            var split = mItems[m].split(';');
            multiCut(stemType, 'charm:' + stems[i] + '_' + split[0], parseInt(split[1]));
        }        
    }
    
})