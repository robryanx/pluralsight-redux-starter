import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function courseReducer(state = initialState.courses, action) {
    switch(action.type) {
        case types.LOAD_COURSES_SUCCESS:
            return action.courses;
        case types.CREATE_COURSE_SUCCESS: {
            let courses = [];
            for(let course of state) {
                courses.push(course);
            }

            courses.push(action.course);

            return courses;

            // return [
            //     ...state,
            //     Object.assign({}, action.course)
            // ];
        }
        case types.UPDATE_COURSE_SUCCESS: {
            let updated_courses = [];
            for(let course of state) {
                if(course.id !== action.course.id) {
                    updated_courses.push(course);
                } else {
                    updated_courses.push(action.course);
                }
            }

            

            return updated_courses;

            // return [
            //     ...state.filter(course => course.id !== action.course.id),
            //     Object.assign({}, action.course)
            // ];
        } 
        default:
            return state;
    }
}