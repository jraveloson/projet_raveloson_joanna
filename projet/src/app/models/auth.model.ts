export interface AuthState {
    token: string | null;
    utilisateur: UtilisateurInfo | null;
}

export interface UtilisateurInfo {
    id: number;
    nom: string;
    prenom: string;
    login: string;
}

export interface LoginCredentials {
    login: string;
    password: string;
}

export interface LoginResponse {
    token: string;
    utilisateur: UtilisateurInfo;
}
