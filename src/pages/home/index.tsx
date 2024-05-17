import { type NextPageWithLayout } from '../_app';

import { AppLayout } from '@/components/layouts/app-layout';
import { RootLayout } from '@/components/layouts/root-layout';

const Home: NextPageWithLayout = () => {
    return <div className='flex h-full items-center gap-6 justify-center'></div>;
};

Home.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AppLayout title='Home'>{page}</AppLayout>
        </RootLayout>
    );
};

export default Home;
