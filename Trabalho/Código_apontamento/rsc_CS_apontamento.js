/**
* @NScriptType ClientScript
* @NApiVersion 2.0
* @Authors Rafael Oliveira & Gabriel Pavia
*/
define(['N/currentRecord','N/search', 'N/log', 'N/ui/dialog'], function(record, search, log, dialog){
/**
 * a função saveRecord precisa de um retorno true or false
 * true (deixa salvar)
 * false (não deixa salvar)
 */
    function saveRecord(ctx){ // função que será executada ao salvar
        try{
            var apontamento = ctx.currentRecord
            console.log('Estou funcionando...')
            // if (ctx.fieldId == 'custrecord1500'){
                var field = apontamento.getValue('custrecord_rsc_horasatuadas_rafael')  // pega o valor do campo Horas atuadas
                var pontos = field.indexOf(':') // pega o indice que contém os dois pontos
                var horas = field.slice(0, pontos) // fatia do começo até os pontos e coloca em uma variável
                var minutos = field.slice(pontos +1) // pega o conteúdo a partir do ponto e colcoa em variável
                console.log('Estou rodando...')
                console.log(horas)
                console.log(minutos)
                // >>>>>>>>>>>>>>   Mensagens de erro <<<<<<<<<<<<<<<
                var ErroTamanho = {   
                    title: 'Tamanho inválido!!!',
                    message: 'Por favor, forneça no máximo cinco caracteres (hh:mm)'
                }
                var ErroTipo = {
                    title: 'O formato está inválido!!!',
                    message: 'Digite as horas de acordo com o seguinte exemplo: (hh:mm)'
                }
                // >>>>>>>>>>>>>>>>> condicionais para verificação do campo <<<<<<<<<<<<<<<<<<<
                if(field){  // se tiver algo nele, faça:
                    if(field.length == 5){ // condição que limita o tamanho do campo para 5 caracteres
                        // para o JavaScript  '1' == 1, então eu verifiquei se a string pode é numérica ou apenas texto
                        if(horas == Number(horas) && minutos == Number(minutos) && field[2] == ':' && field[3] < 6){ // confere se são números e se tem o dois pontos
                            return true // deixa salvar
                        }else{ 
                            dialog.alert(ErroTipo) // usa a mensagem de erro da linha 26
                            return false // não deixa salvar
                        }
                    }else{
                        dialog.alert(ErroTamanho) // usa a mensagem de erro da linha 21
                        return false // não deixa salvar 
                    }
                }else{ // se o campo estiver vazio, deixa salvar 
                    return true // deixa salvar
                }
        }catch(e){ // recebe um erro 
            log.debug('Erro', e)  // mostra o erro
        }
    }
    
    return{
        saveRecord: saveRecord // usa a função
    }
})