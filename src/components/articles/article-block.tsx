import type { ArticleType } from '@/types/article';
import Image from 'next/image';

export const ArticleBlock = ({ article }: { article: ArticleType }) => {
    return (
        <div>
            {/* <img src={article.image} alt={article.title} className='aspect-video rounded-lg' /> */}
            <Image
                width={1280}
                height={720}
                src={article.image}
                alt={article.title}
                className='aspect-video rounded-lg'
            />
            <div className='mt-4 space-y-4'>
                <div className='line-clamp-1'>
                    <h3 className='text-lg font-medium text-foreground'>{article.title}</h3>
                </div>
                <div className='b-4 line-clamp-2 text-sm text-muted-foreground'>{article.body}</div>
            </div>
        </div>
    );
};
