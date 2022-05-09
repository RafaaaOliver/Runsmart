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
            fieldId.isDisabled = true // desativa o campo contrato principal
        }
        // var fieldSL = page.getField('custpage_textogrande')
        // fieldSL.isDisabled = true // desativa ocampo longtext dentro do SuiteLet
    }

    function abrirReparcelar(){ // função que abrirá o suitelet ao clickar no botão parcelamento
        var suiteletURL = url.resolveScript({
            scriptId: 'customscript_rsc_sl_contratos_rafael',
            deploymentId: 'customdeploy_rsc_sl_contratos_rafael'
        });
        window.location.replace(suiteletURL)
    }

    function reparcelar(){ // função de salvar no suitelet
        try{
            var page = currentRecord.get();
            var pageId = page.id
            var contrato = page.getValue('custpage_contrato')
            var parcelas = page.getValue('custpage_parcelamento')
            var jurosAplicado = page.getValue('custpage_juros')
            console.log('contrato: ', contrato)
            console.log('numero de parcelas', parcelas)
            console.log('clickei em salvar')

            var contdate = search.lookupFields({
                type: 'customrecord_contrato_aula4_rafael',
                id: contrato,
                columns: ['custrecord_data_aula4_rafael']
            })
            var contratoVigencia = contdate.custrecord_data_aula4_rafael
            console.log('data de vigencia do contrato: ', contratoVigencia)
            var listaDeJuros = []
            var buscaHistJuros = search.create({
                type:'customrecord_historicojuros_aula4_rafael',
                filters: [
                    'custrecord_jurosreferente_aula4_rafael' , 'IS', jurosAplicado
                ],
                columns: ['custrecord_datavigencia_aula4_rafael']
            }).run().each(function(result){
                listaDeJuros.push(result.getValue('custrecord_datavigencia_aula4_rafael'))
                return true
            })
            console.log('lista de juros: ', listaDeJuros)
        }catch(e){
            console.log('Erro:', e)
        }
    }

    return{
        pageInit: pageInit,
        abrirReparcelar: abrirReparcelar,
        reparcelar: reparcelar
    }
})