onEvent('recipes', event => {
    
    var modId = 'adorn';
    
    var modType   = 'minecraft:woodcutting';  

    var woods = [{name: 'acacia', isLog: true, isStem: false, hasPlank: true},
                 {name: 'birch', isLog: true, isStem: false, hasPlank: true},
                 {name: 'dark_oak', isLog: true, isStem: false, hasPlank: true},
                 {name: 'jungle', isLog: true, isStem: false, hasPlank: true},
                 {name: 'oak', isLog: true, isStem: false, hasPlank: true},
                 {name: 'spruce', isLog: true, isStem: false, hasPlank: true},
                 {name: 'crimson', isLog: false, isStem: true, hasPlank: true},
                 {name: 'warped', isLog: false, isStem: true, hasPlank: true},
    ]

    var baseItems = [{name: 'platform', count: 2, usePlank: true, useStem: true, plankCount: 1},
                     {name: 'post', count: 4, usePlank: true, useStem: true, plankCount: 2},
                     {name: 'step', count: 4, usePlank: true, useStem: true, plankCount: 2}
    ]

    var modIds = ['charm','adorn'];

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

    woods.forEach(function(wood, index) {
        
        var woodType = wood.isLog ? wood.name + '_log' : wood.name + '_stem';        

        baseItems.forEach(function(item, index) {            
            multiCut(woodType, modId + ':' + wood.name + '_' + item.name, item.count);

            if (item.usePlank && item.plankCount > 0) {
                multiCut(wood.name + '_planks', modId + ':' + wood.name + '_' + item.name, item.plankCount);                
            }
        })

    })
    
})