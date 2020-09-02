"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var repositories = [
    // {
    //     //YiYou
    //     id: 19,
    //     sync: true
    // },
    // {
    //     //题库
    //     id: 22,
    //     sync: true
    // },
    // {
    //     //课件转换
    //     id: 23,
    //     sync: true
    // },
    // {
    //     //老师端遗漏接口
    //     id: 29,
    //     sync: true
    // },
    // {
    //     //学生端遗漏接口
    //     id: 30,
    //     sync: true
    // },
    // {
    //     //运营活动
    //     id: 49,
    //     sync: true
    // },
    {
        //老师报名
        id: 230486,
        sync: true
    },
    {
        //erp
        id: 230762,
        sync: true
    },
    {
        //老师端
        id: 230530,
        sync: true
    },
    {
        //学生端
        id: 230531,
        sync: true
    },
    {
        //学生端app
        id: 248639,
        sync: true
    },
    {
        //家长端app
        id: 261875,
        sync: true
    },
];
var includeArray = [
    { id: 1698849 },
];
exports.default = {
    mockServer: 'rap2',
    endpoint: 'http://rap2api.taobao.org',
    // endpoint: 'http://test.yi-you.org:9998',
    // rootDir: 'apisArray',
    rootDir: 'apisSwm',
    repositories: repositories,
    includePorts: includeArray
};
