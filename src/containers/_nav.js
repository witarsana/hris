export default [
  {
    _name: 'CSidebarNav',
    _children: [
      {
        _name: 'CSidebarNavItem',
        name: 'Dashboard',
        to: '/dashboard',
        icon: 'cil-speedometer',
        
      },
      
      
      {
        _name: 'CSidebarNavTitle',
        _children: ['Employee']
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Master Data',
        route: '/bpjs-rates',
        icon: 'cil-puzzle',
        items: [
          {
            name: 'BPJS Rates',
            to: '/bpjs-rates',
            icon : 'cil-star'
          },
          {
            name: 'PTKP Status',
            to: '/ptkp-status',
            icon : 'cil-star'
          },
          {
            name: 'Training Type',
            to: '/training-type',
            icon : 'cil-star'
          },
          {
            name: 'National Holiday',
            to: '/national-holiday',
            icon : 'cil-star'
          },
          {
            name: 'Salary Master Data',
            to: '/salary-master-data',
            icon : 'cil-star'
          },
          {
            name: 'Employee Type',
            to: '/employee-type',
            icon : 'cil-star'
          },
          
        ]
      },
      {
        _name: 'CSidebarNavDropdown',
        name: 'Employee',
        route: '/buttons',
        icon: 'cil-user',
        items: [
          
        ]
      },
      {
        _name: 'CSidebarNavTitle',
        _children: ['User']
      },
      {
        _name: 'CSidebarNavDivider',
        _class: 'm-2'
      },
      
      
      
    ]
  }
]