import { stringify } from 'qs';
import request from '@/utils/request';

// 获取数据
export async function getList(params) {
  return request(`/api/account?${stringify(params)}`);
}

// 获取日志数据
export async function getLog(params) {
  return request(`/api/account/log?${stringify(params)}`);
}

// 删除日志数据
export async function delLog() {
  return request('/api/account/log', {
    method: 'DELETE',
  });
}

// 获取id数据
export async function getInfo(id) {
  return request(`/api/account/${id}`);
}

// 新增数据
export async function add(data) {
  return request('/api/account', {
    method: 'POST',
    data,
  });
}

// 更新数据
export async function update(id, data) {
  return request(`/api/account/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除获取id数据
export async function del(id) {
  return request(`/api/account/${id}`, {
    method: 'DELETE',
  });
}
