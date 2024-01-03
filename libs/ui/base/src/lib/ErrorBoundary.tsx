import React, { Component, ErrorInfo, ReactNode } from 'react';

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: ErrorInfo | null;
}

export class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null,
      errorInfo: null
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    this.setState({
      hasError: true,
      error: error,
      errorInfo: errorInfo
    });
    // You can also log the error to an error tracking service like Sentry, Bugsnag, etc.
    // logErrorToService(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI when an error occurs
      return (
        <div>
          <h1>Something went wrong. 😢</h1>
          <p>{this.state.error && this.state.error.toString()}</p>
          <p>Component Stack Error Details:</p>
          <div style={{width: "300px"}}>

          {/* <pre>{this.state.errorInfo && this.state.errorInfo.componentStack}</pre> */}
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;