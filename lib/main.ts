let selectorArr = [],
    searchValue = '',
    exact = false

mg.showUI(__html__)
// mg.showUI(options ?: ShowUIOptions): void
type ShowUIOptions = {
    width?: number
    height?: number
}

// mg.showUI(__html__, { width: '320px', height: '600' })

mg.ui.onmessage = (msg) => {
    let searchLayer = [];


    const currentPage = mg.document.currentPage;
    // const selectedNodes = currentPage.selection;

    traverse(currentPage, msg, (arr) => {
        currentPage.selection = arr
    });
    selectorArr = []
}


function traverse(node, value, callback) {
    searchValue = value.searchValue
    exact = value.exact

    /* 是否精确匹配 */
    if (exact) {
        console.log('精确匹配')
        if (node.name === searchValue) {
            selectorArr.push(node)
            callback(selectorArr);
        }
    } else {
        console.log('模糊匹配')
        let reg = new RegExp(searchValue, 'gi')
        
        if (reg.test(node.name)) {
            selectorArr.push(node)
            callback(selectorArr);
        }
    }

    if ("children" in node) {
        for (const child of node.children) {
            traverse(child, value, callback);
        }
    }
}
