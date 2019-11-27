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