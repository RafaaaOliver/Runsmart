/**
 *@NApiVersion 2.x
 *@NScriptType MapReduceScript
 */
define(['N/search'], function(search) {

    function getInputData() {
        return search.create({
            type: 'inventoryworksheet',
            filters: ["custbody_status_ae", "IS", ""],
            columns: [
              "internalId"  
            ]
        })
    }

    function map(ctx) {
        log.debug('ctx', ctx)
    }

    function reduce(context) {
        
    }

    function summarize(summary) {
        
    }

    return {
        getInputData: getInputData,
        map: map,
        reduce: reduce,
        summarize: summarize
    }
});
