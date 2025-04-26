import { listDept } from '@/api/system/dept'
import { handleTree } from '@/utils/ruoyi'

const useDeptStore = defineStore(
  'dept',
  {
    state: () => ({
      deptList: [],
      loading: false
    }),
    actions: {
      // 获取部门列表
      getDeptList(query) {
        this.loading = true
        return new Promise((resolve, reject) => {
          listDept(query).then(response => {
            const data = handleTree(response.data, "deptId")
            this.deptList = data
            this.loading = false
            resolve(data)
          }).catch(error => {
            this.loading = false
            reject(error)
          })
        })
      }
    }
  })

export default useDeptStore