import { Link } from 'react-router-dom';

const Login = () => (
  <section className="page-panel">
    <h1>Login</h1>
    <form>
      <label>
        Email
        <input type="email" name="email" placeholder="you@example.com" />
      </label>
      <label>
        Password
        <input type="password" name="password" placeholder="••••••••" />
      </label>
      <button type="submit">Login</button>
    </form>
    <p>
      Need an account? <Link to="/signup">Sign up</Link>
    </p>
  </section>
);

export default Login;
