import { cn } from '@/lib/utils';
import { SingleUserType } from '@/types/api/data/users';
import Image from 'next/image';
import React from 'react';

interface DetailUserBlocksProps {
    user: SingleUserType;
}

export const DetailUserBlocks: React.FC<DetailUserBlocksProps> = ({ user }) => {
    return (
        <div className='flex flex-wrap items-start gap-5 md:gap-10'>
            <div className='w-full flex justify-center md:w-auto md:justify-start'>
                <Image src={user.avatar!} className='rounded-md' alt='user-detail' width={250} height={250} />
            </div>
            <div className='flex flex-col md:flex-row gap-0 md:gap-10 [&>div>div]:mb-3 [&>div>div>span]:text-sm'>
                <div>
                    <div>
                        <BlockLabel>Name</BlockLabel>
                        <BlockParagraph>{user.name}</BlockParagraph>
                    </div>
                    <div>
                        <BlockLabel>Username</BlockLabel>
                        <BlockParagraph>{user.username}</BlockParagraph>
                    </div>
                    <div>
                        <BlockLabel>Email</BlockLabel>
                        <BlockParagraph>{user.email}</BlockParagraph>
                    </div>
                    <div>
                        <BlockLabel>Verified at</BlockLabel>
                        <BlockParagraph>{user.verified}</BlockParagraph>
                    </div>
                </div>
                <div>
                    <div>
                        <BlockLabel>Joined</BlockLabel>
                        <BlockParagraph>{user.joined}</BlockParagraph>
                    </div>
                    <div>
                        <BlockLabel>Last Updated Account</BlockLabel>
                        <BlockParagraph>{user.last_updated_account}</BlockParagraph>
                    </div>
                    <div>
                        <BlockLabel>Last Updated Password</BlockLabel>
                        <BlockParagraph>{user.last_updated_password}</BlockParagraph>
                    </div>
                </div>
            </div>
        </div>
    );
};

const BlockLabel: React.FC<React.HTMLAttributes<HTMLSpanElement>> = ({ children, className, ...props }) => {
    return (
        <span className={cn('text-muted-foreground', className)} {...props}>
            {children}
        </span>
    );
};

const BlockParagraph: React.FC<React.HTMLAttributes<HTMLParagraphElement>> = ({ children, className, ...props }) => {
    return (
        <p className={cn('font-medium text-foreground', className)} {...props}>
            {children}
        </p>
    );
};
