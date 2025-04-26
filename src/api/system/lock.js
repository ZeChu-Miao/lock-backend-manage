import request from "@/utils/request";

// 查询门锁列表
export function getLockLists(query) {
  return request({
    url: "/system/lock/list",
    method: "get",
    params: query,
  });
}

// 查询门锁详细
export function getLockDetail(deptId) {
  return request({
    url: "/system/lock/" + deptId,
    method: "get",
  });
}

// 新增门锁
export function addLock(data) {
  return request({
    url: "/system/lock",
    method: "post",
    data: data,
  });
}

// 修改门锁
export function updateLock(data) {
  return request({
    url: "/system/lock",
    method: "put",
    data: data,
  });
}

// 删除门锁
export function delLock(deptId) {
  return request({
    url: "/system/lock/" + deptId,
    method: "delete",
  });
}

// 上线/下线门锁
export function changeLockStatus(data) {
  return request({
    url: "/system/lock/operate",
    method: "put",
    data
  });
}
