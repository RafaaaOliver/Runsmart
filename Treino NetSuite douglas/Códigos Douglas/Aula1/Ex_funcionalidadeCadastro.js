/**
* @NScriptType ClientScript
* @NApiVersion 2.0
* 
*/
define(['N/ui/dialog', 'N/runtime', 'N/currentRecord', "N/log"], // importa os módulos 


function( dialog, runtime, currentRecord, log )  // puxa os módulos para dentro da função
{
    function pageInit(ctx){     // função que será executada quando abrir a página
        var currRecord = ctx.currentRecord;   // puxa o contexto
        console.log(currRecord.getValue('custpage_check_empresa'))  // podemos dar console.log no client script e ver 
        if(currRecord.getValue('custpage_check_empresa')){  // se o campo do checkbox for true
            currRecord.getField({  // o campo nome
                fieldId: 'custpage_nome'  // id do campo
            }).isVisible = false  // ficará oculto
            currRecord.getField({  // o nome do campo
                fieldId: 'custpage_nome_empresa'  // id do campo
            }).isVisible = true  // ficará visivel
        }else{  // se o checkbox estiver desmarcado
            currRecord.getField({   
                fieldId: 'custpage_nome' // o campo nome ficará vísivel
            }).isVisible = true  
            currRecord.getField({
                fieldId: 'custpage_nome_empresa'  // o campo empresa ficará invisível
            }).isVisible = false
        }
    } 

    function salvar(){  // a função do botão é definida no UserEvent
        var currRecord = currentRecord.get();  // puxa o evento da página (não precisa puxar o id, pois ele se refere a página)
        var nome = currRecord.getValue('custpage_nome'); // o campo nome do furmulário
        console.log(nome)  // teste de CS é no F12
    }

    function fieldChanged(ctx){  // sempre que acontecer algo em um campo, faça uma ação
        console.log('entrou');
        var fieldid = ctx.fieldId; // id do campo (foi definido como vazio, mas será preenchida na linha 42))
        var currRecord = ctx.currentRecord; // valor da página inteira
        console.log(fieldid) // teste de CS é no F12
        if(fieldid == 'custpage_check_empresa'){ // se o campo for a checkbox, faça
            var check = currRecord.getValue('custpage_check_empresa'); // pega o conteúdo da checkbox
            console.log(check)
            if(check){  // se ela retornar verdadeiro, faça
                currRecord.getField({
                    fieldId: 'custpage_nome'
                }).isVisible = false // o campo nome ficará invísivel
                currRecord.getField({
                    fieldId: 'custpage_nome_empresa'
                }).isVisible = true // o campo empresa ficará vísivel
            }else{
                currRecord.getField({ // se ela retornar false, faça
                    fieldId: 'custpage_nome'
                }).isVisible = true // o campo nome ficará vísivel
                currRecord.getField({
                    fieldId: 'custpage_nome_empresa'
                }).isVisible = false // o campo empresa ficará invísivel
            }
        }
    }
    return {
        pageInit: pageInit,
        salvar: salvar,  // retornam as funções
        fieldChanged:fieldChanged
    }
});