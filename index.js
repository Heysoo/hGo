;(function(global){

  const Go = function(){
    // instance of xmlhttprequest
    this.xhr = null;
    // hooks
    this.beforeHooks = {
      'send': [],
    };
    this.afterHooks = {
      'send': [],
    };
    this.onHooks = {
      'error': [],
      'success': [],
      'done': [], 
      'stop': [],
    };
    this.onHooks.complete = this.onHooks.done;
    this.onHooks.stop = this.onHooks.abort;
  };

  Go.prototype.send = function(){
    const self = this;
    if(global.XMLHttpRequest){
      this.xhr = new global.XMLHttpRequest();
    }else if(global.ActiveXObject) {
      this.xhr = new global.ActiveXObject('Microsoft.XMLHTTP');
    }else throw new Error('your browser dose not support ajax.');

    this.xhr.onreadystatechange = function(){
      if(self.xhr.readyState === 1){       // ready to send a request
        self.fire(self.beforeHooks.send);
      }else if(self.xhr.readyState === 2){ // request sent
        self.fire(self.afterHooks.send);
      }else if(self.xhr.readyState === 4){ // request complete(successful or failed)
        self.fire(self.onHooks.complete);
      }
    }
  };

  // fire hooks
  Go.prototype.fire = function(hooks){
    for(const hook of hooks){
      hook();
    }
  };

  Go.prototype.on = function(stage, callback){
    this.onHooks[stage].push(callback);
  };

  Go.prototype.before = function(stage, callback){
    this.beforeHooks[stage].push(callback);
  };

  Go.prototype.after = function(stage, callback){
    this.afterHooks[stage].push(callback);
  };

  global.hGo = Go;

})(window);