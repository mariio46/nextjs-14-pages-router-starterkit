import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DeleteAccountDialog } from './delete-account-dialog';

export const DeleteAccountCard = () => {
    return (
        <Card>
            <CardHeader>
                <CardTitle>Delete Your Account?</CardTitle>
                <CardDescription>
                    Once your account is deleted, all of its resources and data will be permanently deleted. Before
                    deleting your account, please download any data or information that you wish to retain.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <DeleteAccountDialog />
            </CardContent>
        </Card>
    );
};
