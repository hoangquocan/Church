import NavbarLinksGroup from '../NavbarLinksGroup/NavbarLinksGroup'
const mockdata = [
  { label: 'Home Page', icon: 'home-outline' },
  {
    label: 'Member',
    icon: 'person-outline',
    links: [
      { label: 'View Members', to: '/members' },
      { label: 'New Member', to: '/member/new' },
    ],
  },
  {
    label: 'Group',
    icon: 'people-outline',
    links: [
      { label: 'View Groups', to: '/groups' },
      { label: 'New Group', to: '/groups/new' },
    ],
  },
  {
    label: 'Activitiy',
    icon: 'pulse-outline',
    links: [
      { label: 'View Activities', to: '/activities' },
      { label: 'New Activity', to: '/activities/new' },
      { label: 'New Multi Activities', to: '/activities/new-multi-activities' },
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
    ],
  },
]
const links = mockdata.map((item) => (
  <NavbarLinksGroup key={item.label} {...item} />
))
const NavbarNested = () => {
  return <div className='navbarlinks'>{links}</div>
}

export default NavbarNested
