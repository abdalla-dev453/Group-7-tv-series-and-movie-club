import { Component } from 'react';

export default class AppErrorBoundary extends Component {
  state = { hasError: false };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        <main className="page-panel" role="alert">
          <h1>Something went wrong</h1>
          <p>Please refresh the page. If the problem persists, try signing in again.</p>
        </main>
      );
    }

    return this.props.children;
  }
}
