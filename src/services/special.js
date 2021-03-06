import { stringify } from 'qs';
import request from '@/utils/request';

// 获取数据
export async function getList(params) {
  return request(`/api/special?${stringify(params)}`);
}

// 获取id数据
export async function getInfo(id) {
  return request(`/api/special/${id}`);
}

// 新增数据
export async function add(data) {
  return request('/api/special', {
    method: 'POST',
    data,
  });
}

// 更新数据
export async function update(id, data) {
  return request(`/api/special/${id}`, {
    method: 'PUT',
    data,
  });
}

// 删除获取id数据
export async function del(id) {
  return request(`/api/special/${id}`, {
    method: 'DELETE',
  });
}
