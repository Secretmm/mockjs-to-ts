//Params变为驼峰
import axios from 'axios';
import * as path from 'path';
import * as fs from 'fs';
import * as prettier from 'prettier';
import { convert, convert3 } from './index';

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

                let params = mockjs3ts(requestTemplate.data);
                let response = mockjs2ts(responseTemplate.data.data);
                let array = false;
                let item = null;
                console.log('88');
                for (let i in responseTemplate.data) {
                    if (i.indexOf('data') !== -1 && responseTemplate.data[i].length) {
                        item = responseTemplate.data[i][0];
                        array = true;
                    }
                }
                if (item) {
                    console.log('到了这里');
                    response = mockjs2ts(item);
                }

                writeToTs(path.join(rootDir, url), {
                    name,
                    description,
                    method,
                    url,
                    params,
                    response,
                    array
                });
            });
        });
    });
}

async function getRepository(endpoint: string, id: number) {
    return await axios({
        url: `${endpoint}/repository/get?id=${id}`,
        headers: {
            'Cookie': 'koa.sid=9Z45JyYURFfnIx8v2Zx7lmwzlIw4pH9t; koa.sid.sig=8_Ddwv128ZKjivsJN7nJq-FA5CA'
        }
    });
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
function mockjs3ts(mockjsObj: object) {
    return convert3(mockjsObj);
}
function writeToTs(dir, options) {
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
    // console.log(path.join(dir, 'index.ts'));
    return fs.writeFileSync(
        path.join(dir, 'index.ts'),
        prettier.format(
            `import { ApiMetaProvider } from '@/api';
            const method = '${options.method}';
            const url = '${options.url}';
            export interface Params ${options.params}
            export interface Response ${options.response}
            export const metaProvider: ApiMetaProvider<Params, ${options.array ? 'Array<Response>' : 'Response'}> = function() {
                return {
                    url: url,
                    method: method
                };
            };
            `,
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
