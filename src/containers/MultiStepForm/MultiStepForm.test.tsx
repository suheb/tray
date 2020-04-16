import React from 'react';
import { render } from '@testing-library/react';

import MultiStepForm from './MultiStepForm';
import userEvent from '@testing-library/user-event';

describe("MultiStepForm", () => {
  it("renders without crashing", () => {
    const { asFragment } = render(<MultiStepForm />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("renders the first page by default", () => {
    const { getByText, getByLabelText } = render(<MultiStepForm />);
    expect(getByText(/user/i)).not.toBeDisabled();
    expect(getByLabelText(/name/i)).toBeInTheDocument();
  });

  it("renders the second page by successful submit of first page", async () => {
    const { getByText, getByLabelText } = render(<MultiStepForm />);

    await userEvent.type(getByLabelText(/name/i), "John Smith")
    await userEvent.type(getByLabelText(/role/i), "Analyst")
    await userEvent.type(getByLabelText(/email/i), "abc@gmail.com")
    await userEvent.type(getByLabelText(/password/i), "1Abcdefdag")

    userEvent.click(getByText(/submit/i));
    expect(getByText(/privacy/i)).not.toBeDisabled();
    expect(getByLabelText(/receive updates/i)).toBeInTheDocument();
  });
  
  it("renders the first page by clicking back on second page with correct data", async () => {
    const { getByText, getByLabelText } = render(<MultiStepForm />);

    await userEvent.type(getByLabelText(/name/i), "John Smith")
    await userEvent.type(getByLabelText(/role/i), "Analyst")
    await userEvent.type(getByLabelText(/email/i), "abc@gmail.com")
    await userEvent.type(getByLabelText(/password/i), "1Abcdefdag")

    userEvent.click(getByText(/submit/i));
    expect(getByText(/privacy/i)).not.toBeDisabled();
    expect(getByLabelText(/receive updates/i)).toBeInTheDocument();
    userEvent.click(getByText(/back/i));
    expect(getByText(/user/i)).not.toBeDisabled();
    expect((getByLabelText(/name/i) as HTMLInputElement).value).toBe("John Smith");
  });

});
