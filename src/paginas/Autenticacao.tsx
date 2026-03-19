import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Mail, Lock, User, Bird } from 'lucide-react';
import api from '../servicos/api';
import { EntradaTexto } from '../componentes/EntradaTexto';
 
const esquemaSchema = z.object({
  nome: z.string().min(2, "O nome deve ter pelo menos 2 caracteres").optional().or(z.literal('')),
  email: z.string().email("Insira um e-mail válido"),
  senha: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

type DadosForm = z.infer<typeof esquemaSchema>;

interface PropriedadesAutenticacao {
  aoLogar: () => void;
}
 
export function PaginaAutenticacao({ aoLogar }: PropriedadesAutenticacao) {
  const [abaAtiva, setAbaAtiva] = useState<'login' | 'cadastro'>('login');
  
  const { 
    register, 
    handleSubmit, 
    formState: { errors, isSubmitting },
    reset 
  } = useForm<DadosForm>({
    resolver: zodResolver(esquemaSchema)
  });

  const aoSubmeter = async (dados: DadosForm) => {
    try {
      if (abaAtiva === 'cadastro') {
        await api.post('/auth/register', { 
          name: dados.nome, 
          email: dados.email, 
          password: dados.senha 
        });
        alert('Cadastro realizado! Agora você pode entrar.');
        setAbaAtiva('login');
        reset();
      } else {
        const resposta = await api.post('/auth/login', { 
          email: dados.email, 
          password: dados.senha 
        });
        
        const { token, user } = resposta.data;
        localStorage.setItem('token', token);
        localStorage.setItem('usuarioId', user.id.toString());
        aoLogar();
      }
    } catch (erro: unknown) {
      console.error("Erro na autenticação:", erro);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b0e14] flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md bg-[#151921] rounded-3xl p-8 border border-gray-800 shadow-2xl">
        
        <div className="flex justify-center mb-8">
          <div className="flex items-center gap-2 text-[#1d9bf0]">
            <Bird size={40} strokeWidth={2.5} />
            <span className="text-2xl font-black tracking-tighter">Mini Twitter</span>
          </div>
        </div>
        
        <div className="flex bg-[#0b0e14] p-1 rounded-xl mb-8 border border-gray-800">
          <button 
            type="button"
            onClick={() => { setAbaAtiva('login'); reset(); }} 
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${abaAtiva === 'login' ? 'bg-[#151921] text-[#1d9bf0]' : 'text-gray-500'}`}
          >Login</button>
          <button 
            type="button"
            onClick={() => { setAbaAtiva('cadastro'); reset(); }} 
            className={`flex-1 py-2 rounded-lg font-medium transition-all ${abaAtiva === 'cadastro' ? 'bg-[#151921] text-[#1d9bf0]' : 'text-gray-500'}`}
          >Cadastro</button>
        </div>

        <form onSubmit={handleSubmit(aoSubmeter)} className="space-y-4 text-left">
          {abaAtiva === 'cadastro' && (
            <div>
              <EntradaTexto 
                rotulo="Nome" 
                icone={<User size={20}/>} 
                {...register("nome")} 
              />
              {errors.nome && <span className="text-red-500 text-xs ml-1">{errors.nome.message}</span>}
            </div>
          )}

          <div>
            <EntradaTexto 
              rotulo="E-mail" 
              icone={<Mail size={20}/>} 
              type="email"
              {...register("email")}
            />
            {errors.email && <span className="text-red-500 text-xs ml-1">{errors.email.message}</span>}
          </div>

          <div>
            <EntradaTexto 
              rotulo="Senha" 
              icone={<Lock size={20}/>} 
              type="password"
              {...register("senha")}
            />
            {errors.senha && <span className="text-red-500 text-xs ml-1">{errors.senha.message}</span>}
          </div>
          
          <button 
            type="submit" 
            disabled={isSubmitting} 
            className="w-full bg-[#1d9bf0] py-4 rounded-xl font-bold text-white transition-all disabled:opacity-50 mt-4"
          >
            {isSubmitting ? 'Verificando...' : abaAtiva === 'login' ? 'Entrar' : 'Criar Conta'}
          </button>
        </form>
      </div>
    </div>
  );
}