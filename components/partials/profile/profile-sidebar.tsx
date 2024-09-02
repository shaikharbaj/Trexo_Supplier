import ProfileProgress from "@/components/profile/profile-progress"
import UserMeta from "@/components/profile/user-meta"
import React from "react"

interface IProfileSidebarProps { }


const ProfileSidebar: React.FC<IProfileSidebarProps> = () => {

    return (
        <div className="space-y-6">
            <UserMeta />
            <ProfileProgress />
        </div>
    )
}

export default ProfileSidebar