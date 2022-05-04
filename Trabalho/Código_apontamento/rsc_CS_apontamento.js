/**
* @NScriptType ClientScript
* @NApiVersion 2.0
* @Authors Rafael Oliveira & Gabriel Pavia
*/
define(['N/currentRecord','N/search', 'N/log', 'N/ui/dialog'], function(record, search, log, dialog){

    function saveRecord(ctx){
        try{
            var apontamento = ctx.currentRecord
            console.log('Esperança')
            // if (ctx.fieldId == 'custrecord1500'){
                var field = apontamento.getValue('custrecord_rsc_horasatuadas_rafael')
                var pontos = field.indexOf(':')
                var horas = field.slice(0, pontos)
                var minutos = field.slice(pontos +1)
                console.log('Estou rodando...')
                console.log(horas)
                console.log(minutos)

                var ErroTamanho = {
                    title: 'Tamanho inválido!!!',
                    message: 'Por favor, forneça no máximo cinco caracteres (hh:mm)'
                }

                var ErroTipo = {
                    title: 'O formato está inválido!!!',
                    message: 'Digite as horas de acordo com o seguinte exemplo: (hh:mm)'
                }
                if(field){
                    if(field.length == 5){
                        if(horas == Number(horas) && minutos == Number(minutos) && field[2] == ':'){
                            return true
                        }else{
                            dialog.alert(ErroTipo)
                            return false
                        }
                    }else{
                        dialog.alert(ErroTamanho)
                        return false
                    }
                }else{
                    return true
                }
        }catch(e){
            log.debug('Erro', e)
        }
    }
    
    return{
        saveRecord: saveRecord
    }
})