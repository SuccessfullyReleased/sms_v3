/*
 * @class Menu
 * @description 菜单栏
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:03
 **/
export interface Menu {
	/*
	 * @var key唯一标识（使用URL地址）
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:03
	 **/
	index: string,
	/*
	 * @var 显示的标题
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:03
	 **/
	title: string,
	/*
	 * @var 标题前的图标
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:05
	 **/
	icon?: string,
	/*
	 * @var 子菜单
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:05
	 **/
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
}, {
	icon: 'icon-course',
	index: '/main/teacher-course',
	title: 'TeacherCourse'
}];

export default Menus