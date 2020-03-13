export interface HomeRoutes {
  index: string
}

export interface ApplicationRoutes {
  index: string
  products: string
  eating: string
}

export interface RootRoutes {
  home: HomeRoutes,
  app: ApplicationRoutes
}

const routes: RootRoutes = {
  home: {
    index: '/'
  },
  app: {
    index: '/app',
    products: '/app/products',
    eating: '/app/eating'
  }
};

export default routes;