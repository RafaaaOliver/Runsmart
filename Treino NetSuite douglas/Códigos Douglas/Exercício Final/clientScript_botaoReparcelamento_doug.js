/**
* @NApiVersion 2.x
* @NScriptType Clientscript
*
*  clientscript_correçãoFatura.ts
*
*/
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
define(["require", "exports", "N/log", "N/url", "N/currentRecord"], function (require, exports, log_1, url_1, currentRecord_1) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    exports.enviarReparcelamento = exports.pageInit = void 0;
    log_1 = __importDefault(log_1);
    url_1 = __importDefault(url_1);
    currentRecord_1 = __importDefault(currentRecord_1);
    var pageInit = function (ctx) {
    };
    exports.pageInit = pageInit;
    var enviarReparcelamento = function () {
        var record = currentRecord_1.default.get();
        // console.log(record.id)
        var enviar = url_1.default.resolveScript({
            scriptId: 'customscript_lrc_selecao_de_reparcelamen',
            deploymentId: 'customdeploy_lrc_selecao_de_reparcelamen',
            params: {
                idFatura: JSON.stringify(record.id)
            }
        });
        log_1.default.error("Enviar", record.id);
        log_1.default.error("Fatura", record.id);
        window.location.replace(enviar);
    };
    exports.enviarReparcelamento = enviarReparcelamento;
});
