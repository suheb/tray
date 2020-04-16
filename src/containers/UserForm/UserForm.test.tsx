import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import UserForm from './UserForm';

describe("UserForm", () => {
  it("renders without crashing", () => {
    const handleSubmit = jest.fn();
    const { asFragment } = render(<UserForm handleSubmit={handleSubmit} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("does not submit if there are errors", () => {
    const handleSubmit = jest.fn();
    const { getByText } = render(<UserForm handleSubmit={handleSubmit} />);
    userEvent.click(getByText(/submit/i));
    expect(handleSubmit).not.toBeCalled()
  });

  it("does submits with correct values", async () => {
    const handleSubmit = jest.fn();
    const formData = {
      name: 'John Smith',
      role: 'Analyst',
      email: 'abc@gmail.com',
      password: '1Abcdefdag'
    }
    const { getByText, getByLabelText } = render(<UserForm handleSubmit={handleSubmit} />);
    await userEvent.type(getByLabelText(/name/i), "John Smith")
    await userEvent.type(getByLabelText(/role/i), "Analyst")
    await userEvent.type(getByLabelText(/email/i), "abc@gmail.com")
    await userEvent.type(getByLabelText(/password/i), "1Abcdefdag")

    userEvent.click(getByText(/submit/i));
    expect(handleSubmit).toBeCalledWith("user", formData)
  });
});
