onEvent('recipes', event => {

    var modType   = 'minecraft:woodcutting';  

    var woods = [{name: 'acacia', hasPlank: true, hasStripped: true, suffix: '_log'},
                 {name: 'birch', hasPlank: true,  hasStripped: true, suffix: '_log'},
                 {name: 'dark_oak', hasPlank: true, hasStripped: true, suffix: '_log'},
                 {name: 'jungle', hasPlank: true, hasStripped: true, suffix: '_log'},
                 {name: 'oak', hasPlank: true, hasStripped: true, suffix: '_log'},
                 {name: 'spruce', hasPlank: true, hasStripped: true, suffix: '_log'},
                 {name: 'crimson', hasPlank: true, hasStripped: true, suffix: '_stem'},
                 {name: 'warped', hasPlank: true, hasStripped: true, suffix: '_stem'},
    ]

    var baseItems = [{name: 'chest', count: 1, usePlank: false, useStem: true},
                     {name: 'bowl', count: 3, usePlank: true, useStem: true, plankCount: 1},
                     {name: 'ladder', count: 3, usePlank: false, useStem: true},
                     {name: 'stick', count: 8, usePlank: true, useStem: true, plankCount: 1}
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
    modIds.forEach(function(mod, index) {
        if (!IsModLoaded(mod)) return;
    })

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
        
        var woodType = wood.name + wood.suffix;            
        
        baseItems.forEach(function(item, index) {
            multiCut(woodType, 'minecraft:' + item.name, item.count);

            if (wood.hasStripped) {
                multiCut('stripped_' + woodType, 'minecraft:' + item.name, item.count);
            }

            if (wood.hasPlank && item.usePlank && item.plankCount > 0) {
                multiCut(wood.name + '_planks', 'minecraft:' + item.name, item.plankCount);
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
				
                if (wood.hasStripped) {
                    multiCut('stripped_' + woodType, 'minecraft:' + wood.name + '_' + item.name, item.count);                
                }
                
                
            }
        })

    })
    
})