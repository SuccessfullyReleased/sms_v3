/*
 * @class Menu
 * @description 菜单栏
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:03
 **/
export interface Menu {
	/*
 * @var 标题前的图标
 * @author 戴俊明 <idaijunming@163.com>
 * @date 2019/8/10 23:05
 **/
	icon?: string,
	/*
	 * @var URL地址
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:03
	 **/
	path: string,
	/*
	 * @var 显示的标题
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:03
	 **/
	title: string,
	/*
	 * @var 子菜单
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/10 23:05
	 **/
	subs?: Array<Menu>,
	/*
	 * @var 角色等级
	 * @author 戴俊明 <idaijunming@163.com>
	 * @date 2019/8/19 14:52
	 **/
	levels: number[]
}

const Menus: Array<Menu> = [{
	icon: 'icon-user',
	path: '/main/dashboard',
	title: 'Dashboard',
	levels: []
}, {
	icon: 'icon-setting',
	path: '/main/setting',
	title: 'Setting',
	levels: []
}, {
	icon: 'icon-student',
	path: '/main/student-manage',
	title: 'StudentList',
	levels: [3]
}, {
	icon: 'icon-teacher',
	path: '/main/teacher-manage',
	title: 'TeacherList',
	levels: [3]
}, {
	icon: 'icon-class',
	path: '/main/clazz-manage',
	title: 'ClassList',
	levels: [3]
}, {
	icon: 'icon-course',
	path: '',
	title: 'CourseManage',
	subs: [{
		path: '/main/course-manage',
		title: 'CourseList',
		levels: [3]
	}, {
		path: '/main/teacher-course',
		title: 'TeacherCourse',
		levels: [3]
	}, {
		path: '/main/clazz-course',
		title: 'ClassCourse',
		levels: [3]
	}, {
		path: '/main/student-course',
		title: 'StudentCourse',
		levels: [3]
	}],
	levels: [3]
}, {
	icon: 'icon-choose',
	path: '/main/choose-course',
	title: 'ChooseCourse',
	levels: [1]
}, {
	icon: 'icon-choose',
	path: '/main/view-score',
	title: 'ViewScore',
	levels: [1]
}, {
	icon: 'icon-write',
	path: '',
	title: 'ScoreImport',
	subs: [{
		path: '/main/compulsory-score-course',
		title: 'CompulsoryScoreManage',
		levels: [3]
	}, {
		path: '/main/elective-score-course',
		title: 'ElectiveScoreManage',
		levels: [3]
	}, {
		path: '/main/compulsory-score-import',
		title: 'CompulsoryScoreImport',
		levels: [2]
	}, {
		path: '/main/elective-score-import',
		title: 'ElectiveScoreImport',
		levels: [2]
	}],
	levels: [2, 3]
}];

export default Menus