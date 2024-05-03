import { Icon } from './icon';
import { SideNavigationLink } from './side-navigation-link';

export const SideNavigation = () => {
    return (
        <aside className='relative hidden w-72 shrink-0 bg-background lg:block '>
            <div className='fixed bottom-0 top-[4.8rem] flex w-72 flex-col gap-y-1 border-border/80'>
                <ul className='custom-scrollbar flex-1 h-screen space-y-1 [&>li]:-mx-4 overflow-y-auto px-6 py-4'>
                    <SideNavigationLink href='/dashboard'>
                        <Icon name='IconBrandSpeedtest' />
                        Dashboard
                    </SideNavigationLink>
                    <SideNavigationLink href='/settings'>
                        <Icon name='IconSettings' />
                        Settings
                    </SideNavigationLink>
                </ul>
            </div>
        </aside>
    );
};
