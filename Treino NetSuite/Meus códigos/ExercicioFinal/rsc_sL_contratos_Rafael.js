/**
 * @NScriptType suitelet
 * @NApiVersion 2.0
 * @Author Rafael Oliveira
 */
define(['N/ui/serverWidget', 'N/log'], function(ui, log){

    /**
     *  
     * @param {Object} ctx 
     * @param {ServerRequest} ctx.request
     * @param {ServerRequest} ctx.response
     * @since 2015.2
     */

    function onRequest(ctx){
        var parameter = ctx.request.parameters;
        // var field = parameter.field
        log.debug('foi: ', parameter.field)
        var form = ui.createForm({
            title: 'Reparcelamento Contratos'
        });

        var contrato = form.addField({
            label: 'Contrato',
            type: ui.FieldType.SELECT,
            id: 'custpage_contrato',
            source: 'customrecord_contrato_aula4_rafael'
        }).updateDisplayType({displayType: ui.FieldDisplayType.INLINE})      
        contrato.defaultValue = parameter.field

        form.addField({
            label: 'Número de parcelas',
            type: ui.FieldType.SELECT,
            id:'custpage_parcelamento',
            source: 'customlist_contrato_numeroparcelas_raf'
        })
        form.addField({
            label: 'juros',
            type: ui.FieldType.SELECT,
            id: 'custpage_juros',
            source: 'customrecord_jurosaplicados_aula4_rafael'
        })
        form.addField({
            label: 'Resumo do reparcelamento',
            type: ui.FieldType.LONGTEXT,
            id: 'custpage_textogrande'
        }).updateDisplayType({displayType: ui.FieldDisplayType.DISABLED})
        form.addButton({
            id: 'cuspage_salvar',
            label: 'Salvar',
            functionName: 'reparcelar'
        })
        form.addButton({
            id: 'cuspage_resumo',
            label: 'Atualizar resumo',
            functionName: 'resumo'
        })
        ctx.response.writePage(form);
        form.clientScriptModulePath = './rsc_cs_contratos_Rafael.js'
    }

    return{
        onRequest: onRequest
    }
})