const mainSideBar = [
    { text: 'Project Overview', link: '/' },
    { text: 'Setting the project up', link: '/build/gettingSetUp' },
    { text: 'Composables', link: '/build/composables' },
    { text: 'Authentication', link: '/build/authentication' },
    { text: 'New Project View', link: '/build/newProjectView' },
    { text: 'Team Projects View', link: '/build/projectListView' },
    { text: 'Setting up a route guard', link: '/build/routeGuard' },
    { text: 'Single Project View', link: '/build/singleProjectView' },
    { text: 'Firestore Rules', link: '/build/firestoreRules' },
    { text: 'Project Tasks', link: '/build/projectTasks' },
    { text: 'Firestore Queries', link: '/build/firestoreQueries' }
]


module.exports = {
    title: 'ProDev Documentation',
    description: 'Just playing around',
    themeConfig: {
        nav: [
            { text: 'Live App', link: '' }
         ],
        sidebar: {
            '/index': mainSideBar,
            '/build/': mainSideBar
            
        },
        displayAllHeaders: true
      }
  }


