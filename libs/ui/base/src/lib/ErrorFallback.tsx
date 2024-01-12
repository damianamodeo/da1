export const ErrorFallback = ({ error }: { error: Error | null }) => {
  return <div>Error: {error?.message}</div>;
};

export default ErrorFallback;
