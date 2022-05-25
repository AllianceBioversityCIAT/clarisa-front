import { NbMenuItem } from '@nebular/theme';

export const MENU_ITEMS: NbMenuItem[] = [
  {
    title: 'Users',
    icon: 'home-outline',
    link: '/home/users',
    home: true,
  },
  {
    title: 'Roles',
    icon: 'people-outline',
    link: '/home/roles',
  }, 
  {
    title: 'Permissions',
    icon: 'lock-outline',
    link: '/home/permissions',
  },
  {
    title: 'Institutions',   
    children: [
      {
        title: 'Manage Institutions',
        icon: 'briefcase-outline',
        link: '/home/institutions',
      },
      {
        title: ' Manage Duplicated',
        icon: 'briefcase-outline',
        link: '/home/duplicated-institutions',
      }
    ]
  },
  
]