onEvent('recipes', event => {
    
    var modId = 'adorn';
    var modDep = 'traverse';
    
    var modType   = 'minecraft:woodcutting';  

    var logs = ['fir'];
    var planks = logs;

    var mItems = ['platform;4','post;8','step;8'];
    var pItems = ['platform;1','post;2','step;2'];

    var modIds = ['charm','adorn','traverse'];

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
            multiCut(modDep + ':' + logType, modId + ':' + modDep + '_' + logs[i] + '_' + split[0], parseInt(split[1]));
        }        
    }

    // for (var i=0; i <=stems.length - 1; i++) {
    //     var stemType = stems[i] + '_stem';

    //     for(var m=0; m <= mItems.length - 1; m++) {
    //         var split = mItems[m].split(';');
    //         multiCut(stemType, modId + ':' + stems[i] + '_' + split[0], parseInt(split[1]));
    //     }        
    // }

    for(var i=0; i <= planks.length - 1; i++) {
        
        var plankType = planks[i] + '_planks';

        for(var m=0; m <= pItems.length - 1; m++) {
            var split = pItems[m].split(';');
            multiCut(modDep + ':' + plankType, modId + ':' + modDep + '_' + logs[i] + '_' + split[0], parseInt(split[1]));
        }        
    }
    
})