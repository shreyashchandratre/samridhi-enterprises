import React from "react";
import PropTypes from "prop-types";

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught an error:", error, errorInfo);
  }

  handleReload = () => {
    window.location.reload();
  };

  handleGoHome = () => {
    window.location.href = "/";
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "80vh",
          padding: "20px",
          textAlign: "center",
          fontFamily: "system-ui, sans-serif"
        }}>
          <div style={{
            maxWidth: "500px",
            padding: "40px",
            borderRadius: "12px",
            backgroundColor: "#fff",
            boxShadow: "0 10px 25px rgba(0, 0, 0, 0.08)",
            border: "1px solid #f0f0f0"
          }}>
            <div style={{
              fontSize: "48px",
              marginBottom: "20px",
              color: "#ef4444"
            }}>
              ⚠️
            </div>
            <h1 style={{
              fontSize: "24px",
              fontWeight: "700",
              color: "#1f2937",
              marginBottom: "10px"
            }}>
              Something went wrong
            </h1>
            <p style={{
              color: "#6b7280",
              fontSize: "16px",
              marginBottom: "30px",
              lineHeight: "1.5"
            }}>
              An unexpected error occurred in the application. Please try reloading the page or go back to the homepage.
            </p>
            <div style={{
              display: "flex",
              gap: "12px",
              justifyContent: "center"
            }}>
              <button
                onClick={this.handleReload}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "none",
                  backgroundColor: "#2563eb",
                  color: "#fff",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#1d4ed8"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#2563eb"}
              >
                Reload Page
              </button>
              <button
                onClick={this.handleGoHome}
                style={{
                  padding: "10px 20px",
                  borderRadius: "6px",
                  border: "1px solid #d1d5db",
                  backgroundColor: "#fff",
                  color: "#374151",
                  fontSize: "14px",
                  fontWeight: "600",
                  cursor: "pointer",
                  transition: "background-color 0.2s"
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = "#f9fafb"}
                onMouseOut={(e) => e.target.style.backgroundColor = "#fff"}
              >
                Go Home
              </button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

ErrorBoundary.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ErrorBoundary;
