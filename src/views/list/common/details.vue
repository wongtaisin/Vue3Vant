<template>
  <el-dialog title="骏亚审核结果" v-model="dialogVisible" width="890px">
    <div class="demo-collapse">
      <el-descriptions :column="1" border>
        <el-descriptions-item label="审核结果" label-class-name="my-label">
          待审核
        </el-descriptions-item>
        <el-descriptions-item label="审核回复">审核回复</el-descriptions-item>
        <el-descriptions-item label="订单价格">
          <p>现价: ￥99</p>
          <p>原价: ￥999</p>
        </el-descriptions-item>
        <el-descriptions-item label="联系客服">联系客服</el-descriptions-item>
      </el-descriptions>

      <el-collapse style="margin-top: 20px" v-model="activeNames">
        <el-collapse-item :name="1" title="基本信息">
          <el-descriptions :column="2" border>
            <el-descriptions-item
              class-name="my-content"
              label="下单时间"
              label-class-name="my-label"
            >
              下单时间
            </el-descriptions-item>
            <el-descriptions-item
              class-name="my-content"
              label="订单编号"
              label-class-name="my-label"
            >
              订单编号
            </el-descriptions-item>
            <el-descriptions-item label="交期">交期</el-descriptions-item>
            <el-descriptions-item label="预估发货时间">预估发货时间</el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>

        <el-collapse-item :name="2" title="订单参数">
          <el-descriptions :column="2" border>
            <el-descriptions-item
              class-name="my-content"
              label="订单编号"
              label-class-name="my-label"
            >
              订单编号
            </el-descriptions-item>
            <el-descriptions-item
              class-name="my-content"
              label="产品类型"
              label-class-name="my-label"
            >
              产品类型
            </el-descriptions-item>
            <el-descriptions-item label="贴装层"> 双 </el-descriptions-item>
            <el-descriptions-item label="PCB板类型"> 软硬结合 </el-descriptions-item>
            <el-descriptions-item label="订单数量"> 订单数量 </el-descriptions-item>
            <el-descriptions-item label="拼板信息"> 拼板信息 </el-descriptions-item>
            <el-descriptions-item label="BOM物料种类"> BOM物料种类 </el-descriptions-item>
            <el-descriptions-item label="单片贴片点数"> 单片贴片点数 </el-descriptions-item>
            <el-descriptions-item label="单片插件点数"> 单片插件点数 </el-descriptions-item>
            <el-descriptions-item label="钢网类型"> 钢网类型 </el-descriptions-item>
            <el-descriptions-item label="包装类型"> 包装类型 </el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>
        <el-collapse-item :name="3" title="订单文件">
          <el-descriptions :column="2" border>
            <el-descriptions-item
              class-name="my-content"
              label="BOM文件"
              label-class-name="my-label"
            >
              <el-text @click="handleDownload(auditDetails.fileList, `BOM清单`)" type="primary">
                {{ viewText(auditDetails.fileList, `BOM清单`) }}
              </el-text>
            </el-descriptions-item>
            <el-descriptions-item
              class-name="my-content"
              label="坐标文件"
              label-class-name="my-label"
            >
              <el-text @click="handleDownload(auditDetails.fileList, `坐标文件`)" type="primary">
                {{ viewText(auditDetails.fileList, `坐标文件`) }}
              </el-text>
            </el-descriptions-item>
            <el-descriptions-item label="gerber文件">
              <el-text @click="handleDownload(auditDetails.fileList, `Gerber文件`)" type="primary">
                {{ viewText(auditDetails.fileList, `Gerber文件`) }}
              </el-text>
            </el-descriptions-item>
            <el-descriptions-item label="钢网文件">
              <el-text @click="handleDownload(auditDetails.fileList, `钢网文件`)" type="primary">
                {{ viewText(auditDetails.fileList, `钢网文件`) }}
              </el-text>
            </el-descriptions-item>
            <el-descriptions-item label="订单合同">合同下载(客户上传合同)</el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>
        <el-collapse-item :name="4" title="订单制造工艺">
          <el-descriptions :column="2" border>
            <el-descriptions-item
              class-name="my-content"
              label="功能测试"
              label-class-name="my-label"
            >
              需要
            </el-descriptions-item>
            <el-descriptions-item
              class-name="my-content"
              label="程序烧录"
              label-class-name="my-label"
            >
              需要
            </el-descriptions-item>
            <el-descriptions-item label="是否组装"> 不需要 </el-descriptions-item>
            <el-descriptions-item label="是否分板"> 需要 </el-descriptions-item>
            <el-descriptions-item label="X-ray单板数"> X-ray单板数 </el-descriptions-item>
            <el-descriptions-item label="X-ray元件数"> X-ray元件数 </el-descriptions-item>
            <el-descriptions-item label="确认样品图"> 需要 </el-descriptions-item>
          </el-descriptions>
        </el-collapse-item>
      </el-collapse>

      <el-descriptions :column="1" style="margin-top: 20px">
        <el-descriptions-item label="价格总计：">
          <span class="css-origin" v-html="diminish('99.999')"></span>
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions :column="2" border style="margin-bottom: 20px">
        <el-descriptions-item class-name="my-content" label="工程费用" label-class-name="my-label">
          工程费用
        </el-descriptions-item>
        <el-descriptions-item class-name="my-content" label="贴片费用" label-class-name="my-label">
          贴片费用
        </el-descriptions-item>
        <el-descriptions-item label="插件费用"> 插件费用 </el-descriptions-item>
        <el-descriptions-item label="特殊工艺费用"> 特殊工艺费用 </el-descriptions-item>
        <el-descriptions-item label="其他"> 其他 </el-descriptions-item>
      </el-descriptions>
    </div>
  </el-dialog>
</template>

<script lang="ts" setup>
import { downloadFile } from '@/api/common'
import { ref } from 'vue'

// 折叠面板激活项
const activeNames = ref([1, 2, 3, 4])

// 弹窗显示控制
const dialogVisible = ref(false)

const auditDetails = ref<any>({})

// 打开详情弹窗
const opens = (order: any) => {
  dialogVisible.value = true
  auditDetails.value = {
    fileList: [
      {
        filetitle: 'BOM清单',
        fileName: 'BOM清单.xlsx'
      }
    ]
  }
}
// 获取文件名称
const viewText = (fileList: any[], title: string): string | undefined => {
  const file = fileList.find(item => item.filetitle === title)
  return file?.fileName
}

// 下载文件
const handleDownload = (fileList: any[], title: string) => {
  const file = fileList.find(item => item.filetitle === title)
  if (file) {
    downloadFile(file)
  }
}

// 格式化价格显示
const diminish = (price: string): string => {
  if (!price) return ''
  const [integer, decimal] = price.split('.')
  return `¥ ${integer}.<span style="font-size: 14px">${decimal}</span>`
}

defineExpose({ dialogVisible, opens })
</script>

<style lang="scss" scoped>
:deep(.my-label) {
  width: 120px;
}

:deep(.my-content) {
  width: 308px;
}

:deep(.el-collapse-item__header) {
  background: #f5f7f9;
  padding: 0 10px;
  font-weight: bold;
  margin-bottom: 20px;
}

.css-origin {
  color: #ff9700;
  font-size: 24px;
  font-weight: bold;
}
</style>
