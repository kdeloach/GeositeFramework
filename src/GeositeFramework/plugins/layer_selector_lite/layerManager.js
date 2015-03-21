define([
        'use!underscore',
        'dojo/json',
        'use!tv4',
        'framework/Logger',
        'dojo/text!./layers.json',
        './layerConfigSchema',
        './agsLoader',
        './wmsLoader'
    ],
    function (_, JSON, tv4, Logger, layerSourcesJson, layerConfigSchema,
              agsLoader, wmsLoader) {
          
        var log = new Logger('layer_selector_lite/Logger');
        
        function load(layers) {
            // ...
        }
        
        function getLayers(subregion) {
            var result = parseLayerConfigData(layerSourcesJson);
            return filterLayers(result, subregion);
        }
          
        function parseLayerConfigData(layerSourcesJson) {
            // Parse and validate config data to get URLs of layer sources
            var errorMessage;
            try {
                var data = JSON.parse(layerSourcesJson),
                    valid = tv4.validate(data, layerConfigSchema);
                if (valid) {
                    return data;
                } else {
                    errorMessage = tv4.error.message + ' (data path: ' + tv4.error.dataPath + ')';
                }
            } catch (e) {
                errorMessage = e.message;
            }
            log.error('', 'Error in config file layers.json: ' + errorMessage);
        }
        
        // layerData is now an array of layers to load, which may have `availableInRegion` keys
        // which restrict what subregions they are loaded for.  If no keys are present, make
        // no restriction.  If "main" is included in the list, the layer is available in the
        // main region, in addtion to any listed subregions.
        // ['a'] -> just subregion A, main
        // ['a', 'b'] -> both A and B, not main
        // ['b', 'main'] -> main region and B
        // []/null/undefined -> all regions
        function filterLayers(layers, subregion) {
            // TODO: Remove
            return layers;
            
            if (!subregion) {
                return layers;
            }

            return _.filter(layers, function(layer) {
                var layerRegions;
                if (layer.agsSource) {
                    layerRegions = layer.agsSource.availableInRegions;
                } else if (layer.wmsSource) {
                    layerRegions = layer.wmsSource.availableInRegions;
                }
                return !_.any(layerRegions) || _.contains(layerRegions, subregion);
            });
        }
        
        function getLoader(layerService) {
            if (layerService.agsSource) {
                return agsLoader;
            } else if (layerService.wmsSource) {
                return wmsLoader;
            }
            log.error('', 'Unknown layer service type (only AGS and WMS supported)');
            return null;
        }
      
        return {
            load: load,
            getLayers: getLayers,
            getLoader: getLoader
        };
    }
);