import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';

import { DashboardPage } from '../src/features/dashboard/DashboardPage';
import { buildTheme } from '../src/core/theme';

describe('DashboardPage', () => {
  it('renderiza título Dashboard', () => {
    render(
      <ThemeProvider theme={buildTheme('light')}>
        <MemoryRouter>
          <DashboardPage />
        </MemoryRouter>
      </ThemeProvider>,
    );
    expect(screen.getByRole('heading', { name: /dashboard/i, level: 2 })).toBeInTheDocument();
  });
});
