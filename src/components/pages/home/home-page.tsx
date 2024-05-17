interface HomePageProps {}

export const HomePage = ({}: HomePageProps) => {
    return (
        <div className='flex gap-4 min-h-[500px] w-full md:w-1/2 h-full items-center'>
            <div className='space-y-3'>
                {/* <h3 className='text-muted-foreground font-semibold text-2xl'>✌️ Halo Sobat Pedeaem</h3>
                <h1 className='text-2xl sm:text-4xl text-foreground font-bold leading-relaxed'>
                    Solusi ngopi anda ada di
                    <span className='ml-2 inline-block -rotate-1 rounded-xl bg-gradient-to-r from-background via-background to-background px-4 py-1.5 tracking-normal text-foreground shadow-2xl shadow-foreground/[0.25] ring-2 ring-foreground/70 dark:via-primary/10 sm:px-4 sm:py-3 sm:text-3xl lg:text-4xl'>
                        Kedai Kopi Pedeaem
                    </span>
                </h1> */}
            </div>
        </div>
    );
};
