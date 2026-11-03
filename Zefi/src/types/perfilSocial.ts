/** Dados sociais do perfil guardados no navegador (a API ainda não tem esses campos) */
export interface PerfilSocial {
  bio: string;
  /** Foto em formato data URL (já redimensionada) ou null quando não há foto */
  foto: string | null;
}

export const LIMITE_BIO = 160;
