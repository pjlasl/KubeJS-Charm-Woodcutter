onEvent('recipes', event => {
    
    var modId = 'terrestria';
    
    var modType   = 'minecraft:woodcutting';  

    var woods = [
        {name: 'cypress', isLog: true, isStem: false, hasPlank: true},
        {name: 'hemlock', isLog: true, isStem: false, hasPlank: true},
        {name: 'japanese_maple', isLog: true, isStem: false, hasPlank: true},
        {name: 'rainbow_eucalyptus', isLog: true, isStem: false, hasPlank: true},
        {name: 'redwood', isLog: true, isStem: false, hasPlank: true},
        {name: 'rubber', isLog: true, isStem: false, hasPlank: true},
        {name: 'sakura', isLog: true, isStem: false, hasPlank: true},
        {name: 'willow', isLog: true, isStem: false, hasPlank: true},
        {name: 'yucca_palm', isLog: true, isStem: false, hasPlank: true}
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

    var modIds = ['charm','terrestria'];

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
        
        var woodType = wood.isLog ? wood.name + '_log' : wood.name + '_stem';                
        var modWoodType = modId + ':' + woodType;

        baseItems.forEach(function(item, index) {
            multiCut(modWoodType, 'minecraft:' + item.name, item.count);

            if (item.usePlank) {
                multiCut(modId + ':' + wood.name + '_planks', 'minecraft:' + item.name, 1);
            }
        })

        items.forEach(function(item, index) {            
            if (item.name == 'stripped') {
                multiCut(modWoodType, modId + ':' + item.name + '_' + woodType, item.count);
            } else {                
                multiCut(modWoodType, modId + ':' + wood.name + '_' + item.name, item.count);

                if (item.usePlank) {
                    multiCut(modId + ':' + wood.name + '_planks', modId + ':' + wood.name + '_' + item.name, item.count);
                }
            }
        })

    })
    
})