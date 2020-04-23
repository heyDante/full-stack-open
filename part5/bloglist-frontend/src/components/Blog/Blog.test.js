import React from 'react';
import '@testing-library/jest-dom/extend-expect';
import { render } from '@testing-library/react';
import { prettyDOM } from '@testing-library/dom';

import Blog from './Blog';

test('blog first renders title and author only', () => {
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

	const component = render(<Blog blog={blog} />);

	const blogTitle = component.container.querySelector('.blog-title');
	expect(blogTitle).toHaveTextContent(blog.title);

	const blogAuthor = component.container.querySelector('.blog-author');
	expect(blogAuthor).toHaveTextContent(blog.author);

	const blogDetails = component.container.querySelector('.hidden');
	expect(blogDetails).toHaveClass('hidden');
});