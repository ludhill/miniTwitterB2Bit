import { useState } from 'react';
import { PaginaAutenticacao } from './paginas/Autenticacao';
import { PaginaFeed } from './paginas/Feed';

/**
 * COMPONENTE PRINCIPAL (MAESTRO)
 * Gerencia o estado global de autenticação e o roteamento entre Feed e Login.
 */
export default function App() {
  // Inicializa o estado lendo o localStorage apenas UMA vez (Performance)
  const [estaLogado, setEstaLogado] = useState<boolean>(() => !!localStorage.getItem('token'));
  
  // Controla se a tela de login deve ser sobreposta à Timeline (Modo Visitante)
  const [exibirLogin, setExibirLogin] = useState<boolean>(false);

  /**
   * Remove as credenciais e reinicia o estado da aplicação.
   */
  const manipularLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuarioId');
    setEstaLogado(false);
    setExibirLogin(false);
    window.location.reload();
  };

  /**
   * LÓGICA DE NAVEGAÇÃO:
   * Se o usuário clicou para 'Entrar' e não possui sessão, redireciona para Autenticação.
   * Caso contrário, mantém o Feed sempre visível (Modo Público).
   */
  if (exibirLogin && !estaLogado) {
    return (
      <PaginaAutenticacao 
        aoLogar={() => {
          setEstaLogado(true);
          setExibirLogin(false);
        }} 
      />
    );
  }

  return (
    <main className="min-h-screen bg-[#0b0e14]">
      <PaginaFeed 
        aoSair={manipularLogout} 
        aoClicarLogin={() => setExibirLogin(true)} 
      />
    </main>
  );
}