import * as icons from '@tabler/icons-react';

export interface TablerIconProps extends Partial<Omit<React.SVGProps<SVGSVGElement>, 'stroke'>> {
    size?: string | number;
    stroke?: string | number;
}

export type TablerIconType = keyof typeof icons;
