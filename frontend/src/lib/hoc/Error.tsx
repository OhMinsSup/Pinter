import * as React from 'react';

type InjectedProps = {};

export const withErrorBoundary = <WrappedProps extends InjectedProps>(
  WrappedComponent: React.ComponentType<WrappedProps>
) => {
  type HocProps = WrappedProps & InjectedProps;

  type HocState = {
    error: Error | null | undefined;
  };

  return class WithErrorBoundary extends React.Component<HocProps, HocState> {
    public static componentName = `withErrorBoundary(${WrappedComponent.name})`;

    public state: HocState = {
      error: undefined,
    };

    public logErrorToCloud = (error: Error | null, info: object) => {
      console.log(error);
      console.log(info);
    };

    public componentDidCatch(error: Error | null, info: object) {
      this.setState({
        error: error || new Error('Error was swallowed during propagation.'),
      });
      this.logErrorToCloud(error, info);
    }

    public render() {
      const { children, ...restProps } = this.props as {
        children: React.ReactNode;
      };

      const { error } = this.state;

      if (error) {
        return <WrappedComponent {...restProps} />;
      }

      return children;
    }
  };
};

export const ErrorMessage = () => {
  return (
    <div>
      <h2>{`Sorry there was an unexpected error`}</h2>
      {`To continue: `}
      {`go to home page`}
    </div>
  );
};
