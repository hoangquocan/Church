import NavbarLinksGroup from '../NavbarLinksGroup/NavbarLinksGroup'
const mockdata = [
  { label: 'Home Page', icon: 'home-outline' },
  {
    label: 'Member',
    icon: 'person-outline',
    links: [
      { label: 'View Members', to: '/members' },
      { label: 'New Member', to: '/members/new' },
      // { label: 'Member View', to: 'routes.' },
    ],
  },
  {
    label: 'Group',
    icon: 'people-outline',
    links: [
      { label: 'View Groups', to: '/groups' },
      { label: 'New Group', to: '/groups/new' },
      // { label: 'Member View', to: 'routes.' },
    ],
  },
  {
    label: 'Activitiy',
    icon: 'pulse-outline',
    links: [
      { label: 'View Activities', to: '/activities' },
      { label: 'New Activity', to: '/activities/new' },
    ],
  },
  {
    label: 'Attendance',
    icon: 'timer-outline',
    links: [
      { label: 'View Attendanced', to: '/attendanced' },
      { label: 'Make Attendance', to: '/attendance' },
    ],
  },
  {
    label: 'Report',
    icon: 'stats-chart-outline',
    links: [
      { label: 'View Reports', to: '/reports' },
      { label: 'Create Report', to: '/report-create' },
      // { label: 'View Attendanced', to: '/attendanced' },
    ],
  },
  // {
  //   label: 'Admin',
  //   icon: 'construct-outline',
  //   links: [
  //     { label: 'Set UserRole', to: '/admin' },
  //     { label: 'View Attendanced', to: '/attendanced' },
  //   ],
  // },
  // {
  //   label: 'Manager',
  //   icon: 'build-outline',
  //   links: [
  //     { label: 'Create Questions', to: '/manager/create-question' },
  //     { label: 'View Questions', to: '/manager/questions' },
  //     { label: 'View Questions', to: '/manager/questions' },
  //   ],
  // },
]
const links = mockdata.map((item) => (
  <NavbarLinksGroup key={item.label} {...item} />
))
const NavbarNested = () => {
  return <div className='navbarlinks'>{links}</div>
}

export default NavbarNested
