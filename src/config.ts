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
    {
        //学生端遗漏接口
        id: 30,
        sync: true
    },
];
const includePortsM = [
    // { id: 449, url: '/api/faq/type-list' },
    // { id: 491, url: '/api/rob-class/index' },
    // { id: 393, url: '/api/product-log/comment-list' },
    // { id: 532, url: '/api/teacher/class-log' },
    // { id: 542, url: '/api/teacher/get-student-exam-type' },
    // { id: 541, url: '/api/teacher/get-student-score-list' },
    // { id: 481, url: '/api/credit/gift-list' },
    // { id: 501, url: '/api/teacher/remind' },
    // { id: 544, url: '/api/teacher/get-business-training-time' },

    // { id: 537, url: '/api/teacher/update-class-train-time' },//这个接口很特殊

    // { id: 485, url: '/api/faq/faq-detail' },
    // { id: 485, url: '/api/teacher/class-log' },
    // { id: 519, url: '/api/user' },
    // { id: 584, url: '/api/user/avatar' },
    // { id: 267, url: '/api/jingyou-favorite/operate-favorite?action=list' },
    { id: 263, url: '/api/jingyou-favorite/operate-question?action=add' },
    { id: 232, url: '/api/jing-you/detail' },
    { id: 271, url: '/api/jing-you/get-points' },
];
const includeArray = [
    { id: 457, url: '/api/course-table/teacher-plan-list' },
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
    // rootDir: 'apis',
    rootDir: 'apisArray',
    repositories: repositories,
    includePorts: includeArray
}