import path from '@/api/index'
import {
  axios, axiosFile
} from '@/utils/request'
import parsePageParams from '@/utils/page'
// 分页
export function queryList (data) {
  return axios({
    url: path.process + '/definitions/repository/process-definitions',
    method: 'GET',
    params: { ...data, ...parsePageParams(data) }
  })
}

/**
 * 流程定义-修改
 * @param data
 * @returns {AxiosPromise}
 */
export function executeProcessDefinitionAction (data) {
  return axios({
    url: path.process + '/repository/process-definitions/' + data.id,
    method: 'PUT',
    data: data
  })
}

/**
 * 根据部署id删除相关流程信息
 * @param data
 * @returns {AxiosPromise}
 */
export function deleteDeployment (id) {
  return axios({
    url: path.process + '/definitions/repository/' + id,
    method: 'DELETE',
    params: { 'cascade': false }
  })
}

/**
 * 获取流程定义文件
 * @param id
 * @returns {AxiosPromise}
 */
export function getProcessDefinitionResource (id) {
  return axiosFile({
    url: path.process + '/repository/process-definitions/' + id + '/resourcedata',
    headers: { 'Accept': '*/*', 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    method: 'GET',
    fileName: `${id}.xml`
  })
}
