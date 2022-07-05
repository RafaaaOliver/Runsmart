/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 *@Authors Rafael Oliveira & Gabriel Scarpelini
 */
define(['N/record', 'N/log'], function(record, log) {

    function beforeLoad(ctx) {
        log.audit('debug','rodei')
    }

    function beforeSubmit(ctx) {
        
    }

    function afterSubmit(ctx) {
        // search.create({
        //     type: string,
        //     filters: ,
        //     columns: ,
        // })
        log.audit('ctx', ctx)
    }

    return {
        beforeLoad: beforeLoad,
        beforeSubmit: beforeSubmit,
        afterSubmit: afterSubmit
    }
});
