/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 *@Author Rafael Oliveira Santos
 */
define(['N/record', 'N/ui/serverWidget', 'N/search', 'N/url', 'N/runtime', 'N/error'], function(record, ui, search, url, runtime, error) {

    function onRequest(ctx) {

        var usuario = runtime.getCurrentUser();
        var email = usuario.email
        var localidadeUser;
        log.debug('usuário', usuario)

        if(email != 'celso.filho@kovi.com.br' && email != 'filipe.reis@kovi.com.br' && email != 'paulo.baptista@kovi.com.br' && email != 'rafael.santos@runsmart.cloud') {
            throw "Você não tem permissão para fazer isso."
        }

        switch (email) {
            case 'celso.filho@kovi.com.br':
                localidadeUser = 20 // miranda
                break;

            case 'filipe.reis@kovi.com.br':
                localidadeUser = 24 // nações
                break;

            case 'paulo.baptista@kovi.com.br':
                localidadeUser = 27 // campus
                break;

            case 'rafael.santos@runsmart.cloud':
                localidadeUser = 20
                break;
        }
        log.debug('localidadeUser', localidadeUser)
        const request = ctx.request;
        const method = request.method;
        const response = ctx.response;
        const parameters = request.parameters;
        var form = ui.createForm({
            title: "Fluxo de planilha de estoque"
        })
        var aprovadobutton = form.addButton({
            id: 'custpage_aprovado',
            label: 'Aprovar',
            functionName: 'aprovado'
        })
        var rejeitadobutton = form.addButton({
            id: 'custpage_rejeitado',
            label: 'Rejeitar',
            functionName: 'rejeitado'
        })
        var json = form.addField({
            id: 'custpage_json',
            type: ui.FieldType.TEXTAREA,
            label: 'JSON'
        }).updateDisplayType({displayType: ui.FieldDisplayType.HIDDEN})

        var campo_json = form.getField({id:"custpage_json"});
        campo_json.maxLength = 400000;

        var sublist = form.addSublist({
            id: 'custpage_sublistplanilhas',
            label: 'Planilhas de estoque',
            type: ui.SublistType.LIST
        });

        var marcaTudo = sublist.addButton({
            id: 'custpage_marcaparcela',
            label: 'Marcar Tudo',
            functionName: 'selecionar'
        })
        var desmarcaTudo = sublist.addButton({
            id: 'custpage_desmarcaparcela',
            label: 'Desamarcar Tudo',
            functionName: 'desmarcar'
        })

        var checkBox = sublist.addField({
            id: 'custpage_marcarplanilha',
            type: ui.FieldType.CHECKBOX,
            label: 'Selecionar'
        });

        var link = sublist.addField({
            id: 'custpage_planilhalink',
            type: ui.FieldType.URL,
            // source: 'inventoryworksheet',
            label: 'Link'
        })

        var sub = sublist.addField({
            id: 'custpage_planilha',
            type: ui.FieldType.SELECT,
            source: 'inventoryworksheet',
            label: 'Planilha'
        }).updateDisplayType({displayType: ui.FieldDisplayType.INLINE})

        var contaAjuste = sublist.addField({
            id: 'custpage_contaajuste',
            type: ui.FieldType.SELECT,
            source: 'account',
            label: 'CONTA DE AJUSTE'
        }).updateDisplayType({displayType: ui.FieldDisplayType.INLINE})

        var empresa = sublist.addField({
            id: 'custpage_empresa',
            type: ui.FieldType.TEXT,
            label: 'Empresa'
        }).updateDisplayType({displayType: ui.FieldDisplayType.INLINE})

        var localidade = sublist.addField({
            id: 'custpage_localidade',
            type: ui.FieldType.TEXT,
            label: 'localidade'
        }).updateDisplayType({displayType: ui.FieldDisplayType.INLINE})

        var status = sublist.addField({
            id: 'custpage_status',
            type: ui.FieldType.TEXT,
            label: 'Status'
        }).updateDisplayType({displayType: ui.FieldDisplayType.INLINE})

        ctx.response.writePage(form)
        
        var lista = []
        var busca = search.create({
            type: 'inventoryworksheet',
            filters: [
                ["custbody_status_ae", "IS", 1],
                "AND",
                ["mainline","is","T"],
                "AND",
                ["location", "IS", localidadeUser]
            ],
            columns: [ 
                "internalId", "tranid", "account", "subsidiary", "location", "custbody_status_ae"
            ]
        }).run().each(function(result){
            lista.push({
                id: result.getValue('internalId'),
                tranid: result.getValue('tranid'),
                account: result.getValue('account'),
                subsidiary: result.getText('subsidiary') ,
                location: result.getText('location'),
                status: result.getText('custbody_status_ae')
            })
            return true
        })
        log.debug('lista', lista)

        for(var i = 0; i < lista.length; i++){
            link.linkText = 'Planilha'
            var output = url.resolveRecord({
                recordType: 'inventoryworksheet',
                recordId: lista[i].id,
                isEditMode: false
            });

            sublist.setSublistValue({
                id: "custpage_planilha",
                line: i,
                value: lista[i].id
            })

            sublist.setSublistValue({
                id: "custpage_planilhalink",
                line: i,
                value: output
            })

            sublist.setSublistValue({
                id: "custpage_contaajuste",
                line: i,
                value: lista[i].account
            })

            sublist.setSublistValue({
                id: "custpage_empresa",
                line: i,
                value: lista[i].subsidiary
            })

            sublist.setSublistValue({
                id: "custpage_localidade",
                line: i,
                value: lista[i].location
            })

            sublist.setSublistValue({
                id: "custpage_status",
                line: i,
                value: lista[i].status
            })
        }

        

    form.clientScriptModulePath = './rsc_cs_fluxoAprovacao.js'

    }

    return {
        onRequest: onRequest
    }
});
