import { useAppSelector, useMediaQuery } from '@/hooks';
import Image from 'next/image';
import Link from 'next/link';
import React, { ReactNode, useEffect, useState } from 'react';
import FavIcon from "@/public/images/all-img/fav-icon.png"
import { Icon } from '@iconify/react';
import { Menu } from 'lucide-react';
import { RootState } from '@/redux/store';
import { fetchProfile } from '@/service/profile.service';
import ThemeButton from '../header/theme-button';
import { Button } from '@/components/ui/button';


const OnboardingHeader:React.FC = () => {
    const { profile } = useAppSelector((state: RootState) => state.profile);    
    const [scroll, setScroll] = useState<boolean>(false);
    useEffect(() => {
        fetchProfile();
        window.addEventListener("scroll", () => {
            setScroll(window.scrollY > 50);
        });
    }, []);
    const isDesktop = useMediaQuery("(min-width: 1024px)");
    const [open, setOpen] = React.useState<boolean>(false);
    const [show, setShow] = React.useState<boolean>(false);
    if (!isDesktop) {
        return (
            <>
                <div className={scroll ? "bg-card/50 dark:bg-card/70 backdrop-blur-lg z-50 shadow-sm fixed top-0 left-0 w-full py-3" : "fixed top-0 left-0 w-full py-3"}>
                    <nav className="container flex justify-between relative z-50">
                        <Link href="/" className="flex items-center gap-1">
                            {/* <SiteLogo className="h-8 w-8  text-primary" /> */}
                            <Image src={FavIcon} alt="dashboard - Company Fav icon" className="w-[39px] m-auto object-cover" priority={true} />
                            <div className="flex-1  text-xl">
                                <span className="text-white font-extrabold">Trexo</span> <span className="text-white dark:text-primary font-light">Pro</span>
                            </div>
                        </Link>

                        <div className="flex items-center gap-6">
                            <ThemeButton />
                            <Button asChild size="sm">
                                <Link href="/" target="__blank" className="text-sm font-semibold">
                                    <Icon icon="heroicons:shopping-cart" className="w-4 h-4 me-1.5" />
                                    Register
                                </Link>
                            </Button>
                            <Button asChild size="sm">
                                <Link href="/auth/login" className="text-sm font-semibold">
                                    <Icon icon="heroicons:arrow-left-end-on-rectangle" className="w-4 h-4 me-1.5" />
                                    Login
                                </Link>
                            </Button>
                            <button type="button">
                                <Menu
                                    className=" h-6 w-6 cursor-pointer"
                                    onClick={() => setOpen(!open)}
                                />
                            </button>
                        </div>
                    </nav>
                </div>
            </>
        );
    }
    return(
        <div className={scroll ? "bg-[#142A4A] backdrop-blur-lg shadow-xl z-30 dark:bg-card/70 fixed top-0 left-0 w-full py-2 duration-200" : "bg-[#142A4A]  duration-200 z-30 fixed top-0 left-0 w-full py-4"}>
            <nav className="container flex justify-between">
                <div className="flex justify-start gap-12">
                    <Link href="/" className="flex items-center gap-1">
                        {/* <SiteLogo className="h-8 w-8  text-primary" /> */}
                        <Image src={FavIcon} alt="dashboard - Company Fav icon" className="w-[39px] m-auto object-cover" priority={true} />
                        <div className="flex-1 text-xl">
                            <span className="text-white font-extrabold">Trexo</span> <span className="text-white dark:text-primary font-light">Pro</span>
                        </div>
                    </Link>
                </div>
                <div className="text-end text-white">
                    <h3>Hello, <span className="font-bold">{profile.first_name} {profile.last_name}!</span> </h3>
                    <p className="text-[#FFFFFFB3]">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Mauris placerat dui id facilisis vehicula.</p>
                </div>
            </nav>
        </div>
    )
}

export default OnboardingHeader;