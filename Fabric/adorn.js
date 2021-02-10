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

    var terrestriaWoods = [{name: 'cypress', isLog: true, isStem: false, hasPlank: true},
                      {name: 'hemlock', isLog: true, isStem: false, hasPlank: true},
                      {name: 'japanese_maple', isLog: true, isStem: false, hasPlank: true},
                      {name: 'rainbow_eucalyptus', isLog: true, isStem: false, hasPlank: true},
                      {name: 'redwood', isLog: true, isStem: false, hasPlank: true},
                      {name: 'rubber', isLog: true, isStem: false, hasPlank: true},
                      {name: 'sakura', isLog: true, isStem: false, hasPlank: true},
                      {name: 'willow', isLog: true, isStem: false, hasPlank: true},
    ];

    var traverseWoods = [
        {name: 'fir', isLog: true, isStem: false, hasPlank: true},
    ]

    var bygWoods = [
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

    var woodsAndMireWoods = [
        {name: 'pine', isLog: true, isStem: false, hasPlank: true}
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

            var woodType = wood.isLog ? wood.name + '_log' : wood.name + '_stem';        

            if (modName) {
                baseItems.forEach(function(item, index) {            
                    multiCut(modName + ':' + woodType, modId + ':' + modName + separator + wood.name + '_' + item.name, item.count);                    
        
                    if (item.usePlank && item.plankCount > 0) {
                        multiCut(modName + ':' + wood.name + '_planks', modId + ':' + modName + separator + wood.name + '_' + item.name, item.plankCount);                        
                    }
                })
            } else {
                baseItems.forEach(function(item, index) {            
                    multiCut(woodType, modId + ':' + wood.name + '_' + item.name, item.count);
        
                    if (item.usePlank && item.plankCount > 0) {
                        multiCut(wood.name + '_planks', modId + ':' + wood.name + '_' + item.name, item.plankCount);                
                    }
                })
            }
            
        })   
       
    }

    createWoodCut(woods);

    if (IsModLoaded('terrestria')) {
        console.info('Loading Terrestria Wood Types');
        createWoodCut(terrestriaWoods, 'terrestria');
    }

    if (IsModLoaded('traverse')) {
        console.info('Loading traverse Wood Types');
        createWoodCut(traverseWoods, 'traverse');
    }

    if (IsModLoaded('byg')) {
        console.info('Loading byg Wood Types');
        createWoodCut(bygWoods, 'byg', '/');
    }

    if (IsModLoaded('woods_and_mires')) {
        console.info('Loading byg Woods and Mires Types');
        createWoodCut(woodsAndMireWoods, 'woods_and_mires', '/');
    }    
    
})