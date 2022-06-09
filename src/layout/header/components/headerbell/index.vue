<template>
  <a-popover>
    <a-badge :count="count">
      <BellOutlined style="font-size: 16px; padding: 2px" />
    </a-badge>
    <template #content>
      <a-tabs>
        <template v-for="item in listData" :key="item.key">
          <a-tab-pane>
            <template #tab>
              {{ item.name }}
              <span v-if="item.list.length !== 0">({{ item.list.length }})</span>
            </template>
            <!-- 绑定title-click事件的通知列表中标题是“可点击”的-->
            <Notice :list="item.list" v-if="item.key === '1'" @title-click="onNoticeClick" />
            <Notice :list="item.list" v-else />
          </a-tab-pane>
        </template>
      </a-tabs>
    </template>
  </a-popover>
</template>
<script setup>
  import { ref, computed, onMounted, reactive, watchEffect, onBeforeUnmount } from 'vue'
  import Notice from './Notice.vue'
  import { notification } from 'ant-design-vue'
  import { BellOutlined } from '@ant-design/icons-vue'
  import { success } from '../../../../utils/NotificationUtils'
  import { useWebSocket } from '@vueuse/core'
  const listData = ref([])
  const state = reactive({
    server: `${import.meta.env.VITE_BASE_SOCKET_NSP}${
      import.meta.env.VITE_BASE_SOCKET_PATH
    }/${sessionStorage.getItem('userCode')}`,
    sendValue: '',
  })
  onMounted(() => {
    getNotice()
  })
  onBeforeUnmount(() => {
    console.log('卸载')
    close()
  })
  const { status, data, close } = useWebSocket(state.server, {
    autoReconnect: false,
    heartbeat: true,
  })
  watchEffect(() => {
    if (data.value) {
      try {
        console.log(data.value)
        let res = data.value
        if (res.indexOf('{') > -1) {
          res = JSON.parse(res)
          console.log('socket收到', res)
          openNotification(res.xiaoxifenlei, res.xiaoxineirong)
          setTimeout(() => {
            getNotice()
          }, 500)
        }
      } catch (error) {
        console.log(error)
      }
    }
  })
  const openNotification = (e, val) => {
    notification.open({
      message: e,
      description: val,
      onClick: () => {},
    })
  }
  function getNotice() {
    let data = [
      {
        key: '1',
        name: '通知',
        list: [
          {
            id: '000000001',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
            title: '你收到了 14 份新周报',
            description: '',
            datetime: '2017-08-09',
            type: '1',
          },
          {
            id: '000000002',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
            title: '你推荐的 曲妮妮 已通过第三轮面试',
            description: '',
            datetime: '2017-08-08',
            type: '1',
          },
          {
            id: '000000003',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
            title: '这种模板可以区分多种通知类型',
            description: '',
            datetime: '2017-08-07',
            // read: true,
            type: '1',
          },
          {
            id: '000000004',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
            title: '左侧图标用于区分不同的类型',
            description: '',
            datetime: '2017-08-07',
            type: '1',
          },
          {
            id: '000000005',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
            title:
              '标题可以设置自动显示省略号，本例中标题行数已设为1行，如果内容超过1行将自动截断并支持tooltip显示完整标题。',
            description: '',
            datetime: '2017-08-07',
            type: '1',
          },
          {
            id: '000000006',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
            title: '左侧图标用于区分不同的类型',
            description: '',
            datetime: '2017-08-07',
            type: '1',
          },
          {
            id: '000000007',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
            title: '左侧图标用于区分不同的类型',
            description: '',
            datetime: '2017-08-07',
            type: '1',
          },
          {
            id: '000000008',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
            title: '左侧图标用于区分不同的类型',
            description: '',
            datetime: '2017-08-07',
            type: '1',
          },
          {
            id: '000000009',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
            title: '左侧图标用于区分不同的类型',
            description: '',
            datetime: '2017-08-07',
            type: '1',
          },
          {
            id: '000000010',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
            title: '左侧图标用于区分不同的类型',
            description: '',
            datetime: '2017-08-07',
            type: '1',
          },
        ],
      },
      {
        key: '2',
        name: '消息',
        list: [
          {
            id: '000000006',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
            title: '曲丽丽 评论了你',
            description: '描述信息描述信息描述信息',
            datetime: '2017-08-07',
            type: '2',
            clickClose: true,
          },
          {
            id: '000000007',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
            title: '朱偏右 回复了你',
            description: '这种模板用于提醒谁与你发生了互动',
            datetime: '2017-08-07',
            type: '2',
            clickClose: true,
          },
          {
            id: '000000008',
            avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
            title: '标题',
            description:
              '请将鼠标移动到此处，以便测试超长的消息在此处将如何处理。本例中设置的描述最大行数为2，超过2行的描述内容将被省略并且可以通过tooltip查看完整内容',
            datetime: '2017-08-07',
            type: '2',
            clickClose: true,
          },
        ],
      },
      {
        key: '3',
        name: '待办',
        list: [
          {
            id: '000000009',
            avatar: '',
            title: '任务名称',
            description: '任务需要在 2017-01-12 20:00 前启动',
            datetime: '',
            extra: '未开始',
            color: '',
            type: '3',
          },
          {
            id: '000000010',
            avatar: '',
            title: '第三方紧急代码变更',
            description: '冠霖 需在 2017-01-07 前完成代码变更任务',
            datetime: '',
            extra: '马上到期',
            color: 'red',
            type: '3',
          },
          {
            id: '000000011',
            avatar: '',
            title: '信息安全考试',
            description: '指派竹尔于 2017-01-09 前完成更新并发布',
            datetime: '',
            extra: '已耗时 8 天',
            color: 'gold',
            type: '3',
          },
          {
            id: '000000012',
            avatar: '',
            title: 'ABCD 版本发布',
            description: '指派竹尔于 2017-01-09 前完成更新并发布',
            datetime: '',
            extra: '进行中',
            color: 'blue',
            type: '3',
          },
        ],
      },
    ]
    listData.value = data
  }
  const count = computed(() => {
    let count = 0
    for (let i = 0; i < listData.value.length; i++) {
      count += listData.value[i].list.length
    }
    return count
  })
  function onNoticeClick(record) {
    success('处理成功')
    // 可以直接将其标记为已读（为标题添加删除线）,此处演示的代码会切换删除线状态
    record.titleDelete = !record.titleDelete
  }
</script>
