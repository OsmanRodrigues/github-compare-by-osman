import React from 'react'
import { render, screen } from '@testing-library/react'
import { App } from '@app/app'

test('renders github compare', () => {
  render(<App />)
  const linkElement = screen.getByText(/github compare/i)
  expect(linkElement).toBeInTheDocument()
})
