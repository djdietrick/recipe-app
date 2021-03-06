
const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('pages/Auth.vue')
  },
  {
    path: '/install',
    name: 'Install',
    component: () => import('pages/Install.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        name: 'recipes',
        path: 'recipes/:id?', 
        component: () => import('pages/recipes/BaseRecipes.vue'),
      },
      {
        path: 'lists/:id?',
        component: () => import('pages/lists/BaseLists.vue')
      },
      {
        path: '/',
        redirect: {name: 'recipes'}
      }
    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes
