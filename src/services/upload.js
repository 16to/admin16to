import request from '@/utils/request';

// 删除获取id数据
export async function deleteImg(id) {
  return request(`/api/upload/${id}`, {
    method: 'DELETE',
  });
}
