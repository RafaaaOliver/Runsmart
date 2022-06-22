/**
 *@NApiVersion 2.1
 *@NScriptType ClientScript
 */
 define(['N/log','N/email'], function(log, email) {

    function pageInit(ctx) {

    }

    
    function emailDisparo(){
        log.debug('teste', 'entrou na func do user')
    }
    

    return {
        pageInit: pageInit
    }
});
    