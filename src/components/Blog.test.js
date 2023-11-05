import React from 'react'
import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Bloggaaja',
    url: 'localhost',
    likes: 0
  }

  render(<Blog blog={blog} />)

  const element = screen.getByText('Component testing is done with react-testing-library, Bloggaaja')
  expect(element).toBeDefined()
})

test('url. likes and user shows when expanded', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Bloggaaja',
    url: 'www.testingthetest.com',
    likes: 123456,
    user: {
      name: 'T Testaaja',
      username: 'Tee'
    }
  }

  render(
    <Blog blog={blog} user={'Tee'}/>
  )

  const button = screen.getByText('view')
  await userEvent.click(button)

  const url = screen.getByText('www.testingthetest.com')
  expect(url).toBeDefined()

  const likes = screen.getByText('likes 123456')
  expect(likes).toBeDefined()

  const name = screen.getByText('T Testaaja')
  expect(name).toBeDefined()


})

test('clicking the button calls event handler twice', async () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Bloggaaja',
    url: 'www.testingthetest.com',
    likes: 123456,
    user: {
      name: 'T Testaaja',
      username: 'Tee'
    }
  }

  const mockHandler = jest.fn()

  render(
    <Blog blog={blog} addLike={mockHandler} user={'Tee'}/>
  )

  const button1 = screen.getByText('view')
  await userEvent.click(button1)

  const user = userEvent.setup()
  const button = screen.getByText('like')
  await user.click(button)
  await user.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

