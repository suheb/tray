import React from 'react';
import { render } from '@testing-library/react';

import DoneForm from './DoneForm';

describe("DoneForm", () => {
  it("renders without crashing", () => {
    const { asFragment } = render(<DoneForm />);
    expect(asFragment()).toMatchSnapshot();
  });
});
