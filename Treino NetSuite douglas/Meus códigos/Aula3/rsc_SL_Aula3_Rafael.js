/**
 * @NScriptType suitelet
 * @NApiVersion 2.0
 * @Developer Rafael Oliveira
 */
define(['N/log', 'N/record'], 
    function(log, record ){    
        function onRequest(ctx){ // função para receber o JSON de uma API e converter em string
            var params = ctx.request.body; // recebe o JSON
            var convertido = JSON.parse(params) // transformar o JSON em objeto
            var parceiroLista = convertido.partners // pega a lista partners que está no JSON
            var objRetorno = {} // Objeto que manda mensagem de erro ou sucesso para a API
            var erros = [] // lista de erros
            var ordem = 0 // variável para mostrar qual o número do parceiro
            objRetorno.OK = true  // mensagem de .OK = true
            if (parceiroLista){  // se parceiro em lista:
                // log.debug('Corpo', params)
                // log.debug('CorpoNovo', convertido)
                // log.debug('Parceiro:', parceiro)
                for (var i in parceiroLista) {  // para cada indice na lista partners faça um registro:
                    ordem++ 
                    var nome = parceiroLista[i].name 
                    if (nome){ // verifico se há o campo nome dentro do JSON
                        var registro = record.create({
                            type: 'customrecord_json_integracao_rd'
                        })
                        registro.setValue('custrecord_processado_rafael', 2) // defina como não processado
                        registro.setValue('custrecord_json_rafael', JSON.stringify(parceiroLista[i])) // função para
                                                                                    // transformar o JSON em string
                        registro.save({ignoreMandatoryFields: true}) // salva os registros (ainda dentro do for)
                    }else{ // se o campo não existir:
                        erros.push('O campo nome do partners ' + ordem + ' não está preenchido') // adiciona a 
                                                                                    // mensagem de erro a lista
                        objRetorno.OK = false // seta o .OK = false
                    }
                }
                objRetorno.Erros = erros  // cria o objeto Erros em objRetorno e seta como = erros
                log.debug('objReturn', objRetorno) // debugando
                ctx.response.write(JSON.stringify(objRetorno)) // comando para transformar o objeto em string 
                                                               // e devolver na API como mensagem
            }else{
                erros.push('Partners não encontrado...') // adiciona o erro a lista
                objRetorno.Erros = erros
                objRetorno.OK = false
                ctx.response.write(JSON.stringify(objRetorno))
            }
        }
        
        
        return{
            onRequest: onRequest
        }

    })