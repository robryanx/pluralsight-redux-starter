import expect from 'expect';
import { createStore } from 'redux';
import rootReducer from '../reducers';
import initialState from '../reducers/initialState';
import * as courseActions from '../actions/courseActions';

describe('Store', function() {
  it('Should handle creating courses', function() {
    // arrange
    const store = createStore(rootReducer, initialState);
    const courses = [{
      id: 1,
      title: "Clean Code"
    }, {
      id: 2,
      title: "Course 2"
    }];

    courses.forEach((course) => {
      store.dispatch(courseActions.createCourseSuccess(course));
    });

    // assert
    const actual = store.getState().courses;

    expect(actual).toEqual(courses);
  });
});