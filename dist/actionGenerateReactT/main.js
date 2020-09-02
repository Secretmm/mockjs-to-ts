const path = require('path');
const fs = require('fs');
const { setTempImport, setTempAction } = require('./template');

// const config = JSON.parse(fs.readFileSync(path.join(__dirname, './config.json'), 'utf-8'));
let tempImport = '';
let tempAction = '';
let tempReponse = '';
let tempUse = '';
const apiRoute = '../apisSwm/teacher';
const apiDir = fs
    .readdirSync(path.join(__dirname, apiRoute))
    .filter(item => item !== 'index.ts');

apiDir.forEach(dirName => {
    const dirNameList = fs
        .readdirSync(path.join(__dirname, `${apiRoute}/${dirName}`))
        .filter(item => item !== 'index.ts');

    dirNameList.forEach(item => {
        const file = fs.readdirSync(
            path.join(__dirname, `${apiRoute}/${dirName}/${item}`)
        )[0];
        const data = fs.readFileSync(
            path.join(__dirname, `${apiRoute}/${dirName}/${item}/${file}`),
            'utf-8'
        );

        if (!extractM(data).length || !extractU(data).length) {
            console.log(`/student/${dirName}/${item}被玩儿坏了`);
            return;
        }
        const method = extractM(data)[0];
        const api = `/api${extractU(data)[0]}`;
        // if (config.generatedApi.some(item => item === api)) {
        //     return;
        // }

        const tempImportItem = setTempImport(api);
        tempImport += tempImportItem;

        const tempActionItem = setTempAction(api, method);
        tempAction += tempActionItem;

        // config.generatedApi.push(api);
    });
});

// fs.writeFileSync(path.join(__dirname, './config.json'), JSON.stringify(config));
fs.writeFileSync(
    path.join(__dirname, './result.js'),
    tempImport + tempAction + tempReponse + tempUse
);

function extractM(str) {
    let reg = /method = '([^\s]*?)'/g;
    let ret = [];
    while ((arr = reg.exec(str))) {
        ret.push(arr[1]);
    }
    return ret;
}
function extractU(str) {
    let reg = /url = '([^\s]*?)'/g;
    let ret = [];
    while ((arr = reg.exec(str))) {
        ret.push(arr[1]);
    }
    return ret;
}
