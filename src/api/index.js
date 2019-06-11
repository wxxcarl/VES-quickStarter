import ajax from './config'
let [_get, _post] = [ajax.get, ajax.post]

export const userLogin = pms => _post('/login/login', pms)
export const userLogout = () => _post('/login/logout')
