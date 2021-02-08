onEvent('recipes', event => {

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

    var baseItems = [{name: 'chest', count: 1, usePlank: false, useStem: true},
                     {name: 'bowl', count: 3, usePlank: true, useStem: true},
                     {name: 'ladder', count: 3, usePlank: false, useStem: true},
                     {name: 'stick', count: 8, usePlank: true, useStem: true}
    ]

    var items = [{name: 'boat', count: 1, usePlank: false, useStem: false},
                 {name: 'button', count: 4, usePlank: true, useStem: true},
                 {name: 'door', count: 3, usePlank: true, useStem: true},
                 {name: 'fence', count: 3, usePlank: true, useStem: true},
                 {name: 'fence_gate', count: 2, usePlank: true, useStem: true},
                 {name: 'planks', count: 4, usePlank: true, useStem: true},
                 {name: 'pressure_plate', count: 4, usePlank: true, useStem: true},
                 {name: 'sign', count: 1, usePlank: true, useStem: true},
                 {name: 'slab', count: 8, usePlank: true, useStem: true},
                 {name: 'stairs', count: 4, usePlank: true, useStem: true},
                 {name: 'stripped', count: 1, usePlank: true, useStem: true},
                 {name: 'trapdoor', count: 2, usePlank: true, useStem: true}
    ]

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

    woods.forEach(function(wood, index) {
        
        var woodType = wood.isLog ? wood.name + '_log' : wood.name + '_stem';        
        
        baseItems.forEach(function(item, index) {
            multiCut(woodType, 'minecraft:' + item.name, item.count);

            if (item.usePlank) {
                multiCut(wood.name + '_planks', 'minecraft:' + item.name, 1);
            }
        })

        items.forEach(function(item, index) {            
            if (item.name == 'stripped') {
                multiCut(woodType, 'minecraft:' + item.name + '_' + woodType, item.count);
            } else {

                if (wood.isStem && !item.useStem) {
                    return
                } 
                
                multiCut(woodType, 'minecraft:' + wood.name + '_' + item.name, item.count);
            }
        })

    })
    
})