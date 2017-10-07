import * as types from './actionTypes';
import courseApi from '../api/mockCourseApi';
import {beginAjaxCall, ajaxCallError} from './ajaxStatusActions';

export function loadCoursesSuccess(courses) {
    return { type: types.LOAD_COURSES_SUCCESS, courses};
}

export function createCourseSuccess(course) {
    return {type: types.CREATE_COURSE_SUCCESS, course};
}

export function updateCourseSuccess(course) {
    return {type: types.UPDATE_COURSE_SUCCESS, course};
}

export function deleteCourseSuccess(course_id) {
    return {type: types.DELETE_COURSE_SUCCESS, course_id};
}

export function loadCourses() {
    return function(dispatch) {
        dispatch(beginAjaxCall());
        return courseApi.getAllCourses().then(courses => {
            dispatch(loadCoursesSuccess(courses));
        }).catch(error => {
            dispatch(ajaxCallError());
            //throw(error);
        });
    };
}

export function saveCourse(new_course) {
  return function (dispatch) {
    dispatch(beginAjaxCall());
    return courseApi.saveCourse(new_course).then(course => {
        // if there is a course id we are updating
        if(new_course.id) {
            dispatch(updateCourseSuccess(course));
        } else {
            dispatch(createCourseSuccess(course));
        }
    }).catch(error => {
        dispatch(ajaxCallError());
        throw(error);
    });
  };
}

export function deleteCourse(course_id) {
    return function (dispatch) {
        dispatch(beginAjaxCall());
        return courseApi.deleteCourse(course_id).then(() => {
            dispatch(deleteCourseSuccess(course_id));
        }).catch(error => {
            dispatch(ajaxCallError());
            throw(error);
        });
    };
}