/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

define (['N/currentRecord', 'N/search', 'N/log'], function(currentRecord, search, log){
  
    function pageInit(ctx){
        var page = ctx.currentRecord;
        var fieldId = page.getField('custrecord_contrato_principal_rafael')
        console.log(' o pageInit está executando')
        console.log('de vdd')
        if(ctx.mode == 'edit'){
            fieldId.isDisabled = true
        }
    }

    function saveRecord(ctx){
        try{
            var page = ctx.currentRecord;
            var pageId = page.id
            var fieldId = page.getValue('custrecord_contrato_principal_rafael')
            var fieldValor = page.getValue('custrecord_valor_aula4_rafael')
            if(ctx.mode == 'create' || 'copy'){
                
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
                    console.log('listaValores: ', listaValores)
                
                    var somaValor = 0
                    for (valor in listaValores){
                        somaValor += Number(listaValores[valor])
                    }
                    console.log('Valor de todas as parcelas juntas: ', somaValor)
                    console.log('Valor da parcela atual: ', fieldValor)
                    var lookup = search.lookupFields({
                        type: 'customrecord_contrato_aula4_rafael',
                        id: fieldId,
                        columns: [
                            'custrecord_valor_aula4_rafael'
                        ]
                    })
                    // console.log('Resultado do lookup: ', lookup)
                    var  contratoValor = lookup.custrecord_valor_aula4_rafael // jeito certo de usar o objeto da busca
                    // var contratoValor = Number(contratoValor)
                    // console.log('Valor limite do contrato: ', contratoValor)

                    if(fieldValor >= contratoValor){
                        alert('Você ultrapassou o valor do contrato!')
                        return false
                    }
                    else if((somaValor + fieldValor) >= contratoValor){
                        alert('Você ultrapassou o valor do contrato!')
                        return false                        
                    }
                    else{
                        return true
                    }
                }
                else{ // se não, é contrato principal
                    return true
                }
            }

            if(ctx.mode == 'edit'){
                if(fieldId){ // se tem o campo, é parcela
                    console.log('mudança no edit...')
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
                    console.log('listaValores: ', listaValores)
                
                    var somaValor = 0
                    for (valor in listaValores){
                        somaValor += Number(listaValores[valor])
                    }
                    var contaFinal = somaValor + fieldValor
                    console.log('Valor de todas as parcelas juntas: ', somaValor)
                    console.log('Valor da parcela atual: ', fieldValor)
                    console.log('Está na lista?: ', contaFinal)
                    var lookup = search.lookupFields({
                        type: 'customrecord_contrato_aula4_rafael',
                        id: fieldId,
                        columns: [
                            'custrecord_valor_aula4_rafael'
                        ]
                    })
                    // console.log('Resultado do lookup: ', lookup)
                    var  contratoValor = lookup.custrecord_valor_aula4_rafael // jeito certo de usar o objeto da busca
                    // var contratoValor = Number(contratoValor)
                    // console.log('Valor limite do contrato: ', contratoValor)

                    if(fieldValor >= contratoValor){
                        alert('Você ultrapassou o valor do contrato!')
                        return false
                    }
                    else if(contaFinal >= contratoValor){
                        alert('Você ultrapassou o valor do contrato!')
                        return false                        
                    }
                    else{
                        return true
                    }
                }
                else{ // se não, é contrato principal
                    return true
                }
            }   
        }catch(e){
            log.debug('Erro genérico', e)
        }    
    }
   
    return{
        pageInit: pageInit,
        saveRecord:saveRecord
    }
})