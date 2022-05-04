/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */

 define(['N/currentRecord', 'N/log', 'N/search'],
    function(currentRecord, log, search){
            function beforeLoad(ctx){
                var page = ctx.newRecord;
                var form = ctx.form  // o beforeLoad já possui um form, então podemos apenas puxar ele
                form.addButton({ 
                    id: 'custpage_button_check',
                    label: 'Checar Duplicidade', // criação do botão
                    functionName: 'checar'   // caça a função 'checar'
                });
                form.clientScriptModulePath = './rsc_Aula2_Cs_Rafael.js' // chama o script tbm
                // ctx.response.writePage(form)  // não é necessário escrever o form pois já existe
                log.debug('debug', 'O beforeLoad rodou com sucesso!')
            }

            function beforeSubmit(ctx){ // função antes da submissão
                var page = ctx.newRecord; // o UserEvent não consegue ler o currentRecord, então usamos o newRecord
                if(ctx.type == ctx.UserEventType.CREATE){ // se o contexto for de criação
                    var cavaloId = page.getValue('custrecord_rsc_cocheiracavalo_rafael') // pega o id do campo cavalo
                      var busca = search.create({ // faz uma busca em todos os registros 
                            type:'customrecord_rsc_chocheira_rafael', // que tem esse tipo
                            filters:[
                                ['custrecord_rsc_cocheiracavalo_rafael', 'IS', cavaloId]  // e cumprem essa especificação
                            ]
                        }).run().getRange({ // o .run() executa a busca e o getRange indica o alcance (no caso retorna uma lista com um objeto)
                            start:0,
                            end:1
                        })
                        // se a busca não encontrar nada, retornará uma lista vazia [] != null
                        if (busca.length != 0){ // se a lista conter algo faça:
                            throw Error("Você não pode cadastrar esse cavalo") // alert do lado do servidor

                        }
                        if (busca.length == 0){ // se a lista estiver vazia, faça:
                            return true
                        }                                       
                }
                else{ // aqui o código é quase igual, o problema era que se eu tentasse editar o nome da cocheira, daria conflito
                    // na hora de salvar, pois o cavalo apontaria que já está cadastrado em um registro (que é o que eu estou editando),
                    // então eu coloquei que no modo de edição, ele irá ignorar o registro atual na hora de escolher o cavalo

                    if(ctx.type == ctx.UserEventType.EDIT){ // se o contexto for de edição
                        var cavaloId = page.getValue('custrecord_rsc_cocheiracavalo_rafael')
                        var pageId = page.id
                        if (!cavaloId){
                            return true
                        }else{
                            var busca = search.create({
                                type:'customrecord_rsc_chocheira_rafael',
                                filters:[
                                    ['custrecord_rsc_cocheiracavalo_rafael', 'IS', cavaloId], 
                                    'AND',  
                                    ['internalId', 'NONEOF', pageId] // condição para não buscar o registro atual
                                ]
                            }).run().getRange({
                                start:0,
                                end:1
                            })
                            
                            if (busca.length != 0){
                                throw Error("Você não pode cadastrar esse cavalo") // alert do lado do servidor
    
                            }
                            if (busca.length == 0){
                                return true
                            }
                        }
                    }
                }  
            }
        return{
            beforeLoad: beforeLoad,
            beforeSubmit: beforeSubmit
        }
        
    })