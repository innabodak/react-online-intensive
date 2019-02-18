//Core
import React from 'react';
import Counter from './';
import renderer from 'react-test-renderer';

const rendererTree = renderer.create(<Counter count = { 3 } />).toJSON();

test('counter component should correspont to its shapshot counterpart', () => {
    expect(rendererTree).toMatchSnapshot();
});
