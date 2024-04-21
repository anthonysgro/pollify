import * as React from "react";

export interface AuthPageProps {
  isProdEnv: boolean;
}
export interface AuthLayoutProps {
  children: [React.ReactElement<AuthPageProps>];
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  // const isProdEnv = env.NODE_ENV === constants.PROD_ENV;

  // const childrenWithProps = React.Children.map(children, (child) => {
  //     if (React.isValidElement(child)) {
  //         return React.cloneElement(child, { isProdEnv: isProdEnv });
  //     }
  //     return child;
  // });

  // if (isProdEnv) return <ComingSoon />;

  return (
    <div className="min-h-screen flex items-center justify-center">
      {children}
    </div>
  );
}
