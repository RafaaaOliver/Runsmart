            /**
             * @NScriptType ClientScript
             * @NApiVersion 2.0
             */

            define (['N/currentRecord', 'N/search', 'N/log', 'N/url'], function(currentRecord, search, log, url){
            
                function pageInit(ctx){
                    var page = ctx.currentRecord;
                    var fieldId = page.getField('custrecord_contrato_principal_rafael')
                    console.log(' o pageInit está executando')
                    if(ctx.mode == 'edit'){ 
                        fieldId.isDisabled = true // desativa o campo contrato principal
                    }
                    var fieldSL = page.getField('custpage_textogrande')
                    fieldSL.isDisabled = true // desativa ocampo longtext dentro do SuiteLet
                }

                function abrirReparcelar(){ // função que abrirá o suitelet ao clickar no botão parcelamento
                    var suiteletURL = url.resolveScript({
                        scriptId: 'customscript_rsc_sl_contratos_rafael',
                        deploymentId: 'customdeploy_rsc_sl_contratos_rafael'
                    });
                    window.location.replace(suiteletURL)
                }

                function reparcelar(){ // função de salvar no suitelet
                    try{
                        var page = currentRecord.get();
                        var pageId = page.id
                        var contrato = page.getValue('custpage_contrato')
                        var parcelas = page.getValue('custpage_parcelamento')
                        var jurosAplicado = page.getValue('custpage_juros')
                        var campoTexto = page.getValue('custpage_textogrande')
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

                        console.log('Valor original do contrato: ', contratoValor)
                        console.log('Contrato com juros: ', jurosColocado)
                        console.log('Número de parcelas', parcelas)
                        console.log('Valor das parcelas: ', parcelasValor)

                        var parcelasValor = Number(jurosColocado) / Number(parcelas)
                        parcelasValor = parcelasValor.toFixed(2)
                        campoTexto = 'Valor original do contrato: ' + contratoValor + ' --------- Contrato com juros: ' + jurosColocado + ' --------- Número de parcelas' + parcelas + ' --------- Valor das parcelas: ' + parcelasValor
                        page.setValue({
                            fieldId: 'custpage_textogrande',
                            value: campoTexto
                        })



                    }catch(e){
                        console.log('Erro personalizado:', e)
                    }
                }

                return{
                    pageInit: pageInit,
                    abrirReparcelar: abrirReparcelar,
                    reparcelar: reparcelar
                }
            })