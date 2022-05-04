/**
 *@NApiVersion 2.0
 *@NScriptType ClientScript
 */


 define(['N/ui/dialog'],

 function(dialog) {

     function helloWorld() {

         var options = {
             title: 'RunSmart_Dev',
             message: 'Teste de Script, Rafael Oliveira'
         };

         try {

             dialog.alert(options);

             log.debug ({
                 title: 'Success',
                 details: 'Alert displayed successfully'
             });

         } catch (e) {

             log.error ({
                 title: e.name,
                 details: e.message
             });
         }
     }

 return {
     pageInit: helloWorld
 };
});