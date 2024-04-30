import { ArticleBlock } from '@/components/articles/article-block';
import { ArticleLayout } from '@/components/articles/article-layout';
import { AppLayout } from '@/components/layouts/app-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { ServerSidePagination } from '@/components/server-side-pagination';
import type { ArticleResponse, ArticleType } from '@/types/article';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';
import { NextPageWithLayout } from '../_app';

type ServerSidePageProps = InferGetServerSidePropsType<typeof getServerSideProps>;

const ServerSide: NextPageWithLayout<ServerSidePageProps> = ({ data }: ServerSidePageProps) => {
    return (
        <>
            <div>
                <ArticleLayout>
                    {data.data.map((article: ArticleType, i: number) => (
                        <ArticleBlock key={i} article={article} />
                    ))}
                </ArticleLayout>
            </div>
            <div className='my-10'>
                <ServerSidePagination meta={data.meta} links={data.links} url='/server-side' />
            </div>
        </>
    );
};

ServerSide.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AppLayout title='Server Side'>{page}</AppLayout>
        </RootLayout>
    );
};

export default ServerSide;

export const getServerSideProps = (async ({ query }) => {
    const response = await fetch(`http://localhost:8080/api/articles?page=${query.page}`);

    const data: ArticleResponse = await response.json();

    return {
        props: { data },
    };
}) satisfies GetServerSideProps<{ data: ArticleResponse }>;
