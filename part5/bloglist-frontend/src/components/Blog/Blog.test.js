import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render, fireEvent } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

import Blog from './Blog';

describe('blog', () => {
	let component;

	const blog = {
		author: "Jeffrey",
		id: "5e5a96097e6dfe175992d284",
		likes: 0,
		title: "Fantstic Evil's Thread",
		url: "https://nothing.com",
		user: {
			name: "Mark Evans",
			username: "markevans"
		}
	};

	const mockHandler = jest.fn();

	beforeEach(() => {
		component = render(<Blog blog={blog} handleLike={mockHandler}/>)
	});

	test('first renders title and author only', () => {
		const blogTitle = component.container.querySelector('.blog-title');
		expect(blogTitle).toHaveTextContent(blog.title);
	
		const blogAuthor = component.container.querySelector('.blog-author');
		expect(blogAuthor).toHaveTextContent(blog.author);
	
		const blogDetails = component.container.querySelector('.hidden');
		expect(blogDetails).toHaveClass('hidden');
	});

	test('will show url and likes when the view button is clicked', () => {
		const button = component.container.querySelector('button');
		fireEvent.click(button);

		const blogLikes = component.container.querySelector('.blog-details .blog-likes');
		expect(blogLikes).toHaveTextContent(`${blog.likes} likes`);

		const blogUsername = component.container.querySelector('.blog-details .blog-username');
		expect(blogUsername).toHaveTextContent(blog.user.name);
	});

	test('does has its like button clicked twice', () => {
		const likeButton = component.container.querySelector('.blog-likes button');
		fireEvent.click(likeButton);
		fireEvent.click(likeButton);
		expect(mockHandler.mock.calls).toHaveLength(2);
	});
});

