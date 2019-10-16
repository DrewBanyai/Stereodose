exports.check = (varName, type, body) => {
    if (!body.hasOwnProperty(varName)) { console.log("Body has no variable named " + varName); return false; }
    let varType = Object.prototype.toString.call(body[varName]);
    if (varType != `[object ${type}]`) { console.log("VarCheck: Expected " + `[object ${type}]` + ", got " + varType); return false;}
    return true;
}