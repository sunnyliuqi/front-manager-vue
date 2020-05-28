import path from '@/api/index'
import {
  axios
} from '@/utils/request'
import parsePageParams from '@/utils/page'
// 分页
export function queryList (data) {
  return axios({
    url: path.process + '/historys/task/historic-task-instances',
    method: 'GET',
    params: { ...data, ...parsePageParams(data) }
  })
}

/**
 * 指派任务给固定的人
 * @param data
 * @returns {AxiosPromise}
 */
export function taskAssign (data) {
  return axios({
    url: path.process + '/tasks/runtime/' + data.id,
    method: 'POST',
    data: { 'action': 'delegate', 'assignee': data.assignee }
  })
}
