import request from '@/utils/request';

// 获取数据
export async function getConfig() {
  return request('/api/sysconfig');
}
