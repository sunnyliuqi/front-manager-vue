import path from '@/api/index'
import {
  axios
} from '@/utils/request'
import parsePageParams from '@/utils/page'
// 分页
export function queryList (data) {
  return axios({
    url: path.process + '/definitions/repository/process-definitions',
    method: 'GET',
    data: data,
    params: parsePageParams(data)
  })
}
