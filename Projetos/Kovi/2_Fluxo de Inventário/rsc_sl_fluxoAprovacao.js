/**
 *@NApiVersion 2.x
 *@NScriptType Suitelet
 */
define(['N/record', 'N/ui/serverWidget', 'N/search', 'N/url'], function(record, ui, search, url) {

    function onRequest(ctx) {
        const request = ctx.request;
        const method = request.method;
        const response = ctx.response;
        const parameters = request.parameters;
        var form = ui.createForm({
            title: "Fluxo de planilha de estoque"
        })
        var marcaTudo = sublist.addButton({
            id: 'custpage_marcaparcela',
            label: 'Marcar Tudo',
            functionName: 'selecionar'
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

        var sub = sublist.addField({
            id: 'custpage_planilha',
            type: ui.FieldType.SELECT,
            source: 'inventoryworksheet',
            label: 'Planilha'
        }).updateDisplayType({displayType: ui.FieldDisplayType.INLINE})

        var link = sublist.addField({
            id: 'custpage_planilhalink',
            type: ui.FieldType.URL,
            // source: 'inventoryworksheet',
            label: 'Link'
        })

        ctx.response.writePage(form)
        
        var lista = []
        var busca = search.create({
            type: 'inventoryworksheet',
            filters: [
                ["custbody_status_ae", "IS", 1],
                "AND",
                ["mainline","is","T"],
            ],
            columns: [ 
                "internalId", "tranid"
            ]
        }).run().each(function(result){
            lista.push({
                id: result.getValue('internalId'),
                tranid: result.getValue('tranid')
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
        }

        

    form.clientScriptModulePath = './rsc_cs_fluxoAprovacao.js'

    }

    return {
        onRequest: onRequest
    }
});
