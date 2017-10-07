import React from 'react';
import PropTypes from 'proptypes';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseList from './CourseList';
import {browserHistory, Link, IndexLink} from 'react-router';

class CoursesPage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.redirectToAddCoursePage = this.redirectToAddCoursePage.bind(this);
    this.onDelete = this.onDelete.bind(this);
  }

  onDelete(event) {
    event.preventDefault();

    let course_id = event.target.dataset.id;

    this.props.actions.deleteCourse(course_id);
  }

  redirectToAddCoursePage() {
    this.context.router.push('/course');
  }

  render() {
    return (
      <div>
        <h1>Courses</h1>
        <input type="submit" value="Add Course" className="btn btn-primary" onClick={this.redirectToAddCoursePage} />
        <Link to="/course">Add Course</Link>
        <CourseList courses={this.props.courses} onDelete={this.onDelete} loading={this.props.loading}/>
      </div>
    );
  }
}

CoursesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  courses: PropTypes.array.isRequired,
  loading: PropTypes.object
};

CoursesPage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let courses = [...state.courses];
  courses.sort((course_a, course_b) => course_a.title.localeCompare(course_b.title, 'en', { sensitivity: 'base' } ));

  return {
    courses: courses,
    loading: state.ajaxCallsInProgress > 0
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(CoursesPage);