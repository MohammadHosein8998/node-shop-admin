import { log } from "./utils.js";
import nunjucks from 'nunjucks';

export function alertDanger(key , message){
    try{
        const html = `
        <div class='alert alert-danger text-center'>${message} </div>
        `
        return html;
    }catch(e){
        return e.toString();
    }
}




//nunjucks document -> costum tag
export function alertDangerExtension(){
    this.tags = ['AlertDanger'];
    this.parse = function(parser, nodes, lexer) {
        // get the tag token
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        var body = parser.parseUntilBlocks('endAlertDanger');   
        parser.advanceAfterBlockEnd();
        // See above for notes about CallExtension
        return new nodes.CallExtension(this, 'run', args, [body]);
    };

    
    this.run = function(context, key, body) {
       try{
        
        const msg = context?.ctx?.settings?.req?.query?.msg ?? '';
            if(msg === key)
            {
                const html = `
                    <div class="text-center alert alert-danger">${body()}</div>
                `;
                return nunjucks.runtime.markSafe(html);
            } 
       }catch(e){
        return e.toString();
       }
    };
}

export function alertSuccessExtension(){
    this.tags = ['AlertSuccess'];
    this.parse = function(parser, nodes, lexer) {
        // get the tag token
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        var body = parser.parseUntilBlocks('endAlertSuccess');   
        parser.advanceAfterBlockEnd();
        // See above for notes about CallExtension
        return new nodes.CallExtension(this, 'run', args, [body]);
    };

    
    this.run = function(context, key, body) {
       try{
        
        const msg = context?.ctx?.settings?.req?.query?.msg ?? '';
            if(msg === key)
            {
                const html = `
                    <div class="text-center alert alert-success">${body()}</div>
                `;
                return nunjucks.runtime.markSafe(html);
            } 
       }catch(e){
        return e.toString();
       }
    };
}


////////////////////////////////////////////////////////////////
//nunjucks document -> costum tag
export function MenuItemExtension(){
    this.tags = ['MenuItem'];
    this.parse = function(parser, nodes, lexer) {
        // get the tag token
        var tok = parser.nextToken();
        var args = parser.parseSignature(null, true);
        parser.advanceAfterBlockEnd(tok.value);
        var body = parser.parseUntilBlocks('endMenuItem');   
        parser.advanceAfterBlockEnd();
        // See above for notes about CallExtension
        return new nodes.CallExtension(this, 'run', args, [body]);
    };

    
    this.run = function(context, key, body) {
       try{
        var currentRoute =  context.ctx.settings.req.baseUrl + context.ctx.settings.req.path;
        
        if(!currentRoute.endsWith("/")){
            currentRoute += "/";
        }
        if(currentRoute === key)
            {
                const html = 'active';
                return nunjucks.runtime.markSafe(html);
            } 
       }catch(e){
        return e.toString();
       }
    };
}



