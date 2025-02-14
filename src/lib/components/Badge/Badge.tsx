import classNames from 'classnames';
import type { ComponentProps, FC, PropsWithChildren } from 'react';
import type { FlowbiteColors, FlowbiteSizes } from '../Flowbite/FlowbiteTheme';
import { useTheme } from '../Flowbite/ThemeContext';

export interface FlowbiteBadgeTheme {
  base: string;
  color: BadgeColors;
  href: string;
  icon: {
    off: string;
    on: string;
    size: BadgeSizes;
  };
  size: BadgeSizes;
}

export interface BadgeColors
  extends Pick<FlowbiteColors, 'failure' | 'gray' | 'indigo' | 'info' | 'pink' | 'purple' | 'success'> {
  [key: string]: string;
}

export interface BadgeSizes extends Pick<FlowbiteSizes, 'xs' | 'sm'> {
  [key: string]: string;
}

export interface BadgeProps extends PropsWithChildren<Omit<ComponentProps<'span'>, 'color'>> {
  color?: keyof BadgeColors;
  href?: string;
  icon?: FC<ComponentProps<'svg'>>;
  size?: keyof BadgeSizes;
}

export const Badge: FC<BadgeProps> = ({
  children,
  color = 'info',
  href,
  icon: Icon,
  size = 'xs',
  className,
  ...props
}): JSX.Element => {
  const theme = useTheme().theme.badge;

  const Content = (): JSX.Element => (
    <span
      className={classNames(
        theme.base,
        theme.color[color],
        theme.icon[Icon ? 'on' : 'off'],
        theme.size[size],
        className,
      )}
      data-testid="flowbite-badge"
      {...props}
    >
      {Icon && <Icon aria-hidden className={theme.icon.size[size]} data-testid="flowbite-badge-icon" />}
      {children && <span>{children}</span>}
    </span>
  );

  return href ? (
    <a className={theme.href} href={href}>
      <Content />
    </a>
  ) : (
    <Content />
  );
};
