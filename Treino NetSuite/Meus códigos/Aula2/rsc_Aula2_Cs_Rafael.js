/**
* @NScriptType ClientScript
* @NApiVersion 2.0
*/

define(['N/currentRecord', 'N/search', 'N/ui/dialog'],
function(currentRecord, search, dialog){

    function pageInit(){ 
        /**
         * crirei uma função pageInite vazia, pois não é possível subir
         * um clientScript apenas com uma função de botão
         */ 
    }

    function checar(){
        // >>>>>>>>>>> Objetos para mensagens tipo erro <<<<<<<<<<<<
        var msgIgual = {
            title: 'é o mesmo',
            message: 'Esse cavalo já está nesse registro, então você pode salvar :)'
        }
        var msgnull = {
            title: 'Eii',
            message: 'Opa patrão, escolhe um pangaré ai, mas se quiser escolher depois, você quem sabe :)'
        }
        var msgSucesso = {
            title: 'Sucesso!!!',
            message: 'Esse cavalo pode ser cadastrado nessa cocheira!'
        }
        var msgError = {
            title: 'Vish...',
            message: 'Parece que esse cavalo já está cadastrado em uma cocheira!'
        }
        // >>>>>>>>>>> função de checagem <<<<<<<<<<<<

        var page = currentRecord.get();
        var pageId = page.id // pega o id da página
        var cavaloId = page.getValue('custrecord_rsc_cocheiracavalo_rafael')

        if (!cavaloId){  
            dialog.alert(msgnull)
        }
        var busca = search.create({
            type:'customrecord_rsc_chocheira_rafael',
            filters:[ 
                ['custrecord_rsc_cocheiracavalo_rafael', 'IS', cavaloId]
            ] // busca dentro dos registros se o campo é igual o da variavel e os coloca em uma lista
        }).run().getRange({
            start:0,
            end:1 
        })// limita a quantidade de conteúdo que será buscado (no caso 1)

        var horsezinho = search.lookupFields({  // faz a busca dentro registro que está sendo editado
            type:'customrecord_rsc_chocheira_rafael', 
            id: pageId, // id da página
            columns:['custrecord_rsc_cocheiracavalo_rafael']  // coluna
        }) 
        var horse = horsezinho.custrecord_rsc_cocheiracavalo_rafael[0].value  
        // comando para retornar o valor do objeto na lista
        log.debug('Titulo', busca)
        console.log('Titulo', horse)
        // condições para a mensagem do status do cavalo
        if (cavaloId == horse){ // se for o mesmo do registro
            dialog.alert(msgIgual)
        }
        else if (busca.length != 0){ // se ele estiver em nenhum registro
            dialog.alert(msgError)
        }
        else if (busca.length == 0){ // se ele não estiver em nenhum registro
            dialog.alert(msgSucesso)
        }
    }

    return{
        pageInit: pageInit,
        checar: checar
    }
})
