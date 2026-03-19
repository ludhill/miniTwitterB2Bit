import { Heart, Trash2, Edit3 } from 'lucide-react';

interface PropriedadesPost {
  id: string;
  titulo: string;
  autor: string;
  usuario: string;
  data: string;
  conteudo: string;
  imagem?: string;
  curtido: boolean;
  likes: number;
  eMeuPost: boolean;
  podeInteragir: boolean; 
  aoCurtir: () => void;
  aoExcluir: () => void;
  aoEditar: () => void;
}

export function CartaoPost({ 
  titulo, autor, usuario, data, conteudo, imagem, curtido, likes, 
  eMeuPost, podeInteragir, aoCurtir, aoExcluir, aoEditar
}: PropriedadesPost) {

  const avisarNecessidadeLogin = () => {
    alert("Você precisa estar logado para interagir com as publicações!");
  };

  return (
    <div className="bg-[#151921] border border-gray-800 rounded-2xl p-6 mb-4 text-left shadow-sm hover:bg-[#1a1f29] transition-all">
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-3 w-full">
          <div className="w-12 h-12 bg-gray-700 rounded-full flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="font-bold text-white truncate">{autor}</span>
              <span className="text-gray-500 text-sm">@{usuario} · {data}</span>
            </div>
            <h3 className="text-[#1d9bf0] font-bold text-lg mt-2 uppercase tracking-wider">
              {titulo}
            </h3>
            <p className="text-gray-200 mt-2 leading-relaxed whitespace-pre-wrap break-words">{conteudo}</p>
          </div>
        </div>
 
        {eMeuPost && podeInteragir && (
          <div className="flex gap-3 text-gray-500 ml-2">
            <button onClick={aoEditar} aria-label="Editar" className="hover:text-blue-400 transition-colors">
              <Edit3 size={18} />
            </button>
            <button onClick={aoExcluir} aria-label="Excluir" className="hover:text-red-400 transition-colors">
              <Trash2 size={18} />
            </button>
          </div>
        )}
      </div>

      {imagem && (
        <div className="mt-4 rounded-xl overflow-hidden border border-gray-800 ml-15">
          <img src={imagem} alt="Post" className="w-full object-cover max-h-96" />
        </div>
      )}

      <div className="mt-4 flex items-center gap-2 ml-15">
        <button 
          onClick={podeInteragir ? aoCurtir : avisarNecessidadeLogin}
          className={`flex items-center gap-2 transition-colors ${!podeInteragir ? 'opacity-50 cursor-not-allowed' : ''} ${curtido ? 'text-red-500' : 'text-gray-500 hover:text-red-400'}`}
        >
          <Heart size={20} fill={curtido ? "currentColor" : "none"} />
          <span className="text-sm font-medium">{likes}</span>
        </button>
      </div>
    </div>
  );
}