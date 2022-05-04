/**
 * @NApiVersion 2.0 
 * @NScriptType UserEventScript
 * @Author Gabriel Scarpelini & Rafael Oliveira
 */

define(['N/search', 'N/record', 'N/log'],
function(search, record, log){
    function beforeLoad(ctx){ // função que é ativada antes de carregar a página 
        try{ 
            var lista = []
            var page = ctx.newRecord; // pega o contexto da página
            if(ctx.type != ctx.UserEventType.EDIT){  // verifica se a página está no modo editar
                var casoId = page.id 
                var cataHora = search.create({  // cria uma busca pelos registros com as seguintes características:
                    type: 'customrecord1452',  // tipo do registro
                    filters:[
                        'custrecord1498', 'IS', casoId // se tem o caso(variável) específico dentro do campo caso do registro
                    ],
                    columns:['custrecord_rsc_horasatuadas_rafael'] // traz o valor da coluna específica
                }).run().each(function(result) { // o .run() roda a pesquisa e para cada resultado o .each faz  
                                                                            // uma ação por meio de uma função
                    lista.push(result.getValue('custrecord_rsc_horasatuadas_rafael')) // adiciona o valor do campo a lista
                    return true // precisa retornar true 
                })

                var valorOriginal = page.getValue('custevent6') // campo hora casos do registro caso
                log.debug('valor da lista' , lista)
                log.debug('valor do hora casos', valorOriginal)
                var listaNova = []

                for (i in lista){ // lista criada com a pesquisa da linha 15
                    var pontos = lista[i].indexOf(':') // pega o indice que contém os dois pontos
                    var horas = lista[i].slice(0, pontos) // fatia do começo até os pontos e coloca em uma variável
                    var minutos = lista[i].slice(pontos +1) // pega o conteúdo a partir do ponto e colcoa em variável
                    horas = Number(horas)
                    minutos = Number(minutos)
                    var HoraMin = horas*60 + minutos // transforma a hora em minuto e soma com os minutos
                    listaNova.push(HoraMin)  // coloca a data formatada em minutos em uma lista para facilitar a soma
                }
                log.debug('id da pg caso', casoId)
                log.debug('lista de valores', listaNova)
                var soma = 0
                for ( i in listaNova){
                    soma += listaNova[i] // soma todos os minutos/horas da lista 
                }        
                var hora = Math.floor(soma/60) // divisão truncada para pegar as horas
                var minuto = soma%60 // divisão com "mod" para pegar o resto (minutos)
                
                if(minuto >=10){ // faz a verificação para o minuto não ficar apenas com uma casa
                    minuto = minuto.toString()
                }else{
                    minuto = minuto.toString()
                    minuto = '0' + minuto
                }
                
                hora = hora.toString() // transforma o número em string novamente
                
                var final = (hora + ':' + minuto) // constroi o formato hora por meio de concatenação
                
                var load1 = record.load({ // carrega o registro
                    type: 'supportcase',
                    id: casoId
                })
                load1.setValue({ // muda o campo do registro
                    fieldId:'custevent6',
                    value: final,
                    ignoreFieldChange: true})
                load1.save({ignoreMandatoryFields: true}) // e o salva novamente
                // log.debug('hora', hora)
                // log.debug('minuto', minuto)
                // log.debug('valor final', final)
                // log.debug('valor do campo', valorFinal)
            }
        }catch(e){
            log.debug('Erro', e ) // recebe qualquer e retorna uma mensagem
            }
        }
    return{
        beforeLoad: beforeLoad
    }
})