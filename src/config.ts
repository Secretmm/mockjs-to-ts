import includePorts from './list';
const repositories = [
    {
        //YiYou
        id: 19,
        sync: true
    },
    {
        //题库
        id: 22,
        sync: true
    },
    {
        //课件转换
        id: 23,
        sync: true
    },
    {
        //老师端遗漏接口
        id: 29,
        sync: true
    },
];

export default {
    mockServer: 'rap2',
    endpoint: 'http://test.yi-you.org:9998',
    rootDir: 'apis',
    repositories: repositories,
    includePorts: includePorts
}