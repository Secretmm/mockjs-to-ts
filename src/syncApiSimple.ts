//最初的原版
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';
import * as prettier from 'prettier';
import { convert } from './index';

export default function sync(config) {
    const endpoint = config.endpoint;
    const rootDir = config.rootDir;
    const repositories = config.repositories;
    const includePorts = config.includePorts;
    const cache = getCacheFile(rootDir);
    const { moduleCache, interfaceCache } = prepareCache(cache);

    repositories.forEach(async repository => {
        if (!repository.sync) {
            return;
        }
        let { data } = await getRepository(endpoint, repository.id);
        data = data.data;
        data.modules.forEach(m => {
            if (moduleCache[m.id] === m.updatedAt) {
                return;
            }

            m.interfaces.forEach(async i => {
                if (interfaceCache[i.id] === i.updatedAt) {
                    return;
                }
                if (!includePorts.some(item => item.id === i.id)) {
                    return;
                }
                // console.log(i.id);
                // for(var i in includePorts) {

                // }
                const url = i.url;
                const id = i.id;
                const name = i.name;
                const description = i.description;
                const method = i.method;
                let requestTemplate = await getRequestTemplate(endpoint, id);
                let responseTemplate = await getResponseTemplate(endpoint, id);

                let params = mockjs2ts(requestTemplate.data);
                let response = mockjs2ts(responseTemplate.data.data);
                writeToTs(path.join(rootDir, url), {
                    name,
                    description,
                    method,
                    url,
                    params,
                    response
                });
            });
        });
    });
}

async function getRepository(endpoint: string, id: number) {
    return await axios(`${endpoint}/repository/get?id=${id}`);
}
async function getRequestTemplate(endpoint: string, id: number) {
    return await axios(`${endpoint}/app/mock/template/${id}?scope=request`);
}
async function getResponseTemplate(endpoint: string, id: number) {
    return await axios(`${endpoint}/app/mock/template/${id}?scope=response`);
}
function mockjs2ts(mockjsObj: object) {
    return convert(mockjsObj);
}
function writeToTs(dir, options) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    // console.log(path.join(dir, 'index.ts'));
    return fs.writeFileSync(
        path.join(dir, 'index.ts'),
        prettier.format(
            `import axios from 'axios';
            interface StringIndex<T> {
        [index: string]: T;
    }
    const method = '${options.method}';
    const url = '${options.url}';
    interface Params ${options.params}
    interface Response ${options.response}
    export async function fetch(params: Params, mock?: boolean): Promise<Response> {
        const { data } = await axios({
            url: url,
            method: method,
            ${options.method === 'GET' ? 'params' : 'data'}: params,
        })
        if (data.code === 200 || data.code === 0) {
            return data.data;
        } else {
            throw { code: data.code, message: data.message };
        }
    }`,
            { parser: 'typescript', singleQuote: true, tabWidth: 4 }
        )
    );
}

function getCacheFile(rootDir: string) {
    return fs.readFileSync(path.join(rootDir, 'cache.json'), 'utf-8');
}
function prepareCache(cacheFile: string) {
    const cache = JSON.parse(cacheFile);
    const moduleCache: any = {};
    const interfaceCache: any = {};
    cache.modules.forEach(repository => {
        moduleCache[repository.id] = repository.updatedAt;
        repository.interfaces.forEach(i => {
            i[i.id] = i.updatedAt;
        });
    });
    return {
        moduleCache,
        interfaceCache
    };
}
