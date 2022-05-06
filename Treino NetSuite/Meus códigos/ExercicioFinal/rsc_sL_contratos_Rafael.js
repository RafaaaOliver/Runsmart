/**
 * @NScriptType suitelet
 * @NApiVersion 2.0
 * @Author Rafael Oliveira
 */
define(['N/ui/serverWidget'], function(ui){

    function onRequest(ctx){
        var form = ui.createForm({
            title: 'Reparcelamento Contratos'
        });
        form.addField({
            label: 'Contrato',
            type: ui.FieldType.SELECT,
            id: 'custpage_contrato',
            source: 'customrecord_contrato_aula4_rafael'
        })
        form.addField({
            label: 'parcelamento',
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
        form.addButton({
            id: 'cuspage_salvar',
            label: 'Salvar',
            functionName: 'reparcelar'
        })
        ctx.response.writePage(form);
    }

    return{
        onRequest: onRequest
    }
})