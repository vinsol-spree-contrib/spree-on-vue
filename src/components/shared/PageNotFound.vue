<template>
  <section class="page-not-found">
    <el-row>
      <el-col :span="20" :offset="2" class="text-center offset-vertical">
        <el-row type="flex" justify="center">
          <el-col :span="3" class="tag-cus">
            <span>4</span>
          </el-col>
          <el-col :span="3" class="tag-cus">
            <span>0</span>
          </el-col>
          <el-col :span="3" class="tag-cus">
            <span>4</span>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="24" class="text-center">
            <p>Looks like you're lost.</p>
            <router-link to="/">
              <el-button type="primary text-uppercase">Back to home <i class="el-icon-d-arrow-right"></i> </el-button>
            </router-link>
          </el-col>
        </el-row>  
      </el-col>
    </el-row>
  </section>
</template>

<script>
  export default {
    name: 'page-not-found'
  }
</script>

<style>
  .page-not-found .offset-vertical { padding-top: 75px; padding-bottom: 75px; }
  .page-not-found .tag { font-size: 200px; height: auto; line-height: 242px; display: inline-block; margin: 0 10px; }
  .tag-cus { background: rgba(64,158,255,.1); color: #0E4AA3; border: 1px solid rgba(64,158,255,.2); border-radius: 4px; font-size: 200px; line-height: normal; display: inline-block; margin: 0 7px; position: relative; height: 250px; }
  .tag-cus span { position: absolute; left: 50%; top: 50%; transform: translateX(-50%) translateY(-50%); height: 200px; }
  .page-not-found p { font-size: 30px; margin-top: 40px; }
  .page-not-found .el-button { padding-top: 15px; padding-bottom: 15px; font-size: 18px; }
</style>
