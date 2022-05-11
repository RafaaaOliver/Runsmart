/**
 * @NScriptType ClientScript
 * @NApiVersion 2.0
 */

define (['N/currentRecord', 'N/search', 'N/log', 'N/url', 'N/record'], function(currentRecord, search, log, url, record){     

    // >>>>>>>>>>>>>> funções do suitelet <<<<<<<<<<<<<<<<<<<<<<
function pageInit(){
    return true
}

function reparcelar(){ // função de salvar no suitelet
    try{
        var page = currentRecord.get();
        var pageId = page.id
        var contrato = page.getValue('custpage_contrato')
        var parcelas = page.getValue('custpage_parcelamento')
        var jurosAplicado = page.getValue('custpage_juros')
        // console.log('contrato: ', contrato)
        // console.log('numero de parcelas', parcelas)
        // console.log('clickei em salvar')

        var contdate = search.lookupFields({
            type: 'customrecord_contrato_aula4_rafael',
            id: contrato,
            columns: ['custrecord_valor_aula4_rafael']
        })
        var contratoValor = contdate.custrecord_valor_aula4_rafael

        var listaDeJuros = []
        var buscaHistJuros = search.create({
            type:'customrecord_historicojuros_aula4_rafael',
            filters: [
                'custrecord_jurosreferente_aula4_rafael' , 'IS', jurosAplicado
            ],
            columns: ['custrecord_datavigencia_aula4_rafael', 'custrecord_fatoraplicado_aula4_rafael' ]
        }).run().each(function(result){
            lista = []
            lista.push(result.getValue('custrecord_datavigencia_aula4_rafael'))
            lista.push(result.getValue('custrecord_fatoraplicado_aula4_rafael'))
            listaDeJuros.push(lista)
            return true
        })
        // console.log('dicionário de juros: ',listaDeJuros)
        var dateKey = 0;
        for (i in listaDeJuros){
            listaDeJuros[i][0] = Date.parse(listaDeJuros[i][0])
            if(Number(listaDeJuros[i][0]) > dateKey){
                dateKey = Number(listaDeJuros[i][0])
            }
        }
        var juros = 0;
        for (i in listaDeJuros){
            if (dateKey == listaDeJuros[i][0]){
                juros = Number(listaDeJuros[i][1])
            }
        }
        console.log('data do juros: ', dateKey, 'Porcentagem do juros: ', juros)
        var jurosColocado = Number(contratoValor) + (Number(contratoValor) * (Number(juros) / 100))
        console.log('contrato: ', contrato)

        jurosColocado = jurosColocado.toFixed(2)
        var load = record.load({
            type: 'customrecord_contrato_aula4_rafael',
            id: contrato
        })
        load.setValue('custrecord_valor_aula4_rafael', jurosColocado)
        load.save({ignoreMandatoryFields: true})
        
        console.log('Valor original do contrato: ', contratoValor)
        console.log('Contrato com juros: ', jurosColocado)
        console.log('Número de parcelas', parcelas)
        
        var parcelasValor = Number(jurosColocado) / Number(parcelas)
        parcelasValor = parcelasValor.toFixed(2)
        console.log('Valor das parcelas: ', parcelasValor)

        var listaDelete = []
        var buscaDelete = search.create({
            type:'customrecord_contrato_aula4_rafael',
            filters: [
                'custrecord_contrato_principal_rafael', 'IS', contrato
            ],
            columns: ['internalId']
        }).run().each(function(result){
            deleteId = result.getValue('internalId')
            record.delete({
                type: 'customrecord_contrato_aula4_rafael',
                id: deleteId
            })
            listaDelete.push(result.getValue('internalId'))
            return true
        })
        console.log("ListaDelete: ", listaDelete)
        
        for (var i = 0; i < parcelas; i++){
            var data = new Date()
            var parcelaName = 'parcela' + (i + 1)
            var registro = record.create({
                type: 'customrecord_contrato_aula4_rafael'                        
            })
            registro.setValue('name', parcelaName)
            registro.setValue('custrecord_contrato_principal_rafael', contrato)
            registro.setValue('custrecord_data_aula4_rafael', data )
            registro.setValue('custrecord_valor_aula4_rafael', parcelasValor)
            registro.save({ignoreMandatoryFields: true})
            console.log('criei o registro')
        }

        var paginaRegistro = url.resolveRecord({
            recordType: 'customrecord_contrato_aula4_rafael',
            recordId: contrato,
            isEditMode: false
        });
        window.location.replace(paginaRegistro)

    }catch(e){
        console.log('Erro personalizado:', e)
    }
}

    function resumo(){
        try{
            var page = currentRecord.get();  
            var contrato = page.getValue('custpage_contrato')
            var parcelas = page.getValue('custpage_parcelamento')
            var jurosAplicado = page.getValue('custpage_juros')
            var campoTexto = page.getValue('custpage_textogrande')
            var contdate = search.lookupFields({
                type: 'customrecord_contrato_aula4_rafael',
                id: contrato,
                columns: ['custrecord_valor_aula4_rafael']
            })
            var contratoValor = contdate.custrecord_valor_aula4_rafael

            var listaDeJuros = []
            var buscaHistJuros = search.create({
                type:'customrecord_historicojuros_aula4_rafael',
                filters: [
                    'custrecord_jurosreferente_aula4_rafael' , 'IS', jurosAplicado
                ],
                columns: ['custrecord_datavigencia_aula4_rafael', 'custrecord_fatoraplicado_aula4_rafael' ]
            }).run().each(function(result){
                lista = []
                lista.push(result.getValue('custrecord_datavigencia_aula4_rafael'))
                lista.push(result.getValue('custrecord_fatoraplicado_aula4_rafael'))
                listaDeJuros.push(lista)
                return true
            })
            var dateKey = 0;
            for (i in listaDeJuros){
                listaDeJuros[i][0] = Date.parse(listaDeJuros[i][0])
                if(Number(listaDeJuros[i][0]) > dateKey){
                    dateKey = Number(listaDeJuros[i][0])
                }
            }
            var juros = 0;
            for (i in listaDeJuros){
                if (dateKey == listaDeJuros[i][0]){
                    juros = Number(listaDeJuros[i][1])
                }
            }
            var jurosColocado = Number(contratoValor) + (Number(contratoValor) * (Number(juros) / 100))
            var parcelasValor = Number(jurosColocado) / Number(parcelas)
            parcelasValor = parcelasValor.toFixed(2)
            jurosColocado = jurosColocado.toFixed(2)

            if (contrato && jurosAplicado && parcelas){
                campoTexto = 'Valor final do contrato: ' +  jurosColocado + ' // Parcelas: ' + parcelas + 'x de ' + parcelasValor 
                page.setValue({
                    fieldId: 'custpage_textogrande',
                    value: campoTexto  
                })
                }   
            else{
                alert('Você precisa preencher todos os campos e selecionar a quantidade de parcelas para atualizar a o resumo')
            }                    
        }catch(e){
            console.log('Erro personalizado: ', e)
        }
    }
    return{
        pageInit: pageInit,
        reparcelar: reparcelar,
        resumo: resumo
    }
})