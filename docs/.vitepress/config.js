const mainSideBar = [
    { text: 'Project Overview', link: '/' },
    { text: 'Setting the project up', link: '/build/gettingSetUp' },
    { text: 'Main Dashboard', link: '/build/dashboard' },
    { text: 'Composables Breakdown', link: '/build/composables' },
    { text: 'Authentication', link: '/build/authentication' },
    { text: 'New Project View', link: '/build/newProjectView' },
    { text: 'Projects View', link: '/build/projectListView' },
    { text: 'Firestore Queries', link: '/build/firestoreQueries' },
    { text: 'Single Project View', link: '/build/singleProjectView' },
    { text: 'Firebase Rules', link: '/build/firebaseRules' },
    { text: 'Project Tasks', link: '/build/projectTasks' },
    { text: 'New Bug View', link: '/build/newBug' },
    { text: 'Bug Journal View', link: '/build/bugJournalView' },
    { text: 'Single Bug View', link: '/build/singleBugView' },
    { text: 'New Chat Form', link: '/build/newChatForm' },
    { text: 'Chat Window', link: '/build/chatWindow' },
    { text: 'Deployment', link: '/build/deployment' },
]


module.exports = {
    title: 'ProDev - Build Guide',
    description: 'A break down of the project build process',
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


