import expect from 'expect';
import courseReducer from './courseReducer';
import * as actions from '../actions/courseActions';
import * as types from '../actions/actionTypes';

describe('Course Reducer', () => {
    it('should add course when passed CREATE_COURSE_SUCCESS', () => {
        const initialState = [
            {title: 'A'},
            {title: 'B'}
        ];

        const newCourse = {title: 'C'};

        const action = actions.createCourseSuccess(newCourse);

        const expectedAction = {
            type: types.CREATE_COURSE_SUCCESS,
            course: newCourse
        };

        expect(action).toEqual(expectedAction);

        const newState = courseReducer(initialState, action);

        expect(newState.length).toEqual(3);
        expect(newState.pop().title).toEqual('C');
    });

    it('should update a course when pass UPDATE_COURSE_SUCCESS', () => {
        const initialState = [
            {id: 1, title: 'A'},
            {id: 2, title: 'B'}
        ];

        const updateCourse = {id: 1, title: 'C'};

        const action = actions.updateCourseSuccess(updateCourse);

        const newState = courseReducer(initialState, action);

        expect(newState.length).toEqual(2);
        expect(newState.find(course => course.id === 1).title).toEqual('C');
    });
});