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
];
const includePorts = [
    //题库
    { id: 331, url: '/api/class-question/used-courseware' },
    { id: 333, url: '/api/class-question/question-examine' },
    // YiYou
    { id: 304, url: '/api/teacher-card/get-list' },
    { id: 67, url: '/market/jing-you-point/import' },
    // 课件转换
    { id: 346, url: '/api/convert-courseware/update-status' },
];
export default {
    mockServer: 'rap2',
    endpoint: 'http://test.yi-you.org:9998',
    rootDir: 'apis',
    repositories: repositories,
    includePorts: includePorts
}