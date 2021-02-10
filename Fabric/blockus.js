onEvent('recipes', event => {
    
    var modId = 'blockus';
    
    var modType   = 'minecraft:woodcutting';  

    var woods = [{name: 'bamboo', hasPlanks: false, suffix: '_planks'},
                 {name: 'charred', hasPlanks: false, suffix: '_planks'},
                 {name: 'white_oak', isLog: true, hasPlanks: true, suffix: '_log'}
    ]

    var baseItems = [{name: 'chest', count: 1, usePlank: false, useStem: true, plankCount: 0},
                     {name: 'bowl', count: 3, usePlank: true, useStem: true, plankCount: 1},
                     {name: 'ladder', count: 3, usePlank: false, useStem: true, plankCount: 0},
                     {name: 'stick', count: 8, usePlank: true, useStem: true, plankCount: 1}
    ]

    var items = [{name: 'button', count: 4, usePlank: true, useStem: true, plankCount: 4},
                 {name: 'door', count: 3, usePlank: true, useStem: true, plankCount: 1},
                 {name: 'fence', count: 3, usePlank: true, useStem: true, plankCount: 1},
                 {name: 'fence_gate', count: 2, usePlank: true, useStem: true, plankCount: 1},
                 {name: 'planks', count: 4, usePlank: false, useStem: true, plankCount: 0},
                 {name: 'pressure_plate', count: 4, usePlank: true, useStem: true, plankCount: 2},
                 {name: 'slab', count: 8, usePlank: true, useStem: true, plankCount: 2},
                 {name: 'stairs', count: 4, usePlank: true, useStem: true, plankCount: 1},
                 {name: 'stripped', count: 1, usePlank: false, useStem: true, plankCount: 0},
                 {name: 'trapdoor', count: 2, usePlank: true, useStem: true, plankCount: 1}
    ]

    var modIds = ['charm','blockus'];

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

    const createWoodCut = (arr, modName, separator) => {

        if (!separator) {
            separator = '_'
        }
        
        arr.forEach(function(wood, index) {

            var woodType = wood.name + wood.suffix;
            var modWoodType = modId + ':' + woodType;

            baseItems.forEach(function(item, index) {
                multiCut(modWoodType, 'minecraft:' + item.name, item.count);                
    
                if (wood.hasPlanks) {
                    
                    if (item.usePlank && item.plankCount > 0) {
                        console.info('I am here 2');
                        multiCut(modId + ':' + wood.name + '_planks', 'minecraft:' + item.name, item.plankCount);
                    }
                }
                
            })

            items.forEach(function(item, index) {            
                if (item.name == 'stripped') {
                    multiCut(modWoodType, modId + ':' + item.name + '_' + woodType, item.count);
                } else {                
                    multiCut(modWoodType, modId + ':' + wood.name + '_' + item.name, item.count);
    
                    if (wood.hasPlanks) {
                        if (item.usePlank && item.plankCount > 0) {
                            multiCut(modId + ':' + wood.name + '_planks', modId + ':' + wood.name + '_' + item.name, item.plankCount);
                        }
                    }
                    
                }
            })
            
        })   
       
    }

    createWoodCut(woods);
    
})