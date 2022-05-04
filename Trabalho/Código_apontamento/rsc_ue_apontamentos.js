/**
 * @NApiVersion 2.0 
 * @NScriptType UserEventScript
 * @Author Gabriel Scarpelini & Rafael Oliveira
 */

define(['N/search', 'N/record', 'N/log'],
function(search, record, log){
    function beforeLoad(ctx){
        try{
            var lista = []
            var page = ctx.newRecord;
            if(ctx.type != ctx.UserEventType.EDIT){
                var casoId = page.id
                var cataHora = search.create({
                    type: 'customrecord1452',
                    filters:[
                        'custrecord1498', 'IS', casoId
                    ],
                    columns:['custrecord_rsc_horasatuadas_rafael']
                }).run().each(function(result) {
                    lista.push(result.getValue('custrecord_rsc_horasatuadas_rafael'))
                    return true
                })

                var valorOriginal = page.getValue('custevent6')
                log.debug('valor da lista' , lista)
                log.debug('valor do hora casos', valorOriginal)
                var listaNova = []

                for (i in lista){
                    var pontos = lista[i].indexOf(':')
                    var horas = lista[i].slice(0, pontos)
                    var minutos = lista[i].slice(pontos +1)
                    horas = Number(horas)
                    minutos = Number(minutos)
                    var HoraMin = horas*60 + minutos
                    listaNova.push(HoraMin)
                }
                log.debug('id da pg caso', casoId)
                log.debug('lista de valores', listaNova)
                var soma = 0
                for ( i in listaNova){
                    soma += listaNova[i]
                }        
                var hora = Math.floor(soma/60)
                var minuto = soma%60
                
                if(minuto >=10){
                    minuto = minuto.toString()
                }else{
                    minuto = minuto.toString()
                    minuto = '0' + minuto
                }
                
                hora = hora.toString()
                
                var final = (hora + ':' + minuto)
                
                var load1 = record.load({
                    type: 'supportcase',
                    id: casoId
                })
                load1.setValue({
                    fieldId:'custevent6',
                    value: final,
                    ignoreFieldChange: true})
                load1.save({ignoreMandatoryFields: true})
                // log.debug('hora', hora)
                // log.debug('minuto', minuto)
                // log.debug('valor final', final)
                // log.debug('valor do campo', valorFinal)
            }
        }catch(e){
            log.debug('Erro', e )
            }
        }
    return{
        beforeLoad: beforeLoad
    }
})