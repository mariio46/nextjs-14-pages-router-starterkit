import { type NextPageWithLayout } from '../_app';

import { AppLayout } from '@/components/layouts/app-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { HomePage } from '@/components/pages/home/home-page';

const Home: NextPageWithLayout = () => {
    return <HomePage />;
};

Home.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AppLayout title='Home'>{page}</AppLayout>
        </RootLayout>
    );
};

export default Home;
