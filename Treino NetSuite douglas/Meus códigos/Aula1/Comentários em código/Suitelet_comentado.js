/**
 * @NScriptType suitelet
 * @NApiVersion 2.0
 * @scriptName Criacao_de_ref_cliente 
 */
define(['N/ui/serverWidget'],function(ui){
    
    function onRequest(ctx){  // função que é ativada quando chamada (no caso vai virar URL)
        var form = ui.createForm({  // importando as funções de create form para dentro da variável form
            title: 'Criação de Ref Cliente'  // criando o título do form
        });
        form.addField({   // comando para criação de campo
            label: "Nome",   // nome do campo
            type: ui.FieldType.TEXT, // tipo de campo
            id: 'custpage_nome',  // id do campo
        })
        form.addField({  // comando para criação de campo
            label: "Cliente", // nome do campo
            type: ui.FieldType.SELECT, // tipo de campo (campo de lista suspensa)
            id: 'custpage_cliente',  // id do campo
            source: 'customer' // faz referência a um registro existente
        })
        form.addField({ // comando para criação de campo
            label: "Subsidiária", // nome do campo
            type: ui.FieldType.SELECT, // tipo de campo
            id: 'custpage_subsidiaria', // id do campo
            source:'subsidiary'
        })
        form.addButton({ // comando para criação do botão
            id: 'custpage_salvarcliente', // id do botão
            label: 'criar', // nome do botão
            functionName: 'criar' // esse comando caça uma função com esse nome, se achar, executa
        })
        form.clientScriptModulePath = './Ref_Cliente_CS_Rafael.js';  // faz referência a outro script
        ctx.response.writePage(form);  // escreve o formulário
    }
    return{
        onRequest: onRequest  // retorna a função
    }
})