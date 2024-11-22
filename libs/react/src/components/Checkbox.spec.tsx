import { render } from '@testing-library/react';

import Checkbox from './Checkbox';

describe('Render Button', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Checkbox />);
    expect(baseElement).toBeTruthy();
  });
});
