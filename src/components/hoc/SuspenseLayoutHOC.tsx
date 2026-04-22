import { ComponentType, Suspense } from "react";

function SuspenseLayoutHOC<P extends object>(
  Component: ComponentType<P>,
  LoadingComponent?: ComponentType,
) {
  function SuspenseWrapper(props: P) {
    return (
      <Suspense fallback={LoadingComponent ? <LoadingComponent /> : null}>
        <Component {...props} />
      </Suspense>
    );
  }

  return SuspenseWrapper;
}

export default SuspenseLayoutHOC;
