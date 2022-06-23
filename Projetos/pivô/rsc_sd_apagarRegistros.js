/**
 *@NApiVersion 2.x
 *@NScriptType ScheduledScript
 */
define(['N/search', 'N/record'], function(search, record) {

    function execute(ctx) {
        var lista = []
        var busca = search.create({
            type: 'customlist_listatestecsv',
            columns:['internalId']
        }).run().each(function(result) {
            lista.push(result.getValue('internalId')) // jogando o retorno da pesquisa para dentro da lista
            return true
        })
        log.debug('lista', lista)
        for(i in lista){
            record.delete({
                type: 'customlist_listatestecsv',
                id: lista[i]
            })
        }
    }

    return {
        execute: execute
    }
});
