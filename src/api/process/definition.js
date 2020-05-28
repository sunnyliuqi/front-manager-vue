import path from '@/api/index'
import {
  axios, axiosFile
} from '@/utils/request'
import parsePageParams from '@/utils/page'
import { createImgNode } from '@/utils/common'
// 分页
export function queryList (data) {
  return axios({
    url: path.process + '/definitions/repository/process-definitions',
    method: 'GET',
    params: { ...data, ...parsePageParams(data), 'order': 'desc', 'sort': 'deploymentId' }
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
    headers: { 'Accept': '*/*' },
    method: 'GET',
    fileName: `${id}.xml`
  })
}

/**
 * 查看流程定义图片
 * @param id
 * @returns {*}
 */
export function getProcessDefinitionImage (id) {
  return axiosFile({
    url: path.process + '/repository/process-definitions/' + id + '/image',
    headers: { 'Accept': '*/*' },
    method: 'GET',
    fileName: `${id}.png`,
    handleCallBack: createImgNode
  })
}
