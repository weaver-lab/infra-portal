import { InfrastructureItemFilterType } from "@/state/zustand/use-filter-view-store";

const unhiltedColorClass = "bg-[#E9E9E9]";
const hiliteColorClass = "bg-[#277AFF]";
const unhiltedTextClass = "text-[#474747]";
const hiltedTextClass = "text-[#ffffff]";
const textClass = "font-ibm font-normal text-xs leading-4 tracking-custom";

type FilterButtonProps = {
  id: InfrastructureItemFilterType;
  label: string;
  hilited: boolean;
  filterButtonClicked: (id: InfrastructureItemFilterType) => void;
};

export const FilterButton = ({
  id,
  label,
  hilited,
  filterButtonClicked,
}: FilterButtonProps) => {
  const colorClass = hilited ? hiliteColorClass : unhiltedColorClass;
  const textColorClass = hilited ? hiltedTextClass : unhiltedTextClass;
  return (
    <div
      title={label}
      onClick={() => filterButtonClicked(id)}
      className={`line-clamp-3 flex w-[80px] h-[54px] rounded-[4px] p-1 cursor-pointer ${textClass} ${colorClass} ${textColorClass}`}
    >
      {label}
    </div>
  );
};
