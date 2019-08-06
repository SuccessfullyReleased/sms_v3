import React from 'react';
import CourseManageSearch from "../../components/Search/CourseManageSearch";

const CourseManage: React.FC = () => {
	return (
		<div className="container">
			{/*TODO:传props到容器包裹的组件*/}
			<CourseManageSearch></CourseManageSearch>
		</div>
	);
};

export default CourseManage;