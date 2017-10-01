import React from 'react';
import PropTypes from 'proptypes';
import {connect} from 'react-redux';
import * as courseActions from '../../actions/courseActions';
import {bindActionCreators} from 'redux';
import CourseForm from './CourseForm';
import toastr from 'toastr';

export class ManageCoursePage extends React.Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      course: Object.assign({}, this.props.course),
      saving: false,
      errors: {}
    };

    this.updateCourseState = this.updateCourseState.bind(this);
    this.saveCourseState = this.saveCourseState.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if(this.props.course.id != nextProps.course.id) {
      this.setState({course: Object.assign({}, nextProps.course)});
    }
  }

  validateState() {
    if(this.state.course.title.length < 5) {
      this.setState({ errors: { title: 'Title must be at least 5 characters.'}});
      return false;
    }

    return true;
  }

  saveCourseState(event) {
    event.preventDefault();

    if(this.validateState()) {
      this.setState({saving: true});
      this.props.actions.saveCourse(this.state.course)
        .then(() => { 
          this.setState({saving: false});
          toastr.success('Course Saved');
          this.context.router.push('/courses');
        })
        .catch((error) => {
          this.setState({saving: false});
          toastr.error(error);
        });
    }
  }

  updateCourseState(event) {
    let course = Object.assign({}, this.state.course);
    course[event.target.name] = event.target.value;
    return this.setState({course: course});
  }

  render() {
    return (
      <CourseForm
        allAuthors={this.props.authors}
        course={this.state.course}
        errors={this.state.errors}
        onChange={this.updateCourseState}
        onSave={this.saveCourseState}
        saving={this.state.saving}
      />
    );
  }
}

ManageCoursePage.propTypes = {
  course: PropTypes.object.isRequired,
  authors: PropTypes.array.isRequired,
  actions: PropTypes.object.isRequired
};

ManageCoursePage.contextTypes = {
  router: PropTypes.object
};

function mapStateToProps(state, ownProps) {
  let course = state.courses.find(course => course.id == ownProps.routeParams.id);
  if(!course) {
    course = {id: '', watchHref: '', title: '', authorId: '', length: '', category: ''};
  }

  const authorsFormattedForDropdown = state.authors.map(author => {
    return {
      value: author.id,
      text: author.firstName + ' ' + author.lastName
    };
  });

  return {
    course: course,
    authors: authorsFormattedForDropdown
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(courseActions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(ManageCoursePage);