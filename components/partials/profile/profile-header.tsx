"use client";
import { Card, CardContent } from "@/components/ui/card";
import coverImage from "@/public/images/all-img/user-cover.png"
import Image from "next/image";
import User from "@/public/images/avatar/avatar-6.jpg";
import { Fragment } from "react";
import { RootState } from "@/redux/store";
import { useAppSelector } from "@/hooks";

interface IProfileHeaderProps {
}

const ProfileHeader: React.FC<IProfileHeaderProps> = () => {
    const { profile } = useAppSelector((state: RootState) => state.profile);
    return (
        <Fragment>
            <Card className="mt-6 rounded-t-2xl ">
                <CardContent className="p-0">
                    <div className="relative h-[200px] lg:h-[296px] rounded-t-2xl w-full object-cover bg-no-repeat"
                        style={{ backgroundImage: `url(${coverImage.src})` }}
                    >
                        <div className="flex justify-end pt-6 pr-6  divide-x divide-primary-foreground  gap-4">
                            <div>
                                <div className="text-xl font-semibold text-primary-foreground">24.5K</div>
                                <div className="text-sm text-default-200">Followers</div>
                            </div>
                            <div className="pl-4">
                                <div className="text-xl font-semibold text-primary-foreground">22.5K</div>
                                <div className="text-sm text-default-200">Following</div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 absolute ltr:left-10 rtl:right-10 ">
                            <div>
                                <Image
                                    src={User}
                                    alt="user"
                                    className="h-20 w-20 lg:w-32 lg:h-32 rounded-full"
                                />
                            </div>
                            <div>
                                <div className="text-xl lg:text-2xl font-semibold text-primary-foreground mb-1">{`${profile?.first_name} ${profile?.last_name}`}</div>
                                <div className="text-xs lg:text-sm font-medium text-default-100 dark:text-default-900 pb-1.5">{profile?.email}</div>
                            </div>
                        </div>

                    </div>


                </CardContent>
            </Card>
        </Fragment>
    );
};

export default ProfileHeader;