export interface Menu {
	index: string,
	title: string,
	icon?: string,
	subs?: Array<Menu>
}

const Menus: Array<Menu> = [{
	icon: 'icon-user',
	index: '/main/dashboard',
	title: 'Dashboard'
}, {
	icon: 'icon-setting',
	index: '/main/setting',
	title: 'Setting'
}, {
	icon: 'icon-course',
	index: '/main/course-manage',
	title: 'CourseManage'
}, {
	icon: 'icon-student',
	index: '/main/student-manage',
	title: 'StudentManage'
}, {
	icon: 'icon-teacher',
	index: '/main/teacher-manage',
	title: 'TeacherManage'
}];

export default Menus