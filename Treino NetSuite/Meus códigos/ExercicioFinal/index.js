// var ranjo = 5

// for (var i = 0; i <= ranjo; i++){
//     console.log('Rodei: ', i, 'vezes')
// }




// var contrato = 200.6
// var parcelas = 11 

// console.log('Teste com toFixed: ', contrato.toFixed(1))
// console.log('Divisão normal: ', contrato / parcelas)
// console.log('Divisão normal: ', Math.floor(contrato / parcelas))




var n = 1256.25977777
var strN = n.toString()
var divisao = strN.indexOf('.')
var aftVirg = strN.slice(0 , divisao)
var posVirg = strN.slice(divisao, divisao + 3)
var concat = aftVirg + posVirg
var final = Number(concat)
console.log('número: ', n)
console.log('número como string: ', strN, 'tipo: ', typeof strN)
console.log('indice do ponto: ', divisao)
console.log('conteúdo antes da a virgula:', aftVirg)
console.log('conteúdo aós a virgula:', posVirg)
console.log('Resultado: ', final, typeof final)
