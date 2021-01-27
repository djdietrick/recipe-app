
const routes = [
  {
    path: '/auth',
    name: 'Auth',
    component: () => import('pages/Auth.vue')
  },
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { 
        path: 'recipes/:id?', 
        component: () => import('pages/recipes/BaseRecipes.vue'),
        // children: [
        //   {
        //     path: ':id',
        //     name: 'RecipeDetails',
        //     component: () => import('components/recipes/RecipeDetails.vue'),
        //     props: route => ({id: route.params.id})
        //   }
        // ]  
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
