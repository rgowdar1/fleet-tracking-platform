import { Component, type ErrorInfo, type ReactNode } from "react";
import { AlertCircle } from "lucide-react";

interface Props {
  children: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

export default class ErrorBoundary extends Component<Props, State> {
  public constructor(props: Props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  private handleReset = () => {
    this.setState({ hasError: false, error: null });
  };

  public render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
          <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
            <div className="flex justify-center mb-4">
              <AlertCircle className="w-12 h-12 text-red-600" />
            </div>
            <h1 className="text-2xl font-bold text-center text-gray-900 mb-2">
              Something went wrong
            </h1>
            <p className="text-center text-gray-600 mb-4">
              An unexpected error occurred
            </p>
            {this.state.error && (
              <details className="mb-4 p-3 bg-red-50 border border-red-200 rounded max-h-32 overflow-auto">
                <summary className="font-medium text-red-900 cursor-pointer">
                  Error details
                </summary>
                <p className="text-sm text-red-800 mt-2 font-mono">
                  {this.state.error.toString()}
                </p>
              </details>
            )}
            <button
              onClick={this.handleReset}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded-lg transition"
            >
              Try Again
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}
