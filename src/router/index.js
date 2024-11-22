import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth'
import DashboardLayout from '../layouts/DashboardLayout.vue'
import StudentLayout from '../layouts/StudentLayout.vue'
import TeacherLayout from '../layouts/TeacherLayout.vue'

// Public Pages
import Home from '../views/Home.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import About from '../views/About.vue'
import Help from '../views/Help.vue'
import Packages from '../views/Packages.vue'
import CourseDetails from '../views/CourseDetails.vue'

// Admin Pages
import AdminDashboard from '../views/admin/Dashboard.vue'
import AdminUsers from '../views/admin/Users.vue'
import AdminRevenue from '../views/admin/Revenue.vue'
import AdminSettings from '../views/admin/Settings.vue'

// Institution Pages
import InstitutionDashboard from '../views/institution/Dashboard.vue'
import InstitutionTeachers from '../views/institution/Teachers.vue'
import InstitutionStudents from '../views/institution/Students.vue'
import InstitutionSettings from '../views/institution/Settings.vue'

// Teacher Pages
import TeacherDashboard from '../views/teacher/Dashboard.vue'
import TeacherPackages from '../views/teacher/Packages.vue'
import TeacherSessions from '../views/teacher/Sessions.vue'
import TeacherRevenue from '../views/teacher/Revenue.vue'
import TeacherNotifications from '../views/teacher/TeacherNotifications.vue'
import TeacherProfile from '../views/teacher/TeacherProfile.vue'

// Student Pages
import StudentDashboard from '../views/student/Dashboard.vue'
import StudentLearn from '../views/student/Learn.vue'
import StudentLiveSession from '../views/student/LiveSession.vue'
import StudentRecordedSession from '../views/student/RecordedSession.vue'
import StudentWallet from '../views/student/Wallet.vue'
import StudentNotifications from '../views/student/Notifications.vue'
import StudentProfile from '../views/student/Profile.vue'
import StudentCourses from '../views/student/Courses.vue'

const routes = [
  {
    path: '/',
    component: Home,
    meta: { requiresAuth: false }
  },
  {
    path: '/login',
    component: Login,
    meta: { requiresAuth: false }
  },
  {
    path: '/register',
    component: Register,
    meta: { requiresAuth: false }
  },
  {
    path: '/about',
    component: About,
    meta: { requiresAuth: false }
  },
  {
    path: '/help',
    component: Help,
    meta: { requiresAuth: false }
  },
  {
    path: '/packages',
    component: Packages,
    meta: { requiresAuth: false }
  },
  {
    path: '/course/:id',
    component: CourseDetails,
    meta: { requiresAuth: false }
  },
  // Admin Routes
  {
    path: '/admin',
    component: DashboardLayout,
    meta: { requiresAuth: true, role: 'ADMIN' },
    children: [
      { path: '', component: AdminDashboard },
      { path: 'users', component: AdminUsers },
      { path: 'revenue', component: AdminRevenue },
      { path: 'settings', component: AdminSettings }
    ]
  },
  // Institution Routes
  {
    path: '/institution',
    component: DashboardLayout,
    meta: { requiresAuth: true, role: 'INSTITUTION' },
    children: [
      { path: '', component: InstitutionDashboard },
      { path: 'teachers', component: InstitutionTeachers },
      { path: 'students', component: InstitutionStudents },
      { path: 'settings', component: InstitutionSettings }
    ]
  },
  // Teacher Routes
  {
    path: '/teacher',
    component: TeacherLayout,
    meta: { requiresAuth: true, role: 'TEACHER' },
    children: [
      { path: '', component: TeacherDashboard },
      { path: 'packages', component: TeacherPackages },
      { path: 'sessions', component: TeacherSessions },
      { path: 'revenue', component: TeacherRevenue },
      { path: 'notifications', component: TeacherNotifications },
      { path: 'profile', component: TeacherProfile }
    ]
  },
  // Student Routes
  {
    path: '/student',
    component: StudentLayout,
    meta: { requiresAuth: true, role: 'STUDENT' },
    children: [
      { path: '', component: StudentDashboard },
      { path: 'learn', component: StudentLearn },
      { path: 'learn/live/:id', component: StudentLiveSession },
      { path: 'learn/recorded/:id', component: StudentRecordedSession },
      { path: 'courses', component: StudentCourses },
      { path: 'wallet', component: StudentWallet },
      { path: 'notifications', component: StudentNotifications },
      { path: 'profile', component: StudentProfile }
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior: () => ({ top: 0 })
})

router.beforeEach((to, from, next) => {
  const authStore = useAuthStore()
  const requiresAuth = to.matched.some(record => record.meta.requiresAuth)
  const requiredRole = to.matched.find(record => record.meta.role)?.meta.role

  if (requiresAuth && !authStore.isAuthenticated) {
    next('/login')
  } else if (requiredRole && authStore.userRole !== requiredRole) {
    next('/')
  } else {
    next()
  }
})

export default router