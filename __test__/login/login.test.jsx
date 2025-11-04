import LoginPage from '@/app/login/page';
import { render, screen } from '@testing-library/react';

jest.mock('next-auth/react');

describe('LoginPage', () => {
  it('renders login page with company logo and form', () => {
    render(<LoginPage />);

    // Check if company name is present
    expect(screen.getByText('Acme Inc.')).toBeInTheDocument();

    // Check if logo icon is present
    expect(screen.getByRole('link', { name: 'Acme Inc.' })).toHaveClass(
      'flex items-center gap-2 self-center font-medium'
    );

    // Verify the page has the main container with correct styling
    const mainContainer = screen.getByTestId('login-container');
    expect(mainContainer).toHaveClass(
      'bg-muted flex min-h-svh flex-col items-center justify-center gap-6'
    );
  });
});
