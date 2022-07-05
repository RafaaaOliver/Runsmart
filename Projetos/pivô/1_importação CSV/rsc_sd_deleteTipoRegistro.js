/**
 *@NApiVersion 2.x
 *@NScriptType ScheduledScript
 */
 define(['N/search', 'N/record'], function(search, record) {

    function execute(ctx) {
        var lista = []
        var busca = search.create({
            type: 'customlist',
            filters:[
                "owner","IS","5915"
            ],
            columns:['internalId']
        }).run().each(function(result) {
            lista.push(result.getValue('internalId')) 
            return true
        })
        log.debug('lista', lista)
        log.debug('tamanho da lista', lista.length)

        for (i in lista){
            if (lista[i] == 4){
                log.debug('incorreto detectado', lista[i])
            }
        }
        for(i in lista){
            record.delete({
                type: 'customlist',
                id: lista[i]
            })
        }
    }

    return {
        execute: execute
    }
});
