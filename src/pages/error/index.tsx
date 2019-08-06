import React from 'react';
import Error from '../../components/Error'
import {RouteComponentProps} from 'react-router';

interface ErrorPageProps extends RouteComponentProps<{
	code?: string,
	tips?: string
}> {
}

const ErrorPage: React.FC<ErrorPageProps> = (props) => {

	const {match} = props;
	const code = match.params.code;

	return (!code || code === '404') ? <Error/> : <Error code="403" tips="啊哦~ 你没有权限访问该页面哦"/>
};

export default ErrorPage;