import { AppLayout } from '@/components/layouts/app-layout';
import type { NextPageWithLayout } from '@/pages/_app';
import { ReactElement } from 'react';

const Home: NextPageWithLayout = () => {
    return (
        <div className='max-w-2xl'>
            <div className='border border-zinc-200 text-center rounded-lg shadow p-5'>
                <h1 className='text-xl font-bold mb-2'>Conclusion</h1>
                <p className='text-zinc-500 text-sm font-medium '>
                    Lorem ipsum, dolor sit amet consectetur adipisicing elit. Voluptatibus odit consequuntur debitis
                    voluptas sapiente, consequatur placeat nulla quo aperiam quibusdam veritatis voluptatum quam porro
                    quas alias amet magnam ullam illum cumque hic? Iste, quam error distinctio voluptate, ex voluptatem
                    perferendis expedita fugit, nesciunt laudantium quaerat repellendus voluptates architecto! Odio,
                    numquam.
                </p>
            </div>
        </div>
    );
};

Home.getLayout = function getLayout(page: ReactElement) {
    return <AppLayout>{page}</AppLayout>;
};

export default Home;
