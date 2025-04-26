<template>
  <div class="app-container home">
    <el-row :gutter="20">
      <el-col :sm="24" :lg="12" style="padding-left: 20px">
        <h2>智能门锁管理系统</h2>
        <p>
          专业的智能门锁管理平台，为企业、社区、酒店等场所提供全方位的门禁管理解决方案。系统支持多种门锁设备接入，实现远程开关锁、权限管理、使用记录查询等功能。通过简洁直观的操作界面，帮助管理员高效管理各类门锁设备，提升安全管理水平。
        </p>
        <p>
          <b>当前版本:</b> <span>v{{ version }}</span>
        </p>
        <p>
          <el-tag type="success">安全可靠</el-tag>
          <el-tag type="primary" style="margin-left: 10px">高效便捷</el-tag>
          <el-tag type="warning" style="margin-left: 10px">智能管理</el-tag>
        </p>
      </el-col>

      <el-col :sm="24" :lg="12" style="padding-left: 50px">
        <el-row>
          <el-col :span="12">
            <h2>系统特点</h2>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="6">
            <h4>核心功能</h4>
            <ul>
              <li>设备管理</li>
              <li>权限控制</li>
              <li>远程操作</li>
              <li>告警监控</li>
              <li>数据统计</li>
            </ul>
          </el-col>
          <el-col :span="6">
            <h4>技术支持</h4>
            <ul>
              <li>多协议接入</li>
              <li>实时监控</li>
              <li>云端存储</li>
              <li>API接口</li>
              <li>定制开发</li>
            </ul>
          </el-col>
        </el-row>
      </el-col>
    </el-row>
    <el-divider />
    <el-row :gutter="20">
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <el-card class="feature-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>设备管理</span>
            </div>
          </template>
          <div class="body">
            <el-image src="@/assets/images/device.png" fit="contain" style="width: 100%; height: 160px;"></el-image>
            <p>支持多种智能门锁设备的接入管理，包括指纹锁、密码锁、卡片锁、蓝牙锁等。提供设备注册、分组、状态监控、固件升级等功能。</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <el-card class="feature-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>权限管理</span>
            </div>
          </template>
          <div class="body">
            <el-image src="@/assets/images/permission.png" fit="contain" style="width: 100%; height: 160px;"></el-image>
            <p>灵活的权限分配系统，可按部门、角色、人员设置不同的门锁使用权限。支持临时授权、定时授权、紧急授权等多种授权方式。</p>
          </div>
        </el-card>
      </el-col>
      <el-col :xs="24" :sm="24" :md="8" :lg="8">
        <el-card class="feature-card">
          <template v-slot:header>
            <div class="clearfix">
              <span>数据分析</span>
            </div>
          </template>
          <div class="body">
            <el-image src="@/assets/images/analysis.png" fit="contain" style="width: 100%; height: 160px;"></el-image>
            <p>提供直观的数据统计和分析功能，包括使用频率、异常记录、电量状态等。支持自定义报表导出，帮助管理者做出更明智的决策。</p>
          </div>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup name="Index">
const version = ref('1.0.0')

function goTarget(url) {
  window.open(url, '__blank')
}
</script>

<style scoped lang="scss">
.home {
  blockquote {
    padding: 10px 20px;
    margin: 0 0 20px;
    font-size: 17.5px;
    border-left: 5px solid #eee;
  }
  hr {
    margin-top: 20px;
    margin-bottom: 20px;
    border: 0;
    border-top: 1px solid #eee;
  }
  .col-item {
    margin-bottom: 20px;
  }

  ul {
    padding: 0;
    margin: 0;
  }

  font-family: "open sans", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  color: #676a6c;
  overflow-x: hidden;

  ul {
    list-style-type: none;
  }

  h4 {
    margin-top: 0px;
  }

  h2 {
    margin-top: 10px;
    font-size: 26px;
    font-weight: 100;
  }

  p {
    margin-top: 10px;
    line-height: 1.6;
    font-size: 14px;

    b {
      font-weight: 700;
    }
  }

  .feature-card {
    margin-bottom: 20px;
    height: 100%;
    
    .el-card__header {
      background-color: #f5f7fa;
      font-weight: bold;
    }
    
    .body {
      padding: 10px 0;
      
      p {
        text-align: justify;
        margin-top: 15px;
      }
    }
  }
}
</style>