type ViewContainerProps = {
  children: React.ReactNode;
};

export const ViewContainer = ({ children }: ViewContainerProps) => {
  return <div className={`w-full h-[600px]`}>{children}</div>;
};
