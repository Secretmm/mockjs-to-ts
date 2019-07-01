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
    {
        //学生端遗漏接口
        id: 30,
        sync: true
    },
];

const includeArray = [
    { id: 701 },
    { id: 702 },
    { id: 703 },
    { id: 704 },
    { id: 705 },
    { id: 706 }
];
export default {
    mockServer: 'rap2',
    endpoint: 'http://test.yi-you.org:9998',
    // rootDir: 'apis',
    rootDir: 'apisArray',
    repositories: repositories,
    includePorts: includeArray
}