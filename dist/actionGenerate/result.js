
    import {
        metaProvider as studentNewRecentProvider,
        Params as StudentNewRecentParams
    } from '@/api/homework/student-new-recent';
    import {
        metaProvider as studentRecentExamProvider,
        Params as StudentRecentExamParams
    } from '@/api/homework/student-recent-exam';
    import {
        metaProvider as getKnowledgeTreeProvider,
        Params as GetKnowledgeTreeParams
    } from '@/api/student/get-knowledge-tree';
    import {
        metaProvider as examDetailProvider,
        Params as ExamDetailParams
    } from '@/api/student-exam-paper/exam-detail';
    import {
        metaProvider as studentListProvider,
        Params as StudentListParams
    } from '@/api/student-exam-paper/student-list';
    import {
        metaProvider as submitAnswerProvider,
        Params as SubmitAnswerParams
    } from '@/api/student-exam-paper/submit-answer';
    getStudentNewRecent({ commit }, payload: CallbackPayloadData<StudentNewRecentParams>) {
        fetchApi(studentNewRecentProvider, payload.data)
            .then(data => {
                payload.callback && payload.callback(data);
            })
            .catch(e => {
                payload.callbackCatch && payload.callbackCatch();
            });
    },
    getStudentRecentExam({ commit }, payload: CallbackPayloadData<StudentRecentExamParams>) {
        fetchApi(studentRecentExamProvider, payload.data)
            .then(data => {
                payload.callback && payload.callback(data);
            })
            .catch(e => {
                payload.callbackCatch && payload.callbackCatch();
            });
    },
    getGetKnowledgeTree({ commit }, payload: CallbackPayloadData<GetKnowledgeTreeParams>) {
        fetchApi(getKnowledgeTreeProvider, payload.data)
            .then(data => {
                payload.callback && payload.callback(data);
            })
            .catch(e => {
                payload.callbackCatch && payload.callbackCatch();
            });
    },
    getExamDetail({ commit }, payload: CallbackPayloadData<ExamDetailParams>) {
        fetchApi(examDetailProvider, payload.data)
            .then(data => {
                payload.callback && payload.callback(data);
            })
            .catch(e => {
                payload.callbackCatch && payload.callbackCatch();
            });
    },
    getStudentList({ commit }, payload: CallbackPayloadData<StudentListParams>) {
        fetchApi(studentListProvider, payload.data)
            .then(data => {
                payload.callback && payload.callback(data);
            })
            .catch(e => {
                payload.callbackCatch && payload.callbackCatch();
            });
    },
    postSubmitAnswer({ commit }, payload: CallbackPayloadData<SubmitAnswerParams>) {
        fetchApi(submitAnswerProvider, payload.data)
            .then(data => {
                payload.callback && payload.callback(data);
            })
            .catch(e => {
                payload.callbackCatch && payload.callbackCatch();
            });
    },
    import {
        Response as StudentNewRecentReponse
    } from '@/api/homework/student-new-recent';
    import {
        Response as StudentRecentExamReponse
    } from '@/api/homework/student-recent-exam';
    import {
        Response as GetKnowledgeTreeReponse
    } from '@/api/student/get-knowledge-tree';
    import {
        Response as ExamDetailReponse
    } from '@/api/student-exam-paper/exam-detail';
    import {
        Response as StudentListReponse
    } from '@/api/student-exam-paper/student-list';
    import {
        Response as SubmitAnswerReponse
    } from '@/api/student-exam-paper/submit-answer';
    @sparetime2.Action('getStudentNewRecent') getStudentNewRecent!: Function;
    @sparetime2.Action('getStudentRecentExam') getStudentRecentExam!: Function;
    @sparetime2.Action('getGetKnowledgeTree') getGetKnowledgeTree!: Function;
    @sparetime2.Action('getExamDetail') getExamDetail!: Function;
    @sparetime2.Action('getStudentList') getStudentList!: Function;
    @sparetime2.Action('postSubmitAnswer') postSubmitAnswer!: Function;