/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

 define (['N/currentRecord', 'N/search', 'N/log', 'N/url'], function(currentRecord, search, log, url){     
 
    function pageInit(ctx){
        console.log('executei o pageInit...')
        return true
    }

    function abrirReparcelar(){ // função que abrirá o suitelet ao clickar no botão parcelamento
        var page = currentRecord.get();
        var field = page.id
        // /**
        //  * @param {field}
        //  */
        var lista = []
        var busca = search.create({
            type: 'customrecord_contrato_aula4_rafael',
            filters: [
                'custrecord_contrato_principal_rafael', 'IS', field
            ]
        }).run().each(function(resultado){
            lista.push(resultado)
        })
        if (lista.length != 0){
            var suiteletURL = url.resolveScript({
                scriptId: 'customscript_rsc_sl_contratos_rafael',
                deploymentId: 'customdeploy_rsc_sl_contratos_rafael',
                params:{
                    contrato: field
                }
            });
            window.location.replace(suiteletURL)
        }
        else{
            alert('Ops... parece que você aida não tem parcelas com esse registro, então não é necessário reparcelar!')
        }
    }

    return{
        pageInit: pageInit,
        abrirReparcelar: abrirReparcelar
    }

})