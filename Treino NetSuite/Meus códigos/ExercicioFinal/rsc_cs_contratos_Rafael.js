/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

define (['N/currentRecord', 'N/search', 'N/log'], function(currentRecord, search, log){
  
    function pageInit(ctx){
        var page = ctx.currentRecord;
        var fieldId = page.getField('custrecord_contrato_principal_rafael')
        console.log(' o pageInit está executando')
        console.log('de vdd')
        if(ctx.mode == 'edit'){
            fieldId.isDisabled = true
        }
    }
    return{
        pageInit: pageInit
    }
})