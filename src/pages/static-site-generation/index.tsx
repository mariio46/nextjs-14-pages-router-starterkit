import { ArticleBlock } from '@/components/articles/article-block';
import { ArticleLayout } from '@/components/articles/article-layout';
import { AppLayout } from '@/components/layouts/app-layout';
import { RootLayout } from '@/components/layouts/root-layout';
import type { ArticleResponse } from '@/types/article';
import { type GetStaticProps, type InferGetStaticPropsType } from 'next';

const StaticSiteGeneration = ({ data }: InferGetStaticPropsType<typeof getStaticProps>) => {
    return <ArticleLayout>{data?.data.map((article, i) => <ArticleBlock article={article} key={i} />)}</ArticleLayout>;
};

StaticSiteGeneration.getLayout = function getLayout(page: React.ReactElement) {
    return (
        <RootLayout>
            <AppLayout title='Static Site Generation'>{page}</AppLayout>
        </RootLayout>
    );
};

export default StaticSiteGeneration;

export const getStaticProps = (async (context) => {
    const response = await fetch(`http://localhost:8080/api/articles`);

    const data: ArticleResponse = await response.json();

    return { props: { data } };
}) satisfies GetStaticProps<{
    data: ArticleResponse;
}>;
