const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  permissions: state => state.user.permissions,
  language: state=>state.lang.language,
  locales:state=>state.lang.locals,
  locale:state=>state.lang.language,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  accessRoutes: state=>state.permission.routes
}
export default getters
