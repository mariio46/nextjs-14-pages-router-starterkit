import { cn } from '@/lib/utils';
import type { TablerIconProps, TablerIconType } from '@/types/tabler-icon';
import * as icons from '@tabler/icons-react';

interface IconProps extends TablerIconProps {
    className?: string;
    name: TablerIconType;
}

export const Icon = ({ className, name, ...props }: IconProps) => {
    const TablerIcon = icons[name] as React.FC<TablerIconProps>;
    return <TablerIcon className={cn('size-5 stroke-[1.5]', className)} {...props} />;
};
