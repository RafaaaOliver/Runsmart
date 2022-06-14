/**
 * @NApiVersion 2.0
 * @NScriptType MapReduceScript
 */
define(['N/search', 'N/record', 'N/log'], function(search, record, log) {
    var getInputData = function(){  // o getInputData pega os dados e joga para o map (um por vez)
        return search.create({ 
            type:'customrecord_json_integracao_rd',
            filters:[
                ['custrecord_processado_rafael', 'IS', 2] // se o id interno do campo for 2
            ]
        })
    }

   var map = function(ctx){
        try{  // sempre usar, pois com ele e o catch podemos pegar os erros que não aparecem no NetSuite
            var page = JSON.parse(ctx.value)  // função para pegar o conteúdo da página e usar no map
            var result = search.lookupFields({ 
                type: 'customrecord_json_integracao_rd',
                id: page.id,
                columns: [
                    'custrecord_json_rafael' // busca o campo de texto com código JSON
                ]
            }) //result = o retorno da busca (não podemos modificalos, pois volta como objeto)
            // como pegar: result.(id do campo que queremos usar)
            // precisamos converter o conteúdo do campo para objeto JSON (pois ele estava como string JSON)
            var obj = JSON.parse(result.custrecord_json_rafael)  // comando que transforma o JSON em objeto
                   
                    // >>>>>>>>>>>operação de pegar os objetos e atribuir em variáveis <<<<<<<<<<
            var nome = obj.name   
            var espaco = nome.indexOf(' ', 1)
            var firstname = nome.slice(0, espaco)
            var lastname = nome.slice(espaco)    
            var title = obj.title
            var phone = obj.phone
            var email = obj.email
            var subsidiary = obj.subsidiary
            var location = obj.location
            var department = obj.department
            // >>>>>>>>>>>>>>>>>>>>>>>>> alguns logs para debugar <<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
            log.debug('firstname do JSON', firstname)
            log.debug('sobrenome do JSON', lastname)
            log.debug('titulo do JSON', title)
            log.debug('telefone do JSON', phone)
            log.debug('e-mail do JSON', email)
            log.debug('subsidiária do JSON', subsidiary)
            log.debug('localidade do JSON', location)
            log.debug('departamento do JSON', department)

        }catch(e){   // comando que capta qualquer erro jogado pelo try
            log.debug('Error', e)
        }
        try{  // se achar algum erro joga para o try  
            var criacao = record.create({  // ao atribuir pegamos a intância de criação do registro
                type: 'partner',
                defaultValues: {
                    customform: -50  // id interno do formulário default
                }
            })
            // >>>>>>>>>>>>>>>>>> Setagem de valores no registro criado <<<<<<<<<<<<<<<<<<<<<<<<<<<<
            criacao.setValue('isperson','T')
            criacao.setValue('firstname',firstname)
            criacao.setValue('lastname',lastname)
            criacao.setValue('title',title)
            criacao.setValue('phone', phone)
            criacao.setValue('email', email)
            criacao.setValue('subsidiary', subsidiary)
            criacao.setValue('location', location)
            criacao.setValue('department', department)
/** IMPORTANTE*/var idPaginaCriacao = criacao.save({ignoreMandatoryFields: true}) // salvando o registro e o atribuindo a uma variável

            // >>>>>>>>>>>>>>>>>>>>>>> operações com um registro carregado <<<<<<<<<<<<<<<<<<<<<

            var problema = record.load({  // faz o upload de um registro para o código
                type: 'customrecord_json_integracao_rd',
                id: page.id,
                isDynamic: true
            })
            problema.setValue({  // o setValue que deve ser usado sempre que não for um currentRecord
                fieldId: 'custrecord_processado_rafael',
                value: 1
            })
            log.debug('a', idPaginaCriacao)
            problema.setValue({
                fieldId:'custrecord_parceiro_rafael',
                value: idPaginaCriacao // usando a variável do save (LINHA 70)
            })
            problema.save({ignoreMandatoryFields: true})  // salva o registo editado ignorando os campos obrigatórios
        }
        catch(e){log.debug('Error', e)}
   }




    return{
        getInputData: getInputData, 
        map: map
    }
})