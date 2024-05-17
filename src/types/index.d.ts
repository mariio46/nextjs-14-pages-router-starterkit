type Prettify<T> = {
    [K in typeof T]: T[K];
} & {};
