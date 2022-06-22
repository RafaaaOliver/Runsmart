/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
 define(['N/log','N/currentRecord'], function(log, currentRecord) {

    function pageInit(ctx) {
        var currRecord = ctx.currentRecord
        log.debug(title, 'Script executando...')
        console.log('Script executando...')
    }

    function validateField(ctx) {
        log.debug('validate', 'Entrou no validateField...')
        var customer = ctx.currentRecord;
        if (ctx.fieldId == 'custpageworkflow773'){
            console.log('Achei o botão')
            log.debug('title','Achei o botão')
        }
    }

    

    return {
        pageInit: pageInit,
        validateField: validateField
    }
});
    