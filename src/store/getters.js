const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  language: state=>state.lang.language,
  locales:state=>state.lang.locals,
  locale:state=>state.lang.language,
  avatar: state => state.user.avatar,
  name: state => state.user.name
}
export default getters
