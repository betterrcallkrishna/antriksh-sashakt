'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BarChart3, Settings, CheckCircle2, Activity } from 'lucide-react';

const navItems = [
  { href: '/', label: 'Dashboard', icon: Activity },
  { href: '/procedures', label: 'Procedures', icon: CheckCircle2 },
  { href: '/telemetry', label: 'Telemetry', icon: BarChart3 },
  { href: '/settings', label: 'Settings', icon: Settings },
];

export default function Navigation() {
  const pathname = usePathname();

  return (
    <nav className="border-b border-slate-700 bg-slate-800">
      <div className="max-w-7xl mx-auto px-4 flex gap-8">
        {navItems.map(({ href, label, icon: Icon }) => {
          const isActive = pathname === href;
          return (
            <Link
              key={href}
              href={href}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
                isActive
                  ? 'border-blue-500 text-blue-400'
                  : 'border-transparent text-slate-400 hover:text-slate-300'
              }`}
            >
              <Icon className="w-4 h-4" />
              {label}
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
