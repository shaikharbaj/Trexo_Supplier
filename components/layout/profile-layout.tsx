"use client"
import React from "react"
import { ProfileHeader, ProfileSidebar } from "../partials/profile";
import ProfileTabs from "../profile/profile-tabs";


const ProfileLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <React.Fragment>
            <ProfileHeader />
            <div className='grid grid-cols-12 gap-6 mt-6'>
                <div className="col-span-12 lg:col-span-4">
                    <ProfileSidebar />
                </div>
                <div className="col-span-12 lg:col-span-8">
                    <ProfileTabs children={children} />

                </div>
            </div>
        </React.Fragment>
    );
};

export default ProfileLayout;