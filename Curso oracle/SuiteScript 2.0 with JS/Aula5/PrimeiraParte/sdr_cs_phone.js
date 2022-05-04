/**
 * @NApiVersion 2.0
 * @NScriptType UserEventScript
 */
define(['N/record'],  // coloco entre colchetes o módulo que quero chamar (usando o /n no começo dele)
/**
 * @param {record} record  // ajuda no autocomplete da IDE
 */
function(record){  // aqui eu uso o módulo como parâmetro da função, assim inserindo ele dentro dela 

    return{
        afterSubmit: function (ctx) {
            var employee = ctx.newRecord;
            var empCode = employee.getValue('custentity_sdr_employee_code');
            var supervisorId = employee.getValue('supervisor');
            var telefone = employee.getValue('phone');

            if(ctx.type == ctx.UserEventType.CREATE){  // diz que é uma criação
                var phoneCall = record.create({  // aqui cria um registro chamado "phoneCall"
                    type: record.Type.PHONE_CALL,    // aqui específica o tipo de registro
                    defaultValues: {      // usa configurações padrões
                        customform: -150     // customform é um comando para forçar o uso de um formulário específico 
                    }
                });
                phoneCall.setValue('title', 'ligue para o RH para benefícios');  // estamos criando um valor no campo título
                phoneCall.setValue('assigned', employee.id); // estamos criando um valor no campo organizador
                // phoneCall.setValue('phone', telefone);
                phoneCall.save();   // esse comando salva o registro
            }
        }
    }
})