/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/log', 'N/record', 'N/currentRecord', 'N/ui/message'], function(log, record, currentRecord, message) {

    function pageInit(ctx) {
        console.log('rodei')
    }

    function selecionar(){
        var page = currentRecord.get()
        var count = page.getLineCount({ sublistId: 'custpage_sublistplanilhas' });
        for(var i = 0; i < count; i++){
            page.selectLine({sublistId: "custpage_sublistplanilhas",line: i})
            page.setCurrentSublistValue({ sublistId: 'custpage_sublistplanilhas', fieldId: 'custpage_marcarplanilha', value: true, ignoreFieldChange: true });
            page.commitLine({ sublistId: 'custpage_sublistplanilhas' });
        }
    }

    function desmarcar(){
        var page = currentRecord.get()
        var count = page.getLineCount({ sublistId: 'custpage_sublistplanilhas' });
        for(var i = 0; i < count; i++){
            page.selectLine({sublistId: "custpage_sublistplanilhas",line: i})
            page.setCurrentSublistValue({ sublistId: 'custpage_sublistplanilhas', fieldId: 'custpage_marcarplanilha', value: false, ignoreFieldChange: true });
            page.commitLine({ sublistId: 'custpage_sublistplanilhas' });
        }
    }

    function aprovado() { 
        var page = currentRecord.get()
        var numLines = page.getLineCount({
            sublistId: 'custpage_sublistplanilhas'
        });
        var lista = []
        for(var i = 0; i < numLines; i++) {
            var checkbox = page.getSublistValue({
                sublistId: 'custpage_sublistplanilhas',
                fieldId: 'custpage_marcarplanilha',
                line: i
            });
            if(checkbox) {
                var campoId = page.getSublistValue({
                    sublistId: 'custpage_sublistplanilhas',
                    fieldId: 'custpage_planilha',
                    line: i
                });
                lista.push(campoId)
            }
        }
        if(lista.length == 0){
            return alert("Você precisa selecionar uma planilha de estoque para prosseguir!")
        }
        if(confirm("Tem certeza que deseja aprovar?")) {
            main(2, page, lista)
        }
    }

    function rejeitado() {
        var page = currentRecord.get()
        var numLines = page.getLineCount({
            sublistId: 'custpage_sublistplanilhas'
        });
        var lista = []
        for(var i = 0; i < numLines; i++) {
            var checkbox = page.getSublistValue({
                sublistId: 'custpage_sublistplanilhas',
                fieldId: 'custpage_marcarplanilha',
                line: i
            });
            if(checkbox) {
                var campoId = page.getSublistValue({
                    sublistId: 'custpage_sublistplanilhas',
                    fieldId: 'custpage_planilha',
                    line: i
                });
                lista.push(campoId)
            }
        }
        if(lista.length == 0){
            return alert("Você precisa selecionar uma planilha de estoque para prosseguir!")
        }
        if(confirm("Tem certeza que deseja rejeitar?")) {
            main(3, page, lista)
        }
    }

    function main(aprova_OR_Rejeita, page, lista) {
        for(var i = 0; i < lista.length; i++) {
            var campoId = page.getSublistValue({
                sublistId: 'custpage_sublistplanilhas',
                fieldId: 'custpage_planilha',
                line: i
            });
            var registro = record.load({
                type: 'inventoryworksheet',
                id: campoId,
                isDynamic: true
            })
            registro.setValue('custbody_status_ae', aprova_OR_Rejeita)
            registro.save()
        }

        var process = message.create({
            title: 'Sucesso',
            message: 'Status da Planilha de estoque editado com sucesso!',
            type: message.Type.CONFIRMATION
        });
        process.show({
            duration: 70000 
        });
        var link = '/app/site/hosting/scriptlet.nl?script=712&deploy=1'
        window.location.replace(link)
    }
    return {
        pageInit: pageInit,
        selecionar: selecionar,
        desmarcar: desmarcar,
        aprovado: aprovado, 
        rejeitado: rejeitado
    }
});
