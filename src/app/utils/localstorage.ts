export class LocalStorageUtils {

    public salvarDadosLocaisUsuario(response: any) {
        this.salvarTokenUsuario(response.token);
        this.salvarUsuario(response.user);
    }

    public limparDadosLocaisUsuario() {
        sessionStorage.removeItem('rype.token');
        sessionStorage.removeItem('rype.user');
    }

    public obterTokenUsuario(): any {
        return sessionStorage.getItem('rype.token');
    }
    public obertUser(): any {
        return sessionStorage.getItem('rype.user');
    }

    public salvarTokenUsuario(token: string) {
        sessionStorage.setItem('rype.token', token);
    }

    public salvarUsuario(user: string) {
        sessionStorage.setItem('rype.user', JSON.stringify(user));
    }

}