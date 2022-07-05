/**
 *@NApiVersion 2.x
 *@NScriptType ClientScript
 */
define(['N/log', 'N/record', 'N/currentRecord'], function(log, record, currentRecord) {

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

    function saveRecord(ctx) {
        
    }

    return {
        pageInit: pageInit,
        saveRecord: saveRecord,
        selecionar: selecionar,
        desmarcar: desmarcar
    }
});
