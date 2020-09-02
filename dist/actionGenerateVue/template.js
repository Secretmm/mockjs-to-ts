//短横杠变为驼峰
function getCamelCase(str) {
    return str.replace(/-([a-z])/g, function (all, i) {
        return i.toUpperCase();
    })
}
function setName(apiName) {
    const apiArr = apiName.split('/');
    return getCamelCase(apiArr[apiArr.length - 1]);
}
function setCapture(name) {
    return name.substring(0, 1).toUpperCase() + name.substring(1);
}
function setTempImport(apiName) {
    const name = setName(apiName);
    return `
    import {
        metaProvider as ${name}Provider,
        Params as ${setCapture(name)}Params,
        Response as ${setCapture(name)}Reponse
    } from '@${apiName}';`
}

function setTempAction(apiName, method) {
    const name = setName(apiName);
    return `
    export function ${method.toLowerCase()}${setCapture(name)}(payload: CallbackPayloadData<${setCapture(name)}Params, ${setCapture(name)}Reponse>) {
        fetchApi(${name}Provider, payload.data)
            .then(data => {
                payload.callback && payload.callback(data);
            })
            .catch(e => {
                payload.callbackCatch && payload.callbackCatch();
            });
    }`
}


module.exports = { setTempImport, setTempAction }