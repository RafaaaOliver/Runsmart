/**
* @NScriptType ClientScript
* @NApiVersion 2.0
* 
*/

define(['N/currentRecord', 'N/record', 'N/search'],   // importando os módulos 
function(currentRecord, record, search){   // definindo o nome dos módulos e incrementando na função
    function fieldChanged(ctx){ // função que é executada quando o valor de um campo
        var page = ctx.currentRecord; // variável que contém o conteúdo da página
        var campoID = page.getValue('custpage_cliente') // pegando o id do campo cliente (pois é uma lista suspensa)
        console.log('Campo do cliente' ,campoID) // testes de print para teste
        if(ctx.fieldId == 'custpage_cliente'){ // se o campo do click for o campo cliente, faça

            /**
             * era necessário preencher automaticamente o campo subsidiária, então foi usado uma função de busca
             * a função procura dentro o tipo de registro, depois procura o id solicitado e o campo a ser buscado
             * o id do campo vai ser preenchido com o id interno retornado no Suitelet, pois ele é um campo de seleção
             */ 
            
            var subsidi = search.lookupFields({  // sintaxe da função busca 
                type:'customer', // 1° ele olha o tipo de registro
                id: campoID, // 2° confere o id do registro (no caso vai ser preenchido com o campo do suitlet)
                columns:['subsidiary'] // e por último pega o campo a ser procurado
            }) 
            var subsidiary = subsidi.subsidiary[0].value // esse formato faz buscarmos a subsidiária 
            // (não é um tipo de seleção, é apenas uma que não pode ser trocada, por isso funciona!)
            // como ela volta em formato de array, é usado o .text para buscar o texto dela e não o Id interno (.value)
            console.log('lookup:' ,subsidi)
            console.log('valor da subsdiária: ',subsidiary)  
            
            var teste = page.getValue('custpage_subsidiaria') 
            console.log('valor do campo da subsidiária do ST: ', teste)
            page.setValue('custpage_subsidiaria', subsidiary)
            final = page.getValue('custpage_subsidiaria')   // testes visuais no F12
            console.log('subsidiária substituída final: ', final)
            var arroba = page.getValue('custpage_cliente')
            console.log('morte da cabrita: ', arroba)
        }

    }
    
    function criar(){  // função que vai ser ativada com o botão
        var page = currentRecord.get(); // pega o conteúdo da página (não precisa de contexto)
        var data = new Date() // comando do js para pegar a data atual
        var cliente = page.getValue('custpage_cliente') // pega o conteúdo do campo cliente
        var sub = page.getValue('custpage_subsidiaria') // pega o conteúdo do campo subsidiaria
        var nome = page.getValue('custpage_nome') // pega o conteúdo do campo nome
        console.log('===============================================')
        console.log('cabritinha: ',cliente) // testes de log
        console.log(sub)
        var client = record.create({ // comando para criar um registro personalizado
            type: 'customrecord_rsc_reg_rafael', // tipo de registro
            isDynamic: true // campo opcional
        })
        client.setValue('custrecord_rsc_campocliente_rafael', cliente) // sentando o valor de cliente
        client.setValue('custrecord_rsc_camposubsdiaria_rafael', sub) // sentando o valor de subsidiária
        client.setValue('name',nome ) // setando o nome
        client.setValue('custrecord_rsc_campodata_rafael', data) // setando a data atual
        client.save() // comando para salvar o registro
        // client.save({ignoreMandatoryFields: true})  // comando para ignorar os outros campos que eu não quero preencher
    }
    /**
     * >>>>>>>>>> importante!!! <<<<<<<<<<<
     * - os campos do tipo de registro devem estar alinhados ao do script
     * - se for text, deixe text no script, se for seleção, faça referencia
     */

    return{
        fieldChanged: fieldChanged,
        criar: criar  // retorno das funções
    }
})