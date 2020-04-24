import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

import BlogForm from './BlogForm';

test('BlogForm component calls the event handler it received as props with the right details', () => {

	const addBlog = jest.fn();

	const component = render(<BlogForm addBlog={addBlog} />);

	const button = component.container.querySelector('button');
	fireEvent.click(button);

	const titleInput = component.container.querySelector('#title');
	fireEvent.change(titleInput, {
		target: { value: 'Blog form testing' }
	});

	const authorInput = component.container.querySelector('#author');
	fireEvent.change(authorInput, {
		target: { value: 'Jest' }
	});

	const urlInput = component.container.querySelector('#url');
	fireEvent.change(urlInput, {
		target: { value: 'https://jestdom.com' }
	});

	const form = component.container.querySelector('form');

	fireEvent.submit(form);

	expect(addBlog.mock.calls).toHaveLength(1);
	expect(addBlog.mock.calls[0][0].title).toBe('Blog form testing');
	expect(addBlog.mock.calls[0][0].author).toBe('Jest');
	expect(addBlog.mock.calls[0][0].url).toBe('https://jestdom.com');

});