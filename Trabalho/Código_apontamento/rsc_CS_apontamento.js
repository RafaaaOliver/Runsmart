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
                console.log('Estou funcionando...')
                var apontamento = ctx.currentRecord
                var horasTotaisTrabalhadas = apontamento.getValue('custrecord_rsc_horasatuadas_rafael')  // pega o valor do campo Horas atuadas
                var horasFaturaveis = apontamento.getValue('custrecord_apontamento_alocadascampo')
                var textFaturaveis = 'Horas faturáveis'
                var textTotais = 'Horas totais trabalhadas'

                var returnando1 = requisisoes(horasTotaisTrabalhadas, textTotais)
                var returnando2 = requisisoes(horasFaturaveis, textFaturaveis)
                var retorno; 
                log.debug('returnando1: ', returnando1)
                log.debug('returnando2: ', returnando2)

                if (returnando1 == true && returnando2 == true){
                    retorno = true
                }else{
                    retorno = false
                }
                log.debug('retorno', retorno)
                return retorno
            }catch(e){ // recebe um erro 
                log.debug('Erro', e)  // mostra o erro
            }
        }

        function requisisoes(Horas, nome){
            var virgula = Horas.indexOf(',') 
            log.debug('Print do campo inteiro: ', Horas)
            log.debug('Índice da virgula: ', virgula)
            var horas = Horas.slice(0, virgula)
            var minutos = Horas.slice(virgula +1)
            log.debug('Horas: ', horas)
            log.debug('Minutos: ', minutos)
            log.debug('campos: ', Horas[1], Horas[2], Horas[3])
            // >>>>>>>>>>>>>>   Mensagens de erro <<<<<<<<<<<<<<<
            var ErroLimite = {
                title: 'Você está fora da quantidade padrão de caracteres!!!',
                message: 'Campo: ' +  nome + '</p> </p> min: 2  max: 5 caracteres.</p> Exemplo:</p> 0,5 == 30 minutos </p> 1,0 == 1 hora </p> 1,5 == 1 hora e 30 minutos </p> 2,0 == 2 horas </p> Limite: 999,5 == 999 horas e 30 minutos.'
            }
            var ErroLetra = {
                title: 'Você inseriu caracteres inválidos!!!',
                message: 'Campo: ' +  nome + '</p> </p> Forneça apenas números e uma vírgula.</p> Exemplo:</p> 0,5 == 30 minutos </p> 1,0 == 1 hora </p> 1,5 == 1 hora e 30 minutos </p> 2,0 == 2 horas'
            }
            var ErroTipo = {
                title: 'O formato está inválido!!!',
                message: 'Campo: ' +  nome + '</p> </p> Os minutos precisam ser mostrados como 0 ou 5. Digite as horas de acordo com o seguinte exemplo: 0,5 == 30 minutos </p> 1,0 == 1 hora </p> 1,5 == 1 hora e 30 minutos </p> 2,0 == 2 horas'
            }
            // >>>>>>>>>>>>>>>>> condicionais para verificação do campo <<<<<<<<<<<<<<<<<<<
            if(Horas){  // se tiver algo nele, faça:   
                if (Horas.length > 5 || Horas.length < 3){
                    dialog.alert(ErroLimite)
                    return false
                }
                else if (minutos != Number(minutos) || horas != Number(horas)){
                    dialog.alert(ErroLetra)
                    return false
                }
                else if((Number(minutos) == 5 || Number(minutos) ==0) && (Horas[1] == ',' || Horas[2] == ',' || Horas[3] == ',')){ // confere se são números e se tem o dois pontos
                    return true // deixa salvar

                }else{ 
                    dialog.alert(ErroTipo) // usa a mensagem de erro da linha 26
                    return false // não deixa salvar
                }
            }else{ // se o campo estiver vazio, deixa salvar 
                return true // deixa salvar
            }
        }
        
        return{
            saveRecord: saveRecord
            // requisisoes: requisisoes // usa a função
        }
    })