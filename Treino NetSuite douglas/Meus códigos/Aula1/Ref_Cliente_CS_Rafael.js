/**
* @NScriptType ClientScript
* @NApiVersion 2.0
* 
*/

define(['N/currentRecord', 'N/record', 'N/search', 'N/url'],   
function(currentRecord, record, search, url){   
    function fieldChanged(ctx){ 
        var page = ctx.currentRecord; 
        var campoID = page.getValue('custpage_cliente') 
        console.log('Campo do cliente' ,campoID) 
        if(ctx.fieldId == 'custpage_cliente'){ 

            var subsidi = search.lookupFields({  
                type:'customer', 
                id: campoID, 
                columns:['subsidiary'] 
            }) 
            var subsidiary = subsidi.subsidiary[0].value 
            
            
            console.log('lookup:' ,subsidi)
            console.log('valor da subsdiária: ',subsidiary)  
            
            var teste = page.getValue('custpage_subsidiaria') 
            console.log('valor do campo da subsidiária do ST: ', teste)
            page.setValue('custpage_subsidiaria', subsidiary)
            final = page.getValue('custpage_subsidiaria')   
            console.log('subsidiária substituída final: ', final)
            var arroba = page.getValue('custpage_cliente')
            console.log('morte da cabrita: ', arroba)
        }

    }
    
    function criar(){ 
        var page = currentRecord.get(); 
        var data = new Date() 
        var cliente = page.getValue('custpage_cliente') 
        var sub = page.getValue('custpage_subsidiaria') 
        var nome = page.getValue('custpage_nome') 
        console.log('===============================================')
        console.log('cabritinha: ',cliente) 
        console.log(sub)
        var client = record.create({ 
            type: 'customrecord_rsc_reg_rafael', 
            isDynamic: true 
        })
        client.setValue('custrecord_rsc_campocliente_rafael', cliente) 
        client.setValue('custrecord_rsc_camposubsdiaria_rafael', sub) 
        client.setValue('name',nome ) 
        client.setValue('custrecord_rsc_campodata_rafael', data) 
        var idinterno = client.save() 
        
        var link = url.resolveRecord({
            recordType: 'customrecord_rsc_reg_rafael',
            recordId: idinterno,
        })
        
        window.location.replace(link)

    }

    return{
        fieldChanged: fieldChanged,
        criar: criar  
    }
})