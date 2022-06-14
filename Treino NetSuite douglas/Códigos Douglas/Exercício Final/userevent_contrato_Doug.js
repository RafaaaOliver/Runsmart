/**
*@NApiVersion 2.x
*@NScriptType UserEventScript
*
*
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
define(["require", "exports", "N/search", "N/ui/serverWidget"], function (require, exports, search_1, UI) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.beforeSubmit = exports.beforeLoad = void 0;
    search_1 = __importDefault(search_1);
    UI = __importStar(UI);
    var beforeLoad = function (ctx) {
        var form = ctx.form;
        var newRecord = ctx.newRecord;
        var contrato = newRecord.getValue('custrecord_lrc_contrato_princi');
        if (ctx.type == ctx.UserEventType.EDIT || ctx.type == ctx.UserEventType.VIEW) {
            form.getField({
                id: 'custrecord_lrc_contrato_princi'
            }).updateDisplayType({ displayType: UI.FieldDisplayType.DISABLED });
            if (!contrato) {
                form.addButton({
                    id: 'custpage_lrc_reparcelar',
                    label: 'Reparcelar',
                    functionName: 'redirecionar'
                });
            }
            form.clientScriptModulePath = ("./clientScript_botaoReparcelamento_doug.js");
        }
    };
    exports.beforeLoad = beforeLoad;
    var beforeSubmit = function (ctx) {
        var newRecord = ctx.newRecord;
        var oldRecord = ctx.oldRecord;
        var contrato = newRecord.getValue('custrecord_lrc_contrato_princi');
        if (ctx.type == ctx.UserEventType.CREATE) {
            var total_1 = Number(newRecord.getValue('custrecord_lrc_valor_doug'));
            if (contrato) {
                search_1.default.create({
                    type: 'customrecord_lrc_contrato_doug',
                    filters: ['custrecord_lrc_contrato_princi', 'IS', contrato],
                    columns: ['custrecord_lrc_valor_doug']
                }).run().each(function (result) {
                    var valor = result.getValue('custrecord_lrc_valor_doug');
                    total_1 += Number(valor);
                    return true;
                });
                var lookupContrato = search_1.default.lookupFields({
                    type: 'customrecord_lrc_contrato_doug',
                    id: contrato,
                    columns: ['custrecord_lrc_valor_doug']
                });
                if (total_1 > Number(lookupContrato.custrecord_lrc_valor_doug)) {
                    throw Error('A soma das parcelas não pode ser superior ao valor do contrato principal!');
                }
            }
        }
        if (ctx.type == ctx.UserEventType.EDIT) {
            var oldContrato = oldRecord.getValue('custrecord_lrc_contrato_princi');
            if (contrato != oldContrato) {
                throw Error('Não é permitido alterar o contrato de uma parcela.');
            }
            if (contrato) {
                var oldValor = oldRecord.getValue('custrecord_lrc_valor_doug');
                var valor = newRecord.getValue('custrecord_lrc_valor_doug');
                var total_2 = Number(valor);
                if (valor != oldValor) {
                    search_1.default.create({
                        type: 'customrecord_lrc_contrato_doug',
                        filters: ['custrecord_lrc_contrato_princi', 'IS', contrato],
                        columns: ['custrecord_lrc_valor_doug']
                    }).run().each(function (result) {
                        if (Number(result.id) != Number(newRecord.id)) {
                            var valor_1 = result.getValue('custrecord_lrc_valor_doug');
                            total_2 += Number(valor_1);
                        }
                        return true;
                    });
                    var lookupContrato = search_1.default.lookupFields({
                        type: 'customrecord_lrc_contrato_doug',
                        id: 'contrato',
                        columns: ['custrecord_lrc_valor_doug']
                    });
                    if (total_2 > Number(lookupContrato.custrecord_lrc_valor_doug)) {
                        throw Error('A soma das parcelas não pode ser superior ao valor do contrato principal!');
                    }
                }
            }
        }
    };
    exports.beforeSubmit = beforeSubmit;
});
