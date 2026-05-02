import Navbar from '@/Components/Navbar';
import Footer from '@/Components/Footer';
import FloatingActions from '@/Components/FloatingActions';
import Marquee from '@/Components/Marquee';
import PromotionalModal from '@/Components/PromotionalModal';
import CookieConsent from '@/Components/CookieConsent';
import { usePage } from '@inertiajs/react';

export default function MainLayout({ children }: { children: React.ReactNode }) {
    const { props } = usePage();
    const siteContent: any = props.siteContent;

    return (
        <div className="min-h-screen bg-white">
            {window.location.pathname === '/' && (
                <PromotionalModal announcement={siteContent?.announcement} />
            )}
            <CookieConsent />
            {Boolean(siteContent?.settings?.marqueeShow) && siteContent?.settings?.marqueeText && (
                <Marquee text={siteContent.settings.marqueeText} />
            )}
            <Navbar />
            <main>{children}</main>
            <Footer />
            <FloatingActions />
        </div>
    );
}
