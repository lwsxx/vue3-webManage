<template>
  <a-list :pagination="false">
    <template v-for="item in getData" :key="item.id">
      <a-list-item>
        <a-list-item-meta>
          <template #title>
            <div class="title">
              <a-typography-paragraph
                @click="handleTitleClick(item)"
                style="margin-bottom: 0 !important"
                :style="{
                  cursor: isTitleClickable ? 'pointer' : '',
                  width: item.type === '3' ? '50%' : '100%',
                }"
                :delete="!!item.titleDelete"
                :ellipsis="
                  $props.titleRows && $props.titleRows > 0
                    ? { rows: $props.titleRows, tooltip: !!item.title }
                    : false
                "
                :content="item.title"
              />
              <div class="extra" v-if="item.extra">
                <a-tag class="tag" :color="item.color">
                  {{ item.extra }}
                </a-tag>
              </div>
            </div>
          </template>
          <template #avatar>
            <a-avatar v-if="item.avatar" class="avatar" :src="item.avatar" />
            <span v-else> {{ item.avatar }}</span>
          </template>
          <template #description>
            <div>
              <div class="description" v-if="item.description">
                <a-typography-paragraph
                  style="width: 100%; margin-bottom: 0 !important"
                  :ellipsis="
                    $props.descRows && $props.descRows > 0
                      ? { rows: $props.descRows, tooltip: !!item.description }
                      : false
                  "
                  :content="item.description"
                />
              </div>
              <div class="datetime">
                {{ item.datetime }}
              </div>
            </div>
          </template>
        </a-list-item-meta>
      </a-list-item>
    </template>
    <template #footer>
      <div style="text-align: center">
        <a @click="more">查看更多</a>
      </div>
    </template>
  </a-list>
</template>

<script>
  import { computed, defineComponent, ref, watch, unref } from 'vue'
  import isNumber from 'lodash-es/isNumber'
  import { useRouter } from 'vue-router'

  export default defineComponent({
    name: 'Notice',
    props: {
      list: {
        type: Array,
        default: () => [],
      },
      pageSize: {
        type: [Boolean, Number],
        default: 5,
      },
      currentPage: {
        type: Number,
        default: 1,
      },
      titleRows: {
        type: Number,
        default: 1,
      },
      descRows: {
        type: Number,
        default: 2,
      },
      onTitleClick: {
        type: Function,
      },
    },
    setup(props, { emit }) {
      const router = useRouter()
      const current = ref(props.currentPage || 1)
      const getPagination = computed(() => {
        const { list, pageSize } = props
        if (pageSize > 0 && list && list.length > pageSize) {
          return {
            total: list.length,
            pageSize,
            current: unref(current),
            onChange(page) {
              current.value = page
              emit('update:currentPage', page)
            },
          }
        } else {
          return false
        }
      })
      watch(
        () => props.currentPage,
        (v) => {
          current.value = v
        },
      )
      const getData = computed(() => {
        const { pageSize, list } = props
        if (pageSize === false) return []
        let size = isNumber(pageSize) ? pageSize : 5
        return list.slice(size * (unref(current) - 1), size * unref(current))
      })
      function handleTitleClick(item) {
        props.onTitleClick && props.onTitleClick(item)
      }
      function more() {
        router.push({ name: '/admin/xiaoxiList' })
      }
      const isTitleClickable = computed(() => !!props.onTitleClick)
      return {
        getPagination,
        getData,
        handleTitleClick,
        isTitleClickable,
        more,
      }
    },
  })
</script>

<style scoped lang="less">
  .title {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .ant-list-split .ant-list-item:last-child {
    border-bottom: 1px solid #f0f0f0;
  }
</style>
