/**
* @NApiVersion 2.1
* @NScriptType ClientScript
* @Authors Gabriel Scarpelini & Rafael Oliveira
*/
define(['N/log','N/email', 'N/currentRecord', 'N/https', 'N/search'], function(log, email, currentRecord, https, search) {

    function pageInit(ctx) {
        var page = ctx.currentRecord;
        log.audit('id da pagina', ctx.id)
        console.log(ctx.id)
        var objChange = record.load({
            id: page.id
        })
        objChange.setValue("isperson", "T")
        objChange.save()
    }

    function emailDisparo(){
        if(confirm('Deseja enviar o Email para cadastro ?')){
            var page = currentRecord.get()
            var clienteId = page.id
            var busca = [] 
            search.create({
                type: 'lead',
                filters: [
                        ['internalid', 'IS', clienteId]
                        ],
                columns:[
                        search.createColumn({name: "email", label: "E-mail"}),
                        search.createColumn({name: "firstname", label: "Nome"})
                        ]
            }).run().each(function(result){
                busca.push({
                    email: result.getValue('email'),
                    nome: result.getValue('firstname')
                })
                return true
            })
            const senderId = 239880;
            const recipientEmail = busca[0].email;
            const mailSubject = 'Atualização de cadastro de Cliente (' + busca[0].nome + ')'

            https.post({
                body: {
                    senderId: senderId,
                    recipientEmail: recipientEmail,
                    mailSubject: mailSubject
                },
                url: 'https://4481651-sb2.extforms.netsuite.com/app/site/hosting/scriptlet.nl?script=1885&deploy=1&compid=4481651_SB2&h=4120755da0c68734c123',
            })
        }
    }


    return {
        pageInit: pageInit,
        emailDisparo: emailDisparo
    }
})