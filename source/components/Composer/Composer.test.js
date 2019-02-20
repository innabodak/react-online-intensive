//Core
import React from 'react';
import { mount } from 'enzyme';
import { Composer } from './';

const props = {
    _createPost:          jest.fn(),
    avatar:               'avatar',
    currentUserFirstName: 'Lisa',
};

const comment = 'Be happy!';

const initialState = {
    comment: '',
};

const updatedState = {
    comment,
};

const event = {
    _preventDefault: jest.fn(),
};

const result = mount(<Composer { ...props } />);

const _submitCommentSpy = jest.spyOn(result.instance(), '_submitComment');
const _handleFormSubmitSpy = jest.spyOn(result.instance(), '_handleFormSubmit');
const _submitOnEnterSpy = jest.spyOn(result.instance(), '_submitOnEnter');
const _updateCommentSpy = jest.spyOn(result.instance(), '_updateComment');

describe('composer component:', () => {
    test('should have 1 "section" element', () => {
        expect(result.find('section')).toHaveLength(1);
    });

    test('should have 1 "form" element', () => {
        expect(result.find('form')).toHaveLength(1);
    });

    test('should have 1 "textarea" element', () => {
        expect(result.find('textarea')).toHaveLength(1);
    });

    test('should have 1 "input" element', () => {
        expect(result.find('input')).toHaveLength(1);
    });

    test('should have 1 "img" element', () => {
        expect(result.find('img')).toHaveLength(1);
    });

    test('should have valid initial state', () => {
        expect(result.state()).toEqual(initialState);
    });

    test('teaxarea should be empty initially', () => {
        expect(result.find('textarea').text()).toBe('');
    });

    test('should response to state change properly', () => {
        result.setState({
            comment,
        });
        expect(result.state()).toEqual(updatedState);
        expect(result.find('textarea').text()).toBe(comment);

        result.setState({
            comment: '',
        });

        expect(result.state()).toEqual(initialState);
        expect(result.find('textarea').text()).toBe('');
    });

    test('should handle "textarea" change event', () => {
        result.find('textarea').simulate('change', {
            target: {
                value: comment,
            },
        });
        expect(result.find('textarea').text()).toBe(comment);
        expect(result.state()).toEqual(updatedState);
    });

    test('should handle "form" submit event', () => {
        result.find('form').simulate('submit');
        expect(result.state()).toEqual(initialState);
    });

    test('_createPost prop should be invoked once after form submission', () => {
        expect(props._createPost).toHaveBeenCalledTimes(1);
    });

    test('_submitComment and _handleFormSubmit class methods should be invoked once after form is submitted', () => {
        expect(_submitCommentSpy).toHaveBeenCalledTimes(1);
        expect(_handleFormSubmitSpy).toHaveBeenCalledTimes(1);
    });

    test('currentUserFirstName should be a string', () => {
        expect(typeof result.prop('currentUserFirstName')).toBe('string');
    });

    test('avatar should be a string', () => {
        expect(typeof result.prop('avatar')).toBe('string');
    });

    test('_submitComment class method and e.preventDefault() should be invoked when "Enter" is pressed', () => {
        result
            .find('textarea')
            .simulate('keypress', { key: 'Enter', preventDefault: event._preventDefault });
        expect(_submitOnEnterSpy).toHaveBeenCalledTimes(1);
        expect(event._preventDefault).toHaveBeenCalledTimes(1);
    });

    test('_updateComment class method should be invoked after textarea "onChange" event', () => {
        result.find('textarea').simulate('change');
        expect(_updateCommentSpy).toHaveBeenCalled();
    });
});
