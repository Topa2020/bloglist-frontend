import React from 'react'
import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'

test('blogform inputs are passsed to  handler correctly', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const inputTitle = container.querySelector('#title-input')
  const inputAuthor = container.querySelector('#author-input')
  const inputUrl = container.querySelector('#url-input')
  const sendButton = screen.getByText('save')

  await user.type(inputTitle, 'testing a form: title')
  await user.type(inputAuthor, 'testing a form: author')
  await user.type(inputUrl, 'testing a form: url')
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing a form: title')
  expect(createBlog.mock.calls[0][0].author).toBe('testing a form: author')
  expect(createBlog.mock.calls[0][0].url).toBe('testing a form: url')
})