require({
    packages: [
        {
            name: "jquery",
            location: "//ajax.googleapis.com/ajax/libs/jquery/1.9.0",
            main: "jquery.min"
        },
        {
            name: "underscore",
            location: "//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.4",
            main: "underscore-min"
        },
        {
            name: "extjs",
            location: "//d16l3xhd6wlg5a.cloudfront.net",
            main: "ext-all"
        },
        {
            name: "tv4",
            location: location.pathname.replace(/\/[^/]+$/, "") + "plugins/layer_selector/lib",
            main: "tv4.min"
        }
    ]
});

define([
        'dojo/_base/declare',
        'framework/PluginBase',
        'jquery',
        'use!extjs',
        './layerManager',
        './templates',
        './lib/filteredTreePanel'
    ],
    function (declare, PluginBase, $, Ext, layerManager, tmpl) {
        return declare(PluginBase, {
            toolbarName: "Map Layers Lite",
            fullName: "Configure and control layers to be overlayed on the base map.",
            toolbarType: "sidebar",
            allowIdentifyWhenActive: true,

            store: null,
            currentState: null,

            initialize: function (frameworkParameters, currentRegion) {
                declare.safeMixin(this, frameworkParameters);

                var $el = $(tmpl.TEMPLATE_LAYER_SELECTOR),
                    $treeContainer = $el.find('.tree-container'),

                    store = Ext.create('Ext.data.TreeStore', {
                        root: {expanded: true}
                    }),

                    //tree = Ext.create('FilteredTreePanel', {
                    tree = Ext.create('Ext.tree.Panel', {
                        store: store,
                        rootVisible: false,
                        animate: false
                    }),

                    layers = layerManager.getLayers(currentRegion);

                $(this.container)
                    .addClass('pluginLayerSelectorLite')
                    .append($el);
                tree.render($treeContainer.get(0));

                this.store = store;
                this.currentRegion = currentRegion;

                this.setLayers(layers);
            },

            activate: function() {
            },

            deactivate: function() {
            },

            onContainerVisibilityChanged: function(visible) {
            },

            hibernate: function() {
            },

            resize: function(dx, dy) {
            },

            getState: function() {
                return this.currentState;
            },

            setState: function(state) {
                this.currentState = state;
            },

            subregionActivated: function(subregion) {
                var layers = layerManager.getLayers(subregion);
                this.setLayers(layers);
            },

            subregionDeactivated: function(subregion) {
            },

            setLayers: function(layers) {
                var store = this.store;
                store.removeAll();
                _.each(layers, function(layerService) {
                    var loader = layerManager.getLoader(layerService);
                    store.appendChild(loader.makeRootNode(layerService));
                });
            }
        });
    }
);
