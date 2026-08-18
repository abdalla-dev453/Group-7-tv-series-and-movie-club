import { Link } from 'react-router-dom';

const Signup = () => (
  <section className="page-panel">
    <h1>Sign up</h1>
    <form>
      <label>
        Name
        <input type="text" name="name" placeholder="Your name" />
      </label>
      <label>
        Email
        <input type="email" name="email" placeholder="you@example.com" />
      </label>
      <label>
        Password
        <input type="password" name="password" placeholder="••••••••" />
      </label>
      <button type="submit">Create account</button>
    </form>
    <p>
      Already have an account? <Link to="/login">Login</Link>
    </p>
  </section>
);

export default Signup;
