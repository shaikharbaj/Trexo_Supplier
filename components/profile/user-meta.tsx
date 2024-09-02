"use client"
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useAppSelector } from "@/hooks";
import avatar6 from "@/public/images/avatar/avatar-6.jpg"
import { RootState } from "@/redux/store";
import Image from "next/image";

interface IUserMetaProps { }

const UserMeta: React.FC<IUserMetaProps> = () => {
  const { profile } = useAppSelector((state: RootState) => state.profile);
  return (
    <Card>
      <CardContent className="p-6 flex flex-col items-center">
        <div className="w-[124px] h-[124px] relative rounded-full">
          <Image src={avatar6} alt="avatar" className="w-full h-full object-cover rounded-full" priority={true} />
          <Button asChild
            size="icon"
            className="h-8 w-8 rounded-full cursor-pointer absolute bottom-0 right-0"
          >
          </Button>
          <Input type="file" className="hidden" id="avatar" />
        </div>
        <div className="mt-4 text-xl font-semibold text-default-900">{`${profile?.first_name} ${profile?.last_name}`}</div>
        <div className="mt-1.5 text-sm font-medium text-default-500">{profile?.email}</div>
      </CardContent>
    </Card>
  );
};

export default UserMeta;