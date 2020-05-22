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
    data: data,
    params: parsePageParams(data)
  })
}
