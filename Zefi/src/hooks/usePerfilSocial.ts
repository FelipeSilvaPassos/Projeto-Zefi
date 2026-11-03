import { useCallback, useState } from 'react';
import type { PerfilSocial } from '../types/perfilSocial.ts';

const VAZIO: PerfilSocial = { bio: '', foto: null };

const chaveDe = (cpf: string) => `zefi:perfil-social:${cpf}`;

function ler(cpf: string): PerfilSocial {
  try {
    const salvo = localStorage.getItem(chaveDe(cpf));
    return salvo ? { ...VAZIO, ...(JSON.parse(salvo) as Partial<PerfilSocial>) } : VAZIO;
  } catch {
    return VAZIO;
  }
}

/** Bio e foto do usuário, guardadas no localStorage (por CPF) */
export function usePerfilSocial(cpf: string) {
  const [perfil, setPerfil] = useState<PerfilSocial>(() => ler(cpf));

  const salvar = useCallback(
    (novo: PerfilSocial): boolean => {
      setPerfil(novo);
      try {
        localStorage.setItem(chaveDe(cpf), JSON.stringify(novo));
        return true;
      } catch {
        // Armazenamento cheio ou bloqueado: o perfil vale só nesta visita
        return false;
      }
    },
    [cpf],
  );

  return { perfil, salvar };
}
