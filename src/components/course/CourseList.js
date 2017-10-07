import React from 'react';
import PropTypes from 'proptypes';
import CourseListRow from './CourseListRow';
import { LoadingDots } from '../common/LoadingDots';

const CourseList = (props) => {
  return (
    <table className="table">
      <thead>
      <tr>
        <th>&nbsp;</th>
        <th>Title</th>
        <th>Author</th>
        <th>Category</th>
        <th>Length</th>
        <th>Action</th>
      </tr>
      </thead>
      <tbody>
      {props.courses.length == 0 && props.loading &&
        <tr>
          <td colSpan="5">Loading<LoadingDots dots={20} interval={100} /></td>
        </tr>
      }
      {props.courses.length == 0 && !props.loading &&
        <tr>
          <td colSpan="5">No Courses</td>
        </tr>
      }
      {props.courses.map(course =>
        <CourseListRow key={course.id} course={course} onDelete={props.onDelete}/>
      )}
      </tbody>
    </table>
  );
};

CourseList.propTypes = {
  courses: PropTypes.array.isRequired,
  onDelete: PropTypes.func.isRequired,
  loading: PropTypes.bool
};

export default CourseList;