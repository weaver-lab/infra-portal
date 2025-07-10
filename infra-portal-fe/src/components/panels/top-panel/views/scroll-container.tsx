export const ScrollContainer = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  return <div className="overflow-y-auto h-[540px]">{children}</div>;
};
