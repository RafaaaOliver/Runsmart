/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
define(['N/currentRecord', 'N/log', 'N/search'], function(currentRecord, log, search){
    
    function beforeSubmit(ctx){
    
        var page = ctx.newRecord;
        var pageId = page.id
        var fieldId = page.getValue('custrecord_contrato_principal_rafael')
        var fieldValor = page.getValue('custrecord_valor_aula4_rafael')
        if(ctx.type == ctx.UserEventType.CREATE){           
            if(fieldId){ // se tem o campo, é parcela
                var listaValores = []
                var busca = search.create({
                    type:'customrecord_contrato_aula4_rafael',
                    filters:[
                        ['custrecord_contrato_principal_rafael', 'IS', fieldId]
                    ],
                    columns: ['custrecord_valor_aula4_rafael']
                }).run().each(function(result){
                    var resultado = result.getValue('custrecord_valor_aula4_rafael')
                        listaValores.push(resultado)
                    return true
                })
                log.debug('listaValores: ', listaValores)
            
                var somaValor = 0
                for (valor in listaValores){
                    somaValor += Number(listaValores[valor])
                }
                log.debug('Valor de todas as parcelas juntas: ', somaValor)
                log.debug('Valor da parcela atual: ', fieldValor)
                var lookup = search.lookupFields({
                    type: 'customrecord_contrato_aula4_rafael',
                    id: fieldId,
                    columns: [
                        'custrecord_valor_aula4_rafael'
                    ]
                })
                // log.debug('Resultado do lookup: ', lookup)
                var  contratoValor = lookup.custrecord_valor_aula4_rafael // jeito certo de usar o objeto da busca
                // var contratoValor = Number(contratoValor)
                // log.debug('Valor limite do contrato: ', contratoValor)
                var somaFinal = somaValor + fieldValor
                log.debug('Soma final: ', somaFinal)

                if(fieldValor >= contratoValor){
                    throw Error('Você ultrapassou o valor do contrato!')
                }
                else if(somaFinal >= contratoValor){
                    throw Error('Você ultrapassou o valor do contrato!')                       
                }
                else{
                    return true
                }
            }
            else{ // se não, é contrato principal
                return true
            }
        }else{ // modo edição
            if(ctx.type == ctx.UserEventType.EDIT){
                if(fieldId){ // se tem o campo, é parcela
                    var listaValores = []
                    var busca = search.create({
                        type:'customrecord_contrato_aula4_rafael',
                        filters:[
                            ['custrecord_contrato_principal_rafael', 'IS', fieldId],
                            'AND',
                            ['internalid', 'NONEOF', pageId]
                        ],
                        columns: ['custrecord_valor_aula4_rafael']
                    }).run().each(function(result){
                        var resultado = result.getValue('custrecord_valor_aula4_rafael')
                            listaValores.push(resultado)
                        return true
                    })
                    log.debug('listaValores: ', listaValores)
                
                    var somaValor = 0
                    for (valor in listaValores){
                        somaValor += Number(listaValores[valor])
                    }
                    log.debug('Valor de todas as parcelas juntas: ', somaValor)
                    log.debug('Valor da parcela atual: ', fieldValor)
                    var lookup = search.lookupFields({
                        type: 'customrecord_contrato_aula4_rafael',
                        id: fieldId,
                        columns: [
                            'custrecord_valor_aula4_rafael'
                        ]
                    })
                    // log.debug('Resultado do lookup: ', lookup)
                    var  contratoValor = lookup.custrecord_valor_aula4_rafael // jeito certo de usar o objeto da busca
                    // var contratoValor = Number(contratoValor)
                    log.debug('Valor limite do contrato: ', contratoValor)
                    var somaFinal = somaValor + fieldValor
                    log.debug('Soma final: ', somaFinal)
        
                    if(fieldValor > contratoValor){
                        throw Error('Você ultrapassou o valor do contrato!')                           
                    }
                    else if(somaFinal > contratoValor){
                            throw Error('Você ultrapassou o valor do contrato!')                      
                    }
                    else{
                        return true
                    }
                }
                else{ // se não, é contrato principal
                    return true
                }
            }
        }  
    }

    return{
        beforeSubmit: beforeSubmit
    }
})