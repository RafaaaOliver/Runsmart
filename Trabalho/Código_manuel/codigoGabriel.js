/**
 * @NApiVersion 2.x
 * @NScriptType UserEventScript
 * 
 */
 
 define(["N/record","N/log"], function (record_1, log_1) {
    try{    
        let reqRes = JSON.parse(context.value)
        log.debug(reqRes)
        let form_casos = record_1.default.load({id: reqRes.id, type: "custform_39_t1442054_651"});
        let hora_casos = record_1.default.load({id: reqRes.id, type: "customrecord1452"}); 
        let hora = Date(hora_casos.getValue({fieldId: "custrecord1500"}));
        horaAtuada.somaHora(hora)
        colocaValor(horaAtuada)
        form_casos.save({
            ignoreMandatoryFields: true
        });
    }
    catch (erro){
        log_1.default.error('Algo deu errado', erro);
        return false;
    }
      
    function colocaValor(hora){
        return form_casos.setValue({
            fieldId: "custevent6",
            value: hora
        })
    }
    const horaAtuada = {
        hora: 0,

        somaHora(hora){
            horaAtuada += hora
        }
    }
})



