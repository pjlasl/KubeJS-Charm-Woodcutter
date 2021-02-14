onEvent('recipes', event => {
    
    var modId = 'xb';
    
    var modType   = 'minecraft:woodcutting';  

    var woods = [ {name: 'acacia', type: 'log', suffixs: [{name: 'log', char: 's1u'},{name: 'planks', char: 's1n'},{name: 'stripped', char: 's1v'},{name: 'wood', char: 's1t'}]},
                  {name: 'birch', type: 'log', suffixs: [{name: 'log', char: 's1x'},{name: 'planks', char: 's1s'},{name: 'stripped', char: 's1y'},{name: 'wood', char: 's1w'}]},
                  {name: 'dark_oak', type: 'log', suffixs: [{name: 'log', char: 's23'},{name: 'planks', char: 's1q'},{name: 'stripped', char: 's24'},{name: 'wood', char: 's22'}]},
                  {name: 'jungle', type: 'log', suffixs: [{name: 'log', char: 's26'},{name: 'planks', char: 's1r'},{name: 'stripped', char: 's27'},{name: 'wood', char: 's25'}]},
                  {name: 'oak', type: 'log', suffixs: [{name: 'log', char: 's20'},{name: 'planks', char: 's1p'},{name: 'stripped', char: 's21'},{name: 'wood', char: 's1z'}]},
                  {name: 'spruce', type: 'log', suffixs: [{name: 'log', char: 's29'},{name: 'planks', char: 's1o'},{name: 'stripped', char: 's2a'},{name: 'wood', char: 's28'}]},
                  {name: 'crimson', type: 'stem', suffixs: [{name: 'stem', char: 's2i'},{name: 'planks', char: 's2f'},{name: 'stripped', char: 's2j'},{name: 'hyphae', char: 's2g'}]},
                  {name: 'warped', type: 'stem', suffixs: [{name: 'stem', char: 's2n'},{name: 'planks', char: 's2k'},{name: 'stripped', char: 's2m'},{name: 'hyphae', char: 's2l'}]},
    ]

    var baseItems = [{name: '?a0', count: 8, usePlank: true, useStem: true, plankCount: 2},
                     {name: '?a2', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?a3', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?a4', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?a5', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?a6', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?a7', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?a9', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?a8', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?ad', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?ac', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?aa', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?af', count: 4, usePlank: true, useStem: true, plankCount: 1},
                     {name: '?ae', count: 8, usePlank: true, useStem: true, plankCount: 2},
                     {name: '?a1', count: 8, usePlank: true, useStem: true, plankCount: 2}
                     
    ]

    var modIds = ['charm','xb'];

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

    // Remove Exotic block recipes from stonecutter
    // Using the tag ensures all minecraft log/planks are not available in the stonecutter
    event.remove({input: '#minecraft:logs', type: 'minecraft:stonecutting'})
    event.remove({input: '#minecraft:planks', type: 'minecraft:stonecutting'})
    
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
        
        arr.forEach(function(wood, index) {            

            wood.suffixs.forEach(function(suffix, index) {

                var woodType = suffix.name == 'stripped' ? suffix.name + '_' +  wood.name + '_' + wood.type : wood.name + '_' + suffix.name;

                baseItems.forEach(function(item, index) {
                    
                    var i = item.name.replace('?', suffix.char);
                    var c = suffix.name == 'planks' ? item.plankCount : item.count;

                    multiCut(woodType, modId + ':' + i, c);
                })            

            })            
            
        })   
       
    }

    createWoodCut(woods);
    
})