dia = '5'
mes = '7'
ano = '2000'

function datanova(data){
    if(Number(data) < 10){
        data = '0' + data
        return data
    }else{
        return data
    }
}   
dia = datanova(dia)
mes = datanova(mes)
ano = datanova(ano)
var horaFinal = dia + '/' + mes + '/' + ano
console.log(horaFinal)
