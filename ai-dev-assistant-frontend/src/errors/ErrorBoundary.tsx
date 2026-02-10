import { Component, type ReactNode } from "react";

export class ErrorBoundary extends Component<
    { children: ReactNode },
    { hasError: boolean }
> {
    state = { hasError: false };

    static getDerivedStateFromError(): { hasError: true } {
        return { hasError: true };
    }

    render() {
        if (this.state.hasError) {
            return <h1>Something went wrong.</h1>;
        }
        return this.props.children;
    }
}
