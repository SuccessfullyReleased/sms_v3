import React, {lazy, LazyExoticComponent, Suspense} from 'react';
import {BrowserRouter, Redirect, Route, RouteProps, Switch} from "react-router-dom";
import {isAuth, isLogin} from "./Check";
import Main from "../components/Main";

const Login = lazy(() => import("../pages/Login"));
const ErrorPage = lazy(() => import("../pages/Error"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Setting = lazy(() => import('../pages/Setting'));
const CourseManage = lazy(() => import('../pages/Manage/CourseManage'));
const StudentManage = lazy(() => import('../pages/Manage/StudentManage'));
const TeacherManage = lazy(() => import('../pages/Manage/TeacherManage'));
const ClazzManage = lazy(() => import('../pages/Manage/ClazzManage'));
const ClazzCourse = lazy(() => import('../pages/Manage/ClazzCourse'));
const StudentCourse = lazy(() => import('../pages/Manage/StudentCourse'));
const TeacherCourse = lazy(() => import('../pages/Manage/TeacherCourse'));
const ChooseCourse = lazy(() => import('../pages/Student/ChooseCourse'));
const ViewScore = lazy(() => import('../pages/Student/ViewScore'));
const CompulsoryScoreManage = lazy(() => import('../pages/Manage/ScoreManage/CompulsoryScore'));
const ElectiveScoreManage = lazy(() => import('../pages/Manage/ScoreManage/ElectiveScore'));
const CompulsoryScoreImport = lazy(() => import('../pages/Teacher/ScoreImport/CompulsoryScore'));
const ElectiveScoreImport = lazy(() => import('../pages/Teacher/ScoreImport/ElectiveScore'));

interface LoginRouteProps extends RouteProps {
	component: React.ComponentClass<any, any>;
}

const LoginRoute: React.FC<LoginRouteProps> = ({component: Component, ...rest}) => {
	return (
		<Route
			{...rest}
			render={props =>
				isLogin() ? <Component {...props} /> : <Redirect to="/login"/>
			}
		/>
	);
};

export class AppRouter extends React.Component {
	render() {
		return (
			<div>
				<BrowserRouter>
					<Suspense fallback={<div/>}>
						<Switch>
							<Route exact path="/" component={Login}/>
							<Route path="/login" component={Login}/>
							<LoginRoute path="/main" component={Main}/>
							<Route path="/error/:code" component={ErrorPage}/>
							<Route component={ErrorPage}/>
						</Switch>
					</Suspense>
				</BrowserRouter>
			</div>
		);
	}
}

interface AuthRouteProps extends RouteProps {
	component: LazyExoticComponent<any>;
	level: number
}

const AuthRoute: React.FC<AuthRouteProps> = ({component: Component, level, ...rest}) => {
	return (
		<Route
			{...rest}
			render={props =>
				isAuth(level) ? <Component {...props} /> : <Redirect to="/error/403"/>
			}
		/>
	);
};

export class MainRouter extends React.Component {
	render() {
		return (
			<div>
				<Suspense fallback={<div/>}>
					<Switch>
						<Redirect exact from='/main' to='/main/dashboard'/>
						<Route exact path="/main/dashboard" component={Dashboard}/>
						<Route exact path="/main/setting" component={Setting}/>
						<AuthRoute exact path="/main/course-manage" component={CourseManage} level={3}/>
						<AuthRoute exact path="/main/student-manage" component={StudentManage} level={3}/>
						<AuthRoute exact path="/main/teacher-manage" component={TeacherManage} level={3}/>
						<AuthRoute exact path="/main/clazz-manage" component={ClazzManage} level={3}/>
						<AuthRoute exact path="/main/clazz-course" component={ClazzCourse} level={3}/>
						<AuthRoute exact path="/main/student-course" component={StudentCourse} level={3}/>
						<AuthRoute exact path="/main/teacher-course" component={TeacherCourse} level={3}/>
						<AuthRoute exact path="/main/choose-course" component={ChooseCourse} level={1}/>
						<AuthRoute exact path="/main/view-score" component={ViewScore} level={1}/>
						<AuthRoute exact path="/main/compulsory-score-course" component={CompulsoryScoreManage} level={3}/>
						<AuthRoute exact path="/main/elective-score-course" component={ElectiveScoreManage} level={3}/>
						<AuthRoute exact path="/main/compulsory-score-import" component={CompulsoryScoreImport} level={2}/>
						<AuthRoute exact path="/main/elective-score-import" component={ElectiveScoreImport} level={2}/>
						<Route component={ErrorPage}/>
					</Switch>
				</Suspense>
			</div>
		);
	}
}