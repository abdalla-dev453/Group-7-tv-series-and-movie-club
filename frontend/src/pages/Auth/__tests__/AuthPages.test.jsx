import { beforeEach, describe, expect, it, vi } from 'vitest';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import Login from '../Login';
import Signup from '../Signup';
import { useAuth } from '../../../context/AuthContext';

vi.mock('../../../context/AuthContext', () => ({ useAuth: vi.fn() }));

const renderPage = (path = '/login') => render(
  <MemoryRouter initialEntries={[path]}>
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/" element={<p>Signed in</p>} />
    </Routes>
  </MemoryRouter>,
);

describe('authentication pages', () => {
  beforeEach(() => vi.clearAllMocks());

  it('validates login fields inline and associates visible labels', async () => {
    useAuth.mockReturnValue({ login: vi.fn() });
    renderPage();
    expect(screen.getByLabelText('Username')).toHaveAttribute('id', 'login-username');
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByText('Enter your username.')).toBeInTheDocument();
    expect(screen.getByText('Enter your password.')).toBeInTheDocument();
  });

  it('shows and dismisses an authentication failure', async () => {
    const login = vi.fn().mockRejectedValue({ response: { status: 401 } });
    useAuth.mockReturnValue({ login });
    renderPage();
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'cinefan' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(await screen.findByRole('alert')).toHaveTextContent('Invalid username or password.');
    fireEvent.click(screen.getByRole('button', { name: 'Dismiss error' }));
    expect(screen.queryByRole('alert')).not.toBeInTheDocument();
  });

  it('offers password visibility and explains the existing password rule', () => {
    useAuth.mockReturnValue({ signup: vi.fn() });
    renderPage('/signup');
    expect(screen.getByText('Use at least 8 characters.')).toBeInTheDocument();
    const password = screen.getByLabelText('Password');
    expect(password).toHaveAttribute('type', 'password');
    fireEvent.click(screen.getAllByRole('button', { name: 'Show password' })[0]);
    expect(password).toHaveAttribute('type', 'text');
  });

  it('preserves form data and reports password mismatch inline', async () => {
    const signup = vi.fn();
    useAuth.mockReturnValue({ signup });
    renderPage('/signup');
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'cinefan' } });
    fireEvent.change(screen.getByLabelText('Email'), { target: { value: 'fan@example.com' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'password123' } });
    fireEvent.change(screen.getByLabelText('Confirm password'), { target: { value: 'different123' } });
    fireEvent.click(screen.getByRole('button', { name: /create account/i }));
    expect(await screen.findByText('Passwords do not match.')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toHaveValue('cinefan');
    expect(signup).not.toHaveBeenCalled();
  });

  it('disables submission during a pending login request', async () => {
    let resolveLogin;
    const login = vi.fn(() => new Promise((resolve) => { resolveLogin = resolve; }));
    useAuth.mockReturnValue({ login });
    renderPage();
    fireEvent.change(screen.getByLabelText('Username'), { target: { value: 'cinefan' } });
    fireEvent.change(screen.getByLabelText('Password'), { target: { value: 'secret123' } });
    fireEvent.click(screen.getByRole('button', { name: /sign in/i }));
    expect(screen.getByRole('button', { name: 'Signing in…' })).toBeDisabled();
    resolveLogin();
    await waitFor(() => expect(screen.getByText('Signed in')).toBeInTheDocument());
  });
});
