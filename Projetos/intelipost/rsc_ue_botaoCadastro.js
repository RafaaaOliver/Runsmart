/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define([], function() {

    function beforeLoad(ctx) {
        var form = ctx.form         
        if(ctx.type == ctx.UserEventType.EDIT || ctx.type == ctx.UserEventType.VIEW){

        }
    }

    return {
        beforeLoad: beforeLoad
    }
});
