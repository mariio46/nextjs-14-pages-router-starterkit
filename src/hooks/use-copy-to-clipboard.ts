import { useToast } from '@/components/ui/use-toast';

interface UseCopyToClipboardReturn {
    copyUsernameToClipboard: (value: string) => void;
}

export const useCopyToClipboard = (): UseCopyToClipboardReturn => {
    const { toast } = useToast();

    const copyUsernameToClipboard = (username: string): void => {
        navigator.clipboard.writeText(username);
        toast({
            title: 'Success',
            description: `User with username ${username} copied to clipboard.`,
            duration: 2500,
        });
    };

    return { copyUsernameToClipboard };
};
