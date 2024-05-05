import { Button } from './ui/button';
import { Input } from './ui/input';

type SearchBlockProps = {
    searchHook: (e: React.FormEvent) => void;
    state: string;
    setState: (search: string) => void;
    searchInputref?: React.LegacyRef<HTMLInputElement>;
    urlState: string;
    setUrlState: (urlState: string) => void;
    defaultUrlLabel: string;
    searchUrlLabel: string;
};

const SearchBlock: React.FC<SearchBlockProps> = (props) => {
    // prettier-ignore
    const { searchHook, state, setState, searchInputref, urlState, setUrlState, defaultUrlLabel, searchUrlLabel } = props

    return (
        <form onSubmit={searchHook}>
            <div className='flex justify-end gap-2'>
                <div className='max-w-sm w-full'>
                    <Input
                        type='text'
                        placeholder='Find user...'
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        ref={searchInputref}
                    />
                </div>
                {urlState.startsWith(searchUrlLabel) && (
                    <Button onClick={() => setUrlState(defaultUrlLabel)} variant='outline' type='button'>
                        Reset
                    </Button>
                )}
                <Button disabled={state === '' || state.length < 3} type='submit'>
                    Search
                </Button>
            </div>
        </form>
    );
};

export { SearchBlock };
