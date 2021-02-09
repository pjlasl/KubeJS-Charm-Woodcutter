onEvent('recipes', event => {
    
    var modId = 'byg';
    
    var modType   = 'minecraft:woodcutting';  

    var woods = [
        {name: 'aspen', isLog: true, isStem: false, hasPlank: true},
        {name: 'baobab', isLog: true, isStem: false, hasPlank: true},
        {name: 'blue_enchanted', isLog: true, isStem: false, hasPlank: true},
        {name: 'cherry', isLog: true, isStem: false, hasPlank: true},
        {name: 'cika', isLog: true, isStem: false, hasPlank: true},
        {name: 'cypress', isLog: true, isStem: false, hasPlank: true},
        {name: 'ebony', isLog: true, isStem: false, hasPlank: true},
        {name: 'ether', isLog: true, isStem: false, hasPlank: true},
        {name: 'fir', isLog: true, isStem: false, hasPlank: true},
        {name: 'green_enchanted', isLog: false, isStem: true, hasPlank: true},
        {name: 'holly', isLog: true, isStem: false, hasPlank: true},
        {name: 'jacaranda', isLog: true, isStem: false, hasPlank: true},
        {name: 'lament', isLog: true, isStem: false, hasPlank: true},
        {name: 'mahogany', isLog: true, isStem: false, hasPlank: true},
        {name: 'mangrove', isLog: true, isStem: false, hasPlank: true},
        {name: 'maple', isLog: true, isStem: false, hasPlank: true},
        {name: 'nightshade', isLog: true, isStem: false, hasPlank: true},
        {name: 'palm', isLog: true, isStem: false, hasPlank: true},
        {name: 'pine', isLog: true, isStem: false, hasPlank: true},
        {name: 'rainbow_eucalyptus', isLog: false, isStem: true, hasPlank: true},
        {name: 'redwood', isLog: true, isStem: false, hasPlank: true},
        {name: 'skyris', isLog: true, isStem: false, hasPlank: true},
        {name: 'willow', isLog: true, isStem: false, hasPlank: true},
        {name: 'witch_hazel', isLog: true, isStem: false, hasPlank: true},
        {name: 'zelkova', isLog: true, isStem: false, hasPlank: true},
        {name: 'bulbis', isLog: false, isStem: true, hasPlank: true},
        {name: 'embur', isLog: false, isStem: true, hasPlank: true},
        {name: 'sythian', isLog: false, isStem: true, hasPlank: true},
    ]

    var baseItems = [{name: 'chest', count: 1, usePlank: false, useStem: true},
                     {name: 'bowl', count: 3, usePlank: true, useStem: true},
                     {name: 'ladder', count: 3, usePlank: false, useStem: true},
                     {name: 'stick', count: 8, usePlank: true, useStem: true}
    ]

    var items = [{name: 'crafting_table', count: 1, usePlank: false, useStem: true},
                 {name: 'button', count: 4, usePlank: true, useStem: true},
                 {name: 'door', count: 3, usePlank: true, useStem: true},
                 {name: 'fence', count: 3, usePlank: true, useStem: true},
                 {name: 'fence_gate', count: 2, usePlank: true, useStem: true},
                 {name: 'planks', count: 4, usePlank: true, useStem: true},
                 {name: 'pressure_plate', count: 4, usePlank: true, useStem: true},
                 {name: 'slab', count: 8, usePlank: true, useStem: true},
                 {name: 'stairs', count: 4, usePlank: true, useStem: true},
                 {name: 'stripped', count: 1, usePlank: true, useStem: true},
                 {name: 'trapdoor', count: 2, usePlank: true, useStem: true}
    ]

    var modIds = ['charm','byg'];

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
        
        var woodType = '';

        if (wood.isLog) {
            woodType = wood.name + '_log';
        } else if(wood.name == 'embur') {
            woodType = 'embur_pedu';
        } else {
            woodType = wood.name + '_stem';
        }

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
                if (item.name == 'stripped') {
                    multiCut(modWoodType, modId + ':' + item.name + '_' + woodType, item.count);
                } else {   
                    
                    if (wood.isStem && !item.useStem) {
                        return
                    } 

                    multiCut(modWoodType, modId + ':' + wood.name + '_' + item.name, item.count);
    
                    if (item.usePlank) {
                        multiCut(modId + ':' + wood.name + '_planks', modId + ':' + wood.name + '_' + item.name, item.count);
                    }
                }
            }
        })

    })
    
})