import React, {lazy, Suspense} from 'react';
import {BrowserRouter, Redirect, Route, RouteProps, Switch} from "react-router-dom";
import {isAuth} from "./Check";
import Main from "../components/Main";

const Login = lazy(() => import("../pages/Login"));
const ErrorPage = lazy(() => import("../pages/Error"));
const Dashboard = lazy(() => import("../pages/Dashboard"));
const Setting = lazy(() => import('../pages/Setting'));
const CourseManage = lazy(() => import('../pages/Manage/CourseManage'));
const StudentManage = lazy(() => import('../pages/Manage/StudentManage'));
const TeacherManage = lazy(() => import('../pages/Manage/TeacherManage'));
const TeacherCourse = lazy(() => import('../pages/Manage/TeacherCourse'));

export class AppRouter extends React.Component {

	render() {
		return (
			<div>
				<BrowserRouter>
					<Suspense fallback={<div/>}>
						<Switch>
							<Route exact path="/" component={Login}/>
							<Route path="/login" component={Login}/>
							<AuthRoute path="/main" component={Main}/>
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
	component: React.ComponentClass<any, any>;
}

const AuthRoute: React.FC<AuthRouteProps> = ({component: Component, ...rest}) => {
		return (
			<Route
				{...rest}
				render={props =>
					isAuth() ? <Component {...props} /> : <Redirect to="/login"/>
				}
			/>
		);
	}
;

export class MainRouter extends React.Component {

	render() {
		return (
			<div>
				<Suspense fallback={<div/>}>
					<Switch>
						<Redirect exact from='/main' to='/main/dashboard'/>
						<Route exact path="/main/dashboard" component={Dashboard}/>
						<Route exact path="/main/setting" component={Setting}/>
						<Route exact path="/main/course-manage" component={CourseManage}/>
						<Route exact path="/main/student-manage" component={StudentManage}/>
						<Route exact path="/main/teacher-manage" component={TeacherManage}/>
						<Route exact path="/main/teacher-course" component={TeacherCourse}/>
						<Route component={ErrorPage}/>
					</Switch>
				</Suspense>
			</div>
		);
	}
}