/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

define (['N/currentRecord', 'N/search', 'N/log', 'N/url'], function(currentRecord, search, log, url){
  
    function pageInit(ctx){
        var page = ctx.currentRecord;
        var fieldId = page.getField('custrecord_contrato_principal_rafael')
        console.log(' o pageInit está executando')
        if(ctx.mode == 'edit'){
            fieldId.isDisabled = true
        }
    }

    function abrirReparcelar(){ // função que abrirá o suitelet ao clickar no botão parcelamento
        var suiteletURL = url.resolveScript({
            scriptId: 'customscript_rsc_sl_contratos_rafael',
            deploymentId: 'customdeploy2'
        });
        window.location.replace(suiteletURL)
    }

    function reparcelar(){
        var page = currentRecord.get();
        var pageId = page.id
        // alert(new Date())
        var contrato = page.getValue('custpage_contrato')
        var parcelas = page.getValue('custpage_parcelamento')
        console.log(contrato)
        console.log(parcelas)
        console.log('clickei em salvar')
        
    }


    return{
        pageInit: pageInit,
        abrirReparcelar: abrirReparcelar,
        reparcelar: reparcelar
    }
})