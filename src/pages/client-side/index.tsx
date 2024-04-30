import { ArticleBlock } from '@/components/articles/article-block';
import { ArticleLayout } from '@/components/articles/article-layout';
import { ArticleSkeleton } from '@/components/articles/article-skeleton';
import { AppLayout } from '@/components/layouts/app-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { SimplePagination } from '@/components/simple-pagination';
import { fetcher } from '@/lib/swr-fetcher';
import { ArticleResponse, ArticleType } from '@/types/article';
import { useState } from 'react';
import useSWR from 'swr';
import { NextPageWithLayout } from '../_app';

const ClientSide: NextPageWithLayout = () => {
    const [url, setUrl] = useState<string>('articles');
    const { data, isLoading, error } = useSWR<ArticleResponse>(url, fetcher);

    if (error) return <h1>No Data</h1>;

    if (isLoading) {
        return (
            <ArticleLayout>
                {Array.from({ length: 3 }).map((_, i) => (
                    <ArticleSkeleton key={i} />
                ))}
            </ArticleLayout>
        );
    }

    return (
        <>
            <ArticleLayout>
                {data?.data.map((product: ArticleType, i: number) => <ArticleBlock key={i} article={product} />)}
            </ArticleLayout>

            <div className='my-10'>
                <SimplePagination setUrl={setUrl} meta={data?.meta!} links={data?.links!} />
            </div>
        </>
    );
};

ClientSide.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AppLayout title='Client Side'>{page}</AppLayout>
        </RootLayout>
    );
};

export default ClientSide;
