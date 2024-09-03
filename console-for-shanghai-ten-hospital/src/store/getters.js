const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  department: state => state.app.department,
  hospital: state => state.app.hospital,
  token: state => state.user.token,
  roles: state => state.user.roles,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  permission_routes: state => state.permission.routes
}
export default getters
