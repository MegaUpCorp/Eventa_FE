import React from 'react';
import { Link } from 'react-router-dom';
import { cn } from 'src/lib/utils';
import {
  ActivitySquare,
  Calendar,
  CreditCard,
  Layout,
  Settings,
  Users,
} from 'lucide-react';
import { Button } from 'src/components/ui/button';

interface AdminNavProps extends React.HTMLAttributes<HTMLElement> {
  isCollapsed: boolean;
}

export function AdminNav({ isCollapsed, className }: AdminNavProps) {
  const routes = [
    {
      icon: Layout,
      title: 'Dashboard',
      href: '/admin',
    },
    {
      icon: Users,
      title: 'Users',
      href: '/admin/users',
    },
    {
      icon: ActivitySquare,
      title: 'Events',
      href: '/admin/events',
    },
    {
      icon: Calendar,
      title: 'Calendars',
      href: '/admin/calendars',
    },
    {
      icon: CreditCard,
      title: 'Transactions',
      href: '/admin/transactions',
    },
    {
      icon: Settings,
      title: 'Settings',
      href: '/admin/settings',
    },
  ];

  return (
    <div
      data-collapsed={isCollapsed}
      className={cn(
        'group border-r py-2 h-full data-[collapsed=true]:py-2',
        className
      )}
    >
      <nav className="grid gap-1 px-2 group-[[data-collapsed=true]]:justify-center">
        {routes.map((route) => (
          <Link key={route.href} to={route.href}>
            <Button
              variant="ghost"
              size="sm"
              className={cn(
                'w-full justify-start gap-2',
                isCollapsed && 'justify-center'
              )}
            >
              <route.icon className="h-4 w-4" />
              {!isCollapsed && <span>{route.title}</span>}
            </Button>
          </Link>
        ))}
      </nav>
    </div>
  );
}