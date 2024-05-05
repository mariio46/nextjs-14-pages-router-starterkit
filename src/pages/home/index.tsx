import { Counter } from '@/components/counter';
import { AppLayout } from '@/components/layouts/app-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { NextPageWithLayout } from '../_app';

const Home: NextPageWithLayout = () => {
    return (
        <div className='flex items-center gap-6 justify-center'>
            <Counter />
        </div>
    );
};

Home.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AppLayout title='Home'>{page}</AppLayout>
        </RootLayout>
    );
};

export default Home;
