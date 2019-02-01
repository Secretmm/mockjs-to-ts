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
    // {
    //     //学生端遗漏接口
    //     id: 30,
    //     sync: true
    // },
];
const includePortsM = [
    { id: 449, url: '/api/faq/type-list' },
    // { id: 491, url: '/api/rob-class/index' },
];
const list = [
    { id: 555, url: '/api/student/calendar-class' },
    { id: 557, url: '/api/student/edit-headline' },
    { id: 558, url: '/api/student/student-detail' },
    { id: 559, url: '/api/student/student-hours' },
    { id: 560, url: '/api/student/edit-data' },
    { id: 561, url: '/api/user/password' },
    { id: 565, url: '/api/student/class-subject' },

    { id: 564, url: '/api/student/get-live-class-msg' },
    { id: 566, url: '/api/student/get-live-class-plan' },
    { id: 571, url: '/api/student/recent-class' },
    { id: 569, url: '/api/class/check-code' },
    { id: 570, url: '/api/student/class-record' },

]
export default {
    mockServer: 'rap2',
    endpoint: 'http://test.yi-you.org:9998',
    rootDir: 'apis',
    // rootDir: 'apisMore',
    repositories: repositories,
    includePorts: includePorts
}