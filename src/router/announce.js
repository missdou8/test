import Announcement from '../views/announcement/Announcement.vue'
import MailDetail from '../views/announcement/MailDetail.vue'
import NoticeDetail from '../views/announcement/NoticeDetail.vue'

const ANNOUNCE_ROUTES = [
  {
    path: '/announce/index',
    component: Announcement,
    meta: {
      title: '公告/活动'
    }
  },
  {
    path: '/announce/detail/mail',
    component: MailDetail,
    meta: {
      title: '邮件详情'
    }
  },
  {
    path: '/announce/detail/notice',
    component: NoticeDetail,
    meta: {
      title: '公告详情'
    }
  }
]

export default ANNOUNCE_ROUTES
