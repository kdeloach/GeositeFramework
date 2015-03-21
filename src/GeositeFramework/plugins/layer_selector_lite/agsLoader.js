define(['use!underscore'], function(_) {

    function makeNode(data) {
        if (data.agsSource) {
            return makeRootNode(data.agsSource);
        }
        return makeChildNode(data);
    }

    function makeRootNode(data) {
        return {
            leaf: false,
            text: data.folderTitle,
            cls: 'disabled',
            children: _.map(data.folders, makeNode)
        };
    }
    
    function makeChildNode(data) {
        return {
            leaf: true,
            text: data.folderTitle,
            cls: 'disabled',
            children: _.map(data.folders, makeNode)
        };
    }

    return {
        makeNode: makeNode
    };
});