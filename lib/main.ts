let selectorArr = [],
    searchValue = '',
    exact = false,
    nodeName = '',
    findChildren = false
    

mg.showUI(__html__, {width: 320, height: 480})
// mg.showUI(options ?: ShowUIOptions): void
type ShowUIOptions = {
    width?: number
    height?: number
}

mg.ui.onmessage = (msg) => {
    const currentPage = mg.document.currentPage;
    // const selectedNodes = currentPage.selection;


    /* 是否有选中节点 */
    // if (selectedNodes.length > 0) {
    //     findChildren = true
    //     for (let i = 0; i < selectedNodes.length; i++) {
    //         traverse(selectedNodes[i], msg, (arr) => {
    //             currentPage.selection = arr
    //         });
    //     }

    // } else {
    //     findChildren = false
        traverse(currentPage, msg, (arr) => {
            currentPage.selection = arr
        });
        console.log('currentPage',selectorArr)
    // }

    selectorArr = []
}


function traverse(node, msg, callback) {
    let regNode = new RegExp("Node", "gi")

    searchValue = msg.searchValue
    exact = msg.exact
    nodeName = msg.activeType + ""
    nodeName = nodeName.replace(regNode, "").toUpperCase()



    if (node.type === nodeName) {

        /* 是否精确匹配 */
        if (exact) {
            // console.log('精确匹配')
            if (node.name === searchValue) {
                selectorArr.push(node)
                callback(selectorArr);
            }
        } else {
            // console.log('模糊匹配')
            if (searchValue === '') {
                selectorArr.push(node)
                callback(selectorArr);
            } else {
                let reg = new RegExp(searchValue, 'gi')

                if (reg.test(node.name)) {
                    selectorArr.push(node)
                    callback(selectorArr);
                }
            }
        }

        if ("children" in node) {
            for (const child of node.children) {
                traverse(child, msg, callback);
            }
        }

        return
    }

    if ("children" in node) {
        for (const child of node.children) {
            traverse(child, msg, callback);
        }
    }

    // console.log(node)

}
