
    import {
        metaProvider as teachingPlanCountProvider,
        Params as TeachingPlanCountParams,
        Response as TeachingPlanCountReponse
    } from '@/api/teacher/rob-class/teaching-plan-count';
    export function getTeachingPlanCount(payload: CallbackPayloadData<TeachingPlanCountParams, TeachingPlanCountReponse>) {
        fetchApi(teachingPlanCountProvider, payload.data)
            .then(data => {
                payload.callback && payload.callback(data);
            })
            .catch(e => {
                payload.callbackCatch && payload.callbackCatch();
            });
    }