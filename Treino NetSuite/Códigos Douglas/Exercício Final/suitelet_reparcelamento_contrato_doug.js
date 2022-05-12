/**
*@NApiVersion 2.x
*@NScriptType Suitelet
*
* Exerc1.ts
*
*/
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "N/ui/serverWidget", "N/search"], function (require, exports, UI, search_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.onRequest = void 0;
    UI = __importStar(UI);
    search_1 = __importDefault(search_1);
    var onRequest = function (ctx) {
        var form = UI.createForm({
            title: "Reparcelamento de Contratos" //Tela para os clientes
        });
        var contratoPrincipal = form.addField({
            id: 'custpage_lrc_contrato_principal',
            type: UI.FieldType.SELECT,
            label: 'Contrato Principal'
        });
        contratoPrincipal.addSelectOption({
            text: '',
            value: ''
        });
        search_1.default.create({
            type: 'customrecord_lrc_contrato_doug',
            filters: [
                ['custrecord_lrc_contrato_princi', 'ANYOF', '@NONE@'],
            ]
        }).run().each(function (result) {
            contratoPrincipal.addSelectOption({
                text: 'Contrato #' + result.id,
                value: result.id
            });
            return true;
        });
        form.addField({
            id: 'custpage_lrc_valor_contrato',
            type: UI.FieldType.CURRENCY,
            label: 'Valor do Contrato'
        }).updateDisplayType({ displayType: UI.FieldDisplayType.DISABLED });
        form.addField({
            id: 'custpage_lrc_juros_aplicado',
            label: 'Juros aplicado',
            type: UI.FieldType.SELECT,
            source: 'customrecord_lrc_juros_aplicados_teste'
        });
        form.addField({
            id: 'custpage_lrc_parcelas',
            type: UI.FieldType.INTEGER,
            label: 'Quantidade de Parcelas'
        });
        var resumoParcela = form.addSublist({
            id: 'custpage_lrc_resumo_parcelamento',
            label: 'Resumo do parcelamento',
            type: UI.SublistType.INLINEEDITOR
        });
        resumoParcela.addField({
            id: 'custpage_lrc_parcela',
            label: 'Parcelas',
            type: UI.FieldType.TEXT
        });
        resumoParcela.addField({
            id: 'custpage_lrc_valor',
            label: 'Valor Parcela',
            type: UI.FieldType.CURRENCY
        });
        resumoParcela.addField({
            id: 'custpage_lrc_juros',
            label: 'Juros',
            type: UI.FieldType.CURRENCY
        });
        resumoParcela.addField({
            id: 'custpage_lrc_total',
            label: 'Valor Total',
            type: UI.FieldType.CURRENCY
        });
        form.addButton({
            id: 'custpage_lrc_button',
            label: 'Reparcelar',
            functionName: 'reparcelar',
        });
        form.clientScriptModulePath = './client_reparcelamento_contrato_doug.js';
        ctx.response.writePage(form);
    };
    exports.onRequest = onRequest;
});
