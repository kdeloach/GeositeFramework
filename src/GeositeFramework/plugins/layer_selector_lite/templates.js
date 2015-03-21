define(function() {
    var TEMPLATE_LAYER_SELECTOR = '' +
        '<div class="outer">' +
        '    <div class="search">' +
        '        <input type="text" placeholder="Filter Map Layers"/>' +
        '        <a class="clear" href="javascript:;">Clear All</a>' +
        '    </div>' +
        '    <div class="rest">' +
        '        <div class="tree-container"></div>' +
        '    </div>' +
        '</div>',

    TEMPLATE_LAYER_INFO_BOX = '' +
        '<div class="info-box">' +
        '    <div class="close">&#10006;</div>' +
        '    <div class="body">' +
        '        <div class="description" style="display: none">' +
        '            <div class="info-label">Description:</div>' +
        '            <div class="info-value"></div>' +
        '        </div>' +
        '        <div class="opacity" style="display: none">' +
        '            <div class="info-label">Opacity:</div>' +
        '            <div class="info-value"></div>' +
        '        </div>' +
        '        <div class="spinner"></div>' +
        '    </div>' +
        '</div>';
    return {
        TEMPLATE_LAYER_SELECTOR: TEMPLATE_LAYER_SELECTOR,
        TEMPLATE_LAYER_INFO_BOX: TEMPLATE_LAYER_INFO_BOX
    };
});