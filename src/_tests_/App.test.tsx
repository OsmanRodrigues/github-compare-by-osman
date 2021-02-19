import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '@app/App'

test('renders github compare', () => {
  render(<App />)
  const linkElement = screen.getByText(/github compare/i)
  expect(linkElement).toBeInTheDocument()
})
