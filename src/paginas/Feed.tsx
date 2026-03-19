import { useState, useEffect } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { LogOut, Image as ImageIcon, X, Bird, Search } from 'lucide-react';
import api from '../servicos/api';
import { CartaoPost } from '../componentes/CartaoPost';
import type { AxiosError } from 'axios';


interface Post {
  id: number;
  title: string;
  content: string;
  image: string | null;
  authorId: number;
  authorName: string;
  likesCount: number;
}

export function PaginaFeed({ 
  aoSair, 
  aoClicarLogin 
}: { 
  aoSair: () => void; 
  aoClicarLogin: () => void; 
}) {
  const queryClient = useQueryClient();
  const [busca, setBusca] = useState('');
  const [termoDebounced, setTermoDebounced] = useState('');
  const [novoPost, setNovoPost] = useState('');
  const [imagemSelecionada, setImagemSelecionada] = useState<File | null>(null);
  
  const token = localStorage.getItem('token');
  const meuId = localStorage.getItem('usuarioId');
  const chaveLikes = `likes_user_${meuId || 'guest'}`;

  //  (Requisito 5)
  useEffect(() => {
    const timer = setTimeout(() => setTermoDebounced(busca), 500);
    return () => clearTimeout(timer);
  }, [busca]);

  //  (Requisito 4, 5 e 10)
  const { data: posts = [], isLoading, isError } = useQuery({
    queryKey: ['posts', termoDebounced],
    queryFn: async () => {
      /** * NOTA TÉCNICA: Integração com o Requisito 5 (Busca via Query Param).
     * Identificou-se via análise do JSON da API que o backend filtra os resultados 
     * estritamente pelo campo 'title'. Conteúdos presentes apenas no 'content' 
     * são ignorados pelo servidor no parâmetro ?search=.
     */
      const resposta = await api.get('/posts/', {
        params: { search: termoDebounced } // Envia ?search= para a API
      });
      return resposta.data.posts || [];
    },
  });
 
  const [meusLikes, setMeusLikes] = useState<number[]>(() => {
    const salvos = localStorage.getItem(chaveLikes);
    return salvos ? JSON.parse(salvos) : [];
  });

  useEffect(() => {
    localStorage.setItem(chaveLikes, JSON.stringify(meusLikes));
  }, [meusLikes, chaveLikes]);

  const atualizarFeed = () => queryClient.invalidateQueries({ queryKey: ['posts'] });

  async function manipularCurtida(id: number) {
    try {
      await api.post(`/posts/${id}/like`);
      setMeusLikes(atuais => atuais.includes(id) ? atuais.filter(x => x !== id) : [...atuais, id]);
      atualizarFeed();
    } catch (erro) {
      console.error("Erro ao curtir:", erro);
    }
  }

  async function aoPostar(e: React.FormEvent) {
    e.preventDefault();
    if (!novoPost.trim()) return;

    try { 
      const formData = new FormData();
      formData.append('title', novoPost.substring(0, 30));
      formData.append('content', novoPost);
      
      if (imagemSelecionada) {
        formData.append('image', imagemSelecionada);  
      } 
      
      await api.post('/posts/', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });

      setNovoPost('');
      setImagemSelecionada(null);
      atualizarFeed();
    } catch (erro) {
      console.error("Erro ao postar:", erro);
      alert('Erro ao criar publicação.');
    }
  }

  async function manipularExclusao(id: number) {
    if (!window.confirm("Deseja excluir?")) return;
    try {
      await api.delete(`/posts/${id}`);
      atualizarFeed();
    } catch (erro) { 
      alert("Erro ao excluir.");
      console.error(erro);
    }
  }

  async function manipularEdicao(id: number, conteudoAntigo: string) {
    const novo = window.prompt("Editar publicação:", conteudoAntigo);
    if (novo && novo !== conteudoAntigo) {
      try {
        await api.patch(`/posts/${id}`, { title: novo.substring(0, 30), content: novo });
        atualizarFeed();
      } catch (e) {
        alert("O servidor recusou a alteração.");
        console.error("Erro do servidor:", (e as AxiosError).response?.data);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#0b0e14] text-white"> 
      <nav className="sticky top-0 z-10 bg-[#0b0e14]/80 backdrop-blur-md border-b border-gray-800 p-4">
        <div className="max-w-2xl mx-auto flex justify-between items-center gap-4">
          <div className="flex items-center gap-2 shrink-0">
            <Bird className="text-[#1d9bf0]" size={28} />
            <span className="font-bold text-xl tracking-tight text-[#1d9bf0] hidden sm:inline">Mini Twitter</span>
          </div>

          <div className="flex-1 relative max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
            <input 
              type="text"
              placeholder="Buscar posts..."
              className="w-full bg-[#1e232e] border border-gray-700 rounded-full py-2 pl-10 pr-4 text-sm focus:outline-none focus:border-[#1d9bf0]"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
            />
          </div>

          <button 
            onClick={token ? aoSair : aoClicarLogin} 
            aria-label={token ? "Sair da conta" : "Entrar no sistema"}
            className="..."
          >
            <span className="hidden sm:inline">{token ? 'Sair' : 'Entrar'}</span>
            <LogOut size={20} />
          </button>
        </div>
      </nav>

      <main className="max-w-2xl mx-auto p-4">
      {token && (
        <form onSubmit={aoPostar} className="bg-[#151921] border border-gray-800 rounded-2xl p-6 mb-8 text-left">
          <textarea 
            placeholder="O que está rolando?"
            className="w-full bg-transparent border-none text-xl focus:outline-none resize-none mb-4 placeholder-gray-600"
            rows={3}
            value={novoPost}
            onChange={(e) => setNovoPost(e.target.value)}
          />
 
          {imagemSelecionada && (
            <div className="flex items-center gap-2 mb-4 p-2 bg-[#0b0e14] rounded-lg w-fit border border-gray-800">
              <span className="text-xs text-gray-400 truncate max-w-[200px]">
                {imagemSelecionada.name}
              </span>
              <button 
                type="button" 
                onClick={() => setImagemSelecionada(null)} 
                className="text-red-500 hover:text-red-400"
              >
                <X size={16} />.
              </button>
            </div>
          )}

          <div className="flex justify-between items-center border-t border-gray-800 pt-4">
            <label 
              className="text-[#1d9bf0] hover:bg-blue-500/10 p-2 rounded-full transition-all cursor-pointer flex items-center justify-center" 
              title="Anexar imagem"
              aria-label="Selecionar imagem para o post" 
            >
              <ImageIcon size={24} />
              <input 
                type="file" 
                className="hidden" 
                accept="image/*" 
                onChange={(e) => {
                  const arquivo = e.target.files?.[0];
                  if (arquivo && arquivo.size <= 5 * 1024 * 1024) {
                    setImagemSelecionada(arquivo);
                  } else if (arquivo) {
                    alert("A imagem deve ter no máximo 5MB.");
                  }
                }} 
              />
            </label>
            <button 
              type="submit" 
              className="bg-[#1d9bf0] hover:bg-[#1a8cd8] px-6 py-2 rounded-full font-bold transition-all disabled:opacity-50" 
              disabled={!novoPost.trim()}
            >
              Postar
            </button>
          </div>
        </form>
      )}

        {isLoading && <p className="text-center py-10 animate-pulse">Carregando timeline...</p>}
        {isError && <p className="text-center py-10 text-red-500">Erro ao carregar dados.</p>}

        <div className="space-y-4">
          {posts.map((post: Post) => (
            <CartaoPost 
              key={post.id}
              id={post.id.toString()}
              titulo={post.title}
              autor={post.authorName}
              usuario={post.authorName.toLowerCase().replace(/\s/g, '')}
              data="19 Mar"
              conteudo={post.content}
              imagem={post.image || undefined}
              likes={post.likesCount}
              curtido={meusLikes.includes(post.id)}
              podeInteragir={!!token}  
              eMeuPost={!!token && post.authorId.toString() === meuId}
              aoCurtir={() => manipularCurtida(post.id)}
              aoExcluir={() => manipularExclusao(post.id)}
              aoEditar={() => manipularEdicao(post.id, post.content)}
            />
          ))}
        </div>
      </main>
    </div>
  );
}