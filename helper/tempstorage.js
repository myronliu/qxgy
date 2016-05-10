
var tempStorage={};

tempStorage.save = function(name, value){
    if(!!sessionStorage){
        sessionStorage[name] = value;
    }else{
        window[name] = value;
    }
    return true;
};

tempStorage.get = function(name){
    if(!!sessionStorage){
        return sessionStorage[name];
    }else{
        return window[name];
    }
};

tempStorage.saveToLocalStorage = function(name, value){
    if(!!sessionStorage){
        localStorage[name] = value;
    }else{
        window[name] = value;
    }
    return true;
};

tempStorage.getFromLocalStorage = function(name){
    if(!!localStorage){
        return localStorage[name];
    }else{
        return window[name];
    }
};

module.exports = tempStorage;