/**
* @NApiVersion 2.x
* @NScriptType Clientscript
*
*
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "N/search"], function (require, exports, search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.reparcelar = exports.fieldChanged = exports.pageInit = void 0;
    search_1 = __importDefault(search_1);
    var pageInit = function (ctx) {
        var currRecord = ctx.currentRecord;
        var contrato = currRecord.getValue('custpage_lrc_contrato_principal');
        if (contrato) {
            var lookupContrato = search_1.default.lookupFields({
                id: contrato,
                type: 'customrecord_lrc_contrato_doug',
                columns: ['custrecord_lrc_valor_doug']
            });
            currRecord.setValue({
                fieldId: 'custpage_lrc_valor_contrato',
                value: Number(lookupContrato.custrecord_lrc_valor_doug)
            });
        }
    };
    exports.pageInit = pageInit;
    var fieldChanged = function (ctx) {
        var fieldId = ctx.fieldId;
        var j = 1;
        var currRecord = ctx.currentRecord;
        var valor = Number(currRecord.getValue('custpage_lrc_valor_contrato'));
        if (fieldId == 'custpage_lrc_contrato_principal') {
            var contrato = currRecord.getValue('custpage_lrc_contrato_principal');
            var lookupContrato = search_1.default.lookupFields({
                id: contrato,
                type: 'customrecord_lrc_contrato_doug',
                columns: ['custrecord_lrc_valor_doug']
            });
            currRecord.setValue({
                fieldId: 'custpage_lrc_valor_contrato',
                value: Number(lookupContrato.custrecord_lrc_valor_doug)
            });
        }
        if (fieldId == 'custpage_lrc_parcelas') {
            var contrato = currRecord.getValue('custpage_lrc_contrato_principal');
            var qtParcelas = Number(currRecord.getValue('custpage_lrc_parcelas'));
            var juros = currRecord.getValue('custpage_lrc_juros_aplicado');
            if (juros) {
                alert('Erro: Você alterou o numéro de parcelas com o juros ja selecionado. Selecione novamente o juros ou reinicie o processo.');
                return;
            }
            if (!contrato) {
                alert('Selecione um contrato antes de dividir as parcelas.');
                currRecord.setValue({
                    fieldId: 'custpage_lrc_parcelas',
                    value: '',
                    ignoreFieldChange: true
                });
                return;
            }
            else {
                for (var i = 0; i < qtParcelas; i++) {
                    console.log(valor / qtParcelas);
                    currRecord.selectLine({
                        line: i,
                        sublistId: 'custpage_lrc_resumo_parcelamento'
                    });
                    currRecord.setCurrentSublistValue({
                        fieldId: 'custpage_lrc_parcela',
                        sublistId: 'custpage_lrc_resumo_parcelamento',
                        value: 'Parcela ' + j
                    });
                    currRecord.setCurrentSublistValue({
                        sublistId: 'custpage_lrc_resumo_parcelamento',
                        fieldId: 'custpage_lrc_valor',
                        value: valor / qtParcelas
                    });
                    currRecord.setCurrentSublistValue({
                        sublistId: 'custpage_lrc_resumo_parcelamento',
                        fieldId: 'custpage_lrc_juros',
                        value: 0,
                        ignoreFieldChange: true
                    });
                    currRecord.setCurrentSublistValue({
                        fieldId: 'custpage_lrc_total',
                        sublistId: 'custpage_lrc_resumo_parcelamento',
                        value: valor / qtParcelas
                    });
                    currRecord.commitLine({
                        sublistId: 'custpage_lrc_resumo_parcelamento'
                    });
                    j++;
                }
            }
        }
        if (fieldId == 'custpage_lrc_juros_aplicado') {
            var qtParcelas = Number(currRecord.getValue('custpage_lrc_parcelas'));
            var juros = currRecord.getValue('custpage_lrc_juros_aplicado');
            if (juros) {
                if (!qtParcelas) {
                    alert('Digite a quantidade de parcelas antes de selecionar um juros adicional.');
                    currRecord.setValue({
                        fieldId: 'custpage_lrc_juros_aplicado',
                        value: '',
                        ignoreFieldChange: true
                    });
                    return;
                }
                else {
                    var searchHistorico = search_1.default.create({
                        type: 'customrecord_lrc_historico_juros_doug',
                        filters: [
                            ['custrecord_lrc_juros_referente', 'IS', juros]
                        ],
                        columns: [
                            search_1.default.createColumn({
                                name: 'custrecord_lrc_data_vigencia_doug',
                                sort: search_1.default.Sort.DESC
                            }),
                            search_1.default.createColumn({
                                name: 'custrecord_lrc_fator',
                            })
                        ]
                    }).run().getRange({
                        start: 0,
                        end: 1
                    });
                    if (searchHistorico[0]) {
                        var arrayJuros = [];
                        var mes = 0;
                        var juros_1 = 0;
                        for (var i = 0; i < qtParcelas; i++) {
                            mes = valor / qtParcelas + juros_1;
                            juros_1 = Number(searchHistorico[0].getValue('custrecord_lrc_fator')) * mes;
                            arrayJuros.push(juros_1);
                        }
                        for (var j_1 = 0; j_1 < qtParcelas; j_1++) {
                            currRecord.selectLine({
                                line: j_1,
                                sublistId: 'custpage_lrc_resumo_parcelamento'
                            });
                            currRecord.setCurrentSublistValue({
                                sublistId: 'custpage_lrc_resumo_parcelamento',
                                fieldId: 'custpage_lrc_juros',
                                value: arrayJuros[j_1]
                            });
                            currRecord.setCurrentSublistValue({
                                sublistId: 'custpage_lrc_resumo_parcelamento',
                                fieldId: 'custpage_lrc_total',
                                value: arrayJuros[j_1] + valor / qtParcelas
                            });
                            currRecord.commitLine({
                                sublistId: 'custpage_lrc_resumo_parcelamento'
                            });
                        }
                    }
                    else {
                        alert('Não existe vigência para este juros!');
                        currRecord.setValue({
                            fieldId: 'custpage_lrc_juros_aplicado',
                            value: '',
                            ignoreFieldChange: true
                        });
                        return;
                    }
                }
            }
        }
    };
    exports.fieldChanged = fieldChanged;
    var reparcelar = function () {
    };
    exports.reparcelar = reparcelar;
});
