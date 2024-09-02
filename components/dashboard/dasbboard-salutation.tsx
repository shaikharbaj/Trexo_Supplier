"use client";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";
import { dateWithDayNameDayMonthNameAndYear } from "@/utils/date";

interface IDashboardSalutationProps {
  trans: (key: string) => string;
}

const DashboardSalutation = ({ trans }: IDashboardSalutationProps) => {
  const { isProfileLoading, profile } = useAppSelector(
    (state: RootState) => state.profile
  );  
  return (
    <div className=" space-y-2">
      <div className=" font-light text-2xl">
        {" "}
        {trans('welcome')} {trans('back')}
        <span className="font-semibold">
          {" "}
          <span>
            {profile?.first_name} {profile?.last_name}
          </span>
          !
        </span>
      </div>
      <div className=" text-xs opacity-80">
        {" "}
        {dateWithDayNameDayMonthNameAndYear()}
      </div>
    </div>
  );
};

export default DashboardSalutation;
