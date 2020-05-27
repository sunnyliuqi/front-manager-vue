import path from '@/api/index'
import {
  axios
} from '@/utils/request'
import parsePageParams from '@/utils/page'
// 分页
export function queryList (data) {
  return axios({
    url: path.process + '/historys/instance/historic-process-instances',
    method: 'GET',
    params: { ...data, ...parsePageParams(data) }
  })
}

/**
 * 终止流程
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteProcessInstance (data) {
  return axios({
    url: path.process + '/instances/runtime/process-instances/' + data.id,
    method: 'DELETE',
    params: { 'deleteReason': data.deleteReason }
  })
}