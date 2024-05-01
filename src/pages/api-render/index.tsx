import { ArticleBlock } from '@/components/articles/article-block';
import { ArticleLayout } from '@/components/articles/article-layout';
import { AppLayout } from '@/components/layouts/app-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import { ServerSidePagination } from '@/components/server-side-pagination';
import { AuthStateProvider } from '@/services/providers/auth-state-provider';
import type { ArticleResponse } from '@/types/article';
import { type GetServerSideProps, type InferGetServerSidePropsType } from 'next';

const ApiRender = ({ data }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    return (
        <>
            <div>
                <ArticleLayout>
                    {data.data.map((article, i) => (
                        <ArticleBlock key={i} article={article} />
                    ))}
                </ArticleLayout>
            </div>
            <div className='my-10'>
                <ServerSidePagination meta={data.meta} links={data.links} url='/api-render' />
            </div>
        </>
    );
};

ApiRender.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AuthStateProvider>
                <AppLayout title='API Side'>{page}</AppLayout>
            </AuthStateProvider>
        </RootLayout>
    );
};

export default ApiRender;

export const getServerSideProps = (async ({ query }) => {
    const response = await fetch(`http://localhost:3000/api/articles?page=${query.page ?? 1}`);

    const data: ArticleResponse = await response.json();

    return {
        props: { data },
    };
}) satisfies GetServerSideProps<{ data: ArticleResponse }>;
