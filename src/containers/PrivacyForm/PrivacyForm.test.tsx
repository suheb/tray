import React from 'react';
import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event'

import PrivacyForm from './PrivacyForm';

describe("PrivacyForm", () => {
  it("renders without crashing", () => {
    const handleSubmit = jest.fn();
    const handleBack = jest.fn();
    const { asFragment } = render(<PrivacyForm handleBack={handleBack} handleSubmit={handleSubmit} />);
    expect(asFragment()).toMatchSnapshot();
  });

  it("does not submit if there are errors", () => {
    const handleSubmit = jest.fn();
    const handleBack = jest.fn();
    const formData = { "firstPartyEmail": false, "thirdPartyEmail": false }
    const { getByText } = render(<PrivacyForm handleBack={handleBack} handleSubmit={handleSubmit} />);
    userEvent.click(getByText(/submit/i));
    expect(handleSubmit).toBeCalledWith("privacy", formData);
  });

  it("does submits with correct values", async () => {
    const handleSubmit = jest.fn();
    const handleBack = jest.fn();
    const formData = { "firstPartyEmail": true, "thirdPartyEmail": false }
    const { getByText, getByLabelText } = render(<PrivacyForm handleBack={handleBack} handleSubmit={handleSubmit} />);
    await userEvent.click(getByLabelText(/receive updates/i));

    userEvent.click(getByText(/submit/i));
    expect(handleSubmit).toBeCalledWith("privacy", formData);
  });
});
