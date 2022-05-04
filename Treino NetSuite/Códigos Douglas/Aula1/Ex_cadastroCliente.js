/**
 * @NScriptType suitelet
 * @NApiVersion 2.0
 * @scriptName Tela_treino1
 */
define([ 'N/ui/serverWidget'],  // é o módulo para criação de formulários

function(ui)  // renomeei como ui
{
    function onRequest(context)   // função que é usada quando requisitada
    {
        var form = ui.createForm({  // cria formulário
            title: 'Cadastro de Cliente'  // título do formulário
        });
        form.addFieldGroup({   // cria um grupo do formulário
            id : 'custpage_dados_pessoais',  
            label : 'Dados Pessoais'   // nome do grupo
        }); 
        form.addFieldGroup({ // cria um grupo do formulário
            id : 'custpage_endereco',
            label : 'Endereço' // nome do grupo
        });
        form.addField({  // cria um campo
            label: "Nome:", // nome do campo
            type: ui.FieldType.TEXT,  // tipo de campo
            id:'custpage_nome',  // id do campo
            container:'custpage_dados_pessoais'  // grupo que ele pertence (pelo id)
        })
        form.addField({  // cria um campo
            label: "Nome da Empresa:", // nome do campo
            type: ui.FieldType.TEXT,  // tipo de campo
            id:'custpage_nome_empresa', // id do campo 
            container:'custpage_dados_pessoais' // grupo que ele pertence (pelo id)
        })

        form.addField({ // cria um campo
            label: "Email:", // nome do campo
            type: ui.FieldType.TEXT,  // tipo de campo
            id:'custpage_email', // id do campo
            container:'custpage_dados_pessoais' // grupo que ele pertence (pelo id)
        })
        form.addField({ // cria um campo
            label: "Telefone:", // nome do campo
            type: ui.FieldType.INTEGER, // tipo de campo
            id:'custpage_telefone', // id do campo
            container:'custpage_dados_pessoais' // grupo que ele pertence (pelo id)
        })
        form.addField({ // cria um campo
            label: "Empresa?", // nome do campo
            type: ui.FieldType.CHECKBOX, // tipo de campo
            id:'custpage_check_empresa', // id do campo
            container:'custpage_dados_pessoais' // grupo que ele pertence (pelo id)
        }) 
        form.addField({ // cria um campo
            label: "Endereço:", // nome do campo
            type: ui.FieldType.TEXTAREA, // tipo de campo
            id:'custpage_endereco', // id do campo
            container:'custpage_endereco' // grupo que ele pertence (pelo id)
        })
        form.addButton({ 
            id : 'custpage_salvarCliente', // id do botão
            label : 'Salvar',  // nome do botão
            functionName:'salvar' // função que será usada sempre que o usuário clickar no botão
        })
        form.clientScriptModulePath = './funcionalidadeCadastro.js'; // vincula o ClientScript com o suitelet
        context.response.writePage(form); // cria o formulário (escreve ele)
    }

    return {
        onRequest: onRequest // usa a função
    };
});
