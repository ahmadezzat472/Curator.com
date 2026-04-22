import { ComponentType, Suspense } from "react";

function SuspenseLayoutHOC<P extends object>(
  Component: ComponentType<P>,
  LoadingComponent?: ComponentType,
  loadingProps?: { [key: string]: unknown },
) {
  return function SuspenseWrapper(props: P) {
    return (
      <Suspense
        fallback={
          LoadingComponent ? (
            <div>
              <LoadingComponent {...loadingProps} />
            </div>
          ) : null
        }
      >
        <Component {...props} />
      </Suspense>
    );
  };
}

export default SuspenseLayoutHOC;
