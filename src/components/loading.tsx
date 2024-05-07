import { ThemeProvider } from '@/services/providers/theme-provider';
import Head from 'next/head';

export const Loading: React.FC = () => {
    return (
        <>
            <Head>
                <title>{'NextJS-14'}</title>
            </Head>
            <ThemeProvider attribute='class' defaultTheme='system' enableSystem disableTransitionOnChange>
                <div className='min-h-screen text-xl font-semibold bg-background flex items-center justify-center'>
                    <svg
                        xmlns='http://www.w3.org/2000/svg'
                        xmlnsXlink='http://www.w3.org/1999/xlink'
                        viewBox='0 0 100 100'
                        preserveAspectRatio='xMidYMid'
                        width={200}
                        height={200}
                        style={{
                            shapeRendering: 'auto',
                            display: 'block',
                            background: 'rgba(255, 255, 255, 0)',
                        }}>
                        <g>
                            <g>
                                <circle cx={60} cy={50} r={4} fill='none' className='fill-primary'>
                                    <animate
                                        attributeName='cx'
                                        repeatCount='indefinite'
                                        dur='1s'
                                        values='95;35'
                                        keyTimes='0;1'
                                        begin='-0.67s'
                                    />
                                    <animate
                                        attributeName='fill-opacity'
                                        repeatCount='indefinite'
                                        dur='1s'
                                        values='0;1;1'
                                        keyTimes='0;0.2;1'
                                        begin='-0.67s'
                                    />
                                </circle>
                                <circle cx={60} cy={50} r={4} fill='none' className='fill-primary'>
                                    <animate
                                        attributeName='cx'
                                        repeatCount='indefinite'
                                        dur='1s'
                                        values='95;35'
                                        keyTimes='0;1'
                                        begin='-0.33s'
                                    />
                                    <animate
                                        attributeName='fill-opacity'
                                        repeatCount='indefinite'
                                        dur='1s'
                                        values='0;1;1'
                                        keyTimes='0;0.2;1'
                                        begin='-0.33s'
                                    />
                                </circle>
                                <circle cx={60} cy={50} r={4} fill='none' className='fill-primary'>
                                    <animate
                                        attributeName='cx'
                                        repeatCount='indefinite'
                                        dur='1s'
                                        values='95;35'
                                        keyTimes='0;1'
                                        begin='0s'
                                    />
                                    <animate
                                        attributeName='fill-opacity'
                                        repeatCount='indefinite'
                                        dur='1s'
                                        values='0;1;1'
                                        keyTimes='0;0.2;1'
                                        begin='0s'
                                    />
                                </circle>
                            </g>
                            <g transform='translate(-15 0)'>
                                <path d='M50 50L20 50A30 30 0 0 0 80 50Z' fill='#eab308' transform='rotate(90 50 50)' />
                                <path d='M50 50L20 50A30 30 0 0 0 80 50Z' fill='#eab308'>
                                    <animateTransform
                                        attributeName='transform'
                                        type='rotate'
                                        repeatCount='indefinite'
                                        dur='1s'
                                        values='0 50 50;45 50 50;0 50 50'
                                        keyTimes='0;0.5;1'
                                    />
                                </path>
                                <path d='M50 50L20 50A30 30 0 0 1 80 50Z' fill='#eab308'>
                                    <animateTransform
                                        attributeName='transform'
                                        type='rotate'
                                        repeatCount='indefinite'
                                        dur='1s'
                                        values='0 50 50;-45 50 50;0 50 50'
                                        keyTimes='0;0.5;1'
                                    />
                                </path>
                            </g>
                            <g />
                        </g>
                    </svg>
                </div>
            </ThemeProvider>
        </>
    );
};
