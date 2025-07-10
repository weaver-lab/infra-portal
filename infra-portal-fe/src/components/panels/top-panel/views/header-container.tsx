type HeaderContainerProps = {
  children: React.ReactNode;
};

export const HeaderContainer = ({ children }: HeaderContainerProps) => {
  return (
    <div className="flex flex-row h-[54px] w-full items-center border-b border-custom-gray px-4 justify-between">
      {children}
    </div>
  );
};
