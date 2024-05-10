import * as icons from '@tabler/icons-react';
import * as React from 'react';

import { cn } from '@/lib/utils';
import type { TablerIconProps, TablerIconType } from '@/types/tabler-icon';

interface IconProps extends TablerIconProps {
    className?: string;
    name: TablerIconType;
}

const Icon = React.forwardRef<SVGSVGElement, IconProps>(({ className, name, ...props }, ref) => {
    const TablerIcon: React.FC<TablerIconProps> = icons[name] as React.FC<TablerIconProps>;
    return <TablerIcon className={cn('size-5 stroke-[1.5]', className)} ref={ref} {...props} />;
});

Icon.displayName = 'Icon';

export { Icon };
