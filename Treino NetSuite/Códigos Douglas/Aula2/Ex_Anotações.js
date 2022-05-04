// var searchSub = search.create({
//     type: 'subsidiary',
//     filters:[
//         ['currency', 'IS', variavel],
//     ]
// }).run().getRange({
//     start:0,
//     end: 1
// })

// searchLookup = search.lookupFields({
//     type:'subsidiary',
//     id: searchSub[0].id,
//     columns: 
// })


// var soma = 0;
// var searchSub = search.create({
//     type: 'salesorder',
//     filters:[
//         ['approvalstatus', 'IS', 1],
//     ],
//     columns:['total']
// }).run().each((result) => {
//     soma += result.getValue('total');
//     return true;
// }
// 10 salesorder -> approvalstatus = 1

// var array = [1,2,3,4,5,6,7,8,9,10];

// for(var i=0; i<array.length;i++){
//     result = array[i]
// }