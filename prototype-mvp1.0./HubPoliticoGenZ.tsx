import React, { useState, useEffect } from 'react';
import { CheckCircle, AlertTriangle, Book, Award, Users, MessageSquare, Search, Menu, X, Play, Share2, ThumbsUp, Clock, Target, TrendingUp } from 'lucide-react';

const { useStoredState, useUser } = hatch;

const HubPoliticoGenZ = () => {
  const [activeTab, setActiveTab] = useState('home');
  const [userPoints, setUserPoints] = useStoredState('userPoints', 0);
  const [completedLessons, setCompletedLessons] = useStoredState('completedLessons', []);
  const [checkedContent, setCheckedContent] = useStoredState('checkedContent', []);
  const [menuOpen, setMenuOpen] = useState(false);
  const [currentLesson, setCurrentLesson] = useState(null);
  const [verificationResult, setVerificationResult] = useState(null);
  const [searchText, setSearchText] = useState('');
  const user = useUser();

  // Simulated lessons data
  const lessons = [
    {
      id: 1,
      title: "Como Funciona o Sistema Eleitoral?",
      duration: "2 min",
      points: 10,
      category: "Fundamentos",
      thumbnail: "keys/electoral-system?prompt=Modern%20colorful%20illustration%20of%20Brazilian%20electoral%20system%20with%20voting%20boxes%20and%20democracy%20symbols",
      completed: completedLessons.includes(1)
    },
    {
      id: 2,
      title: "Fake News vs. Fatos: Como Identificar",
      duration: "3 min",
      points: 15,
      category: "Verificação",
      thumbnail: "keys/fake-news-detection?prompt=Digital%20illustration%20showing%20fake%20news%20detection%20with%20magnifying%20glass%20and%20fact-check%20symbols",
      completed: completedLessons.includes(2)
    },
    {
      id: 3,
      title: "Orçamento Público: Para Onde Vai Seu Dinheiro?",
      duration: "4 min",
      points: 20,
      category: "Políticas Públicas",
      thumbnail: "keys/public-budget?prompt=Infographic%20style%20illustration%20of%20public%20budget%20allocation%20with%20coins%20and%20government%20services",
      completed: completedLessons.includes(3)
    },
    {
      id: 4,
      title: "Mobilidade Urbana: Decisões que Te Afetam",
      duration: "3 min",
      points: 15,
      category: "Local",
      thumbnail: "keys/urban-mobility?prompt=Modern%20city%20transportation%20illustration%20with%20buses%20bikes%20and%20metro%20systems",
      completed: completedLessons.includes(4)
    }
  ];

  // Simulated fact-checking
  const checkContent = async (content) => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    const fakeNewsKeywords = ['milagre', 'secreto', 'descoberta chocante', 'médicos odeiam'];
    const isFakeNews = fakeNewsKeywords.some(keyword => 
      content.toLowerCase().includes(keyword)
    );
    
    const result = {
      id: Date.now(),
      content: content,
      status: isFakeNews ? 'false' : 'verified',
      confidence: isFakeNews ? 85 : 92,
      sources: isFakeNews ? [] : ['TSE', 'Gov.br', 'Comprova'],
      explanation: isFakeNews 
        ? "Conteúdo apresenta características típicas de desinformação. Recomendamos verificar fontes oficiais."
        : "Informação verificada em fontes oficiais confiáveis."
    };
    
    setVerificationResult(result);
    setCheckedContent(prev => [...prev, result]);
    setUserPoints(prev => prev + 10);
  };

  const completeLesson = (lessonId) => {
    if (!completedLessons.includes(lessonId)) {
      const lesson = lessons.find(l => l.id === lessonId);
      setCompletedLessons(prev => [...prev, lessonId]);
      setUserPoints(prev => prev + lesson.points);
    }
    setCurrentLesson(null);
  };

  const LessonModal = ({ lesson, onClose, onComplete }) => (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-bold text-white">{lesson.title}</h3>
            <button onClick={onClose} className="text-gray-400 hover:text-white">
              <X size={24} />
            </button>
          </div>
          
          <div className="aspect-video bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
            <img src={lesson.thumbnail} alt={lesson.title} className="w-full h-full object-cover rounded-lg" />
          </div>
          
          <div className="space-y-4">
            <div className="flex items-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-1">
                <Clock size={16} />
                {lesson.duration}
              </span>
              <span className="flex items-center gap-1">
                <Award size={16} />
                {lesson.points} pontos
              </span>
            </div>
            
            <div className="text-gray-300">
              <p className="mb-3">Nesta aula você vai aprender:</p>
              <ul className="space-y-2 text-sm">
                <li>• Conceitos fundamentais sobre {lesson.category.toLowerCase()}</li>
                <li>• Como isso impacta seu dia a dia</li>
                <li>• Ferramentas para verificar informações</li>
                <li>• Formas de participação cidadã</li>
              </ul>
            </div>
            
            <div className="bg-blue-600 text-white p-3 rounded-lg text-sm">
              💡 <strong>Dica:</strong> Complete a aula e ganhe pontos para trocar por benefícios!
            </div>
            
            <button 
              onClick={() => onComplete(lesson.id)}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 text-white py-3 px-4 rounded-lg font-semibold hover:from-purple-700 hover:to-blue-700 transition-all flex items-center justify-center gap-2"
            >
              <Play size={20} />
              {lesson.completed ? 'Assistir Novamente' : 'Começar Aula'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const FactCheckSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-red-600 to-orange-600 p-6 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">Verificador de Conteúdo</h2>
        <p className="opacity-90">Cole aqui textos, links ou prints suspeitos para verificação automática</p>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-xl">
        <textarea
          placeholder="Cole aqui o conteúdo que deseja verificar..."
          className="w-full bg-gray-700 text-white p-4 rounded-lg border border-gray-600 focus:border-blue-500 focus:outline-none min-h-32 resize-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        
        <button 
          onClick={() => checkContent(searchText)}
          disabled={!searchText.trim()}
          className="mt-4 w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white py-3 px-4 rounded-lg font-semibold transition-colors flex items-center justify-center gap-2"
        >
          <Search size={20} />
          Verificar Conteúdo
        </button>
      </div>
      
      {verificationResult && (
        <div className={`p-6 rounded-xl border-2 ${
          verificationResult.status === 'verified' 
            ? 'bg-green-900 border-green-500' 
            : 'bg-red-900 border-red-500'
        }`}>
          <div className="flex items-center gap-3 mb-4">
            {verificationResult.status === 'verified' ? (
              <CheckCircle className="text-green-400" size={24} />
            ) : (
              <AlertTriangle className="text-red-400" size={24} />
            )}
            <div>
              <h3 className="font-bold text-white">
                {verificationResult.status === 'verified' ? 'Conteúdo Verificado' : 'Possível Fake News'}
              </h3>
              <p className="text-sm opacity-75">
                Confiança: {verificationResult.confidence}%
              </p>
            </div>
          </div>
          
          <p className="text-white mb-4">{verificationResult.explanation}</p>
          
          {verificationResult.sources.length > 0 && (
            <div>
              <p className="text-sm font-semibold text-white mb-2">Fontes consultadas:</p>
              <div className="flex gap-2">
                {verificationResult.sources.map((source, idx) => (
                  <span key={idx} className="bg-blue-600 text-white px-2 py-1 rounded text-xs">
                    {source}
                  </span>
                ))}
              </div>
            </div>
          )}
          
          <div className="mt-4 text-sm text-gray-300">
            ✅ +10 pontos por verificar conteúdo!
          </div>
        </div>
      )}
    </div>
  );

  const GameSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 p-6 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">Seus Pontos: {userPoints}</h2>
        <p className="opacity-90">Complete missões e ganhe recompensas!</p>
      </div>
      
      <div className="grid gap-4">
        <div className="bg-gray-800 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-white">Missão Diária</h3>
            <span className="text-yellow-400 text-sm">+25 pontos</span>
          </div>
          <p className="text-gray-400 text-sm mb-3">Complete 2 micro-aulas hoje</p>
          <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-yellow-400 to-orange-400 h-full transition-all duration-500"
              style={{width: `${Math.min((completedLessons.length / 2) * 100, 100)}%`}}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {completedLessons.length}/2 concluídas
          </p>
        </div>
        
        <div className="bg-gray-800 p-4 rounded-xl">
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-semibold text-white">Detector Expert</h3>
            <span className="text-blue-400 text-sm">+50 pontos</span>
          </div>
          <p className="text-gray-400 text-sm mb-3">Verifique 5 conteúdos suspeitos</p>
          <div className="bg-gray-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-gradient-to-r from-blue-400 to-purple-400 h-full transition-all duration-500"
              style={{width: `${Math.min((checkedContent.length / 5) * 100, 100)}%`}}
            ></div>
          </div>
          <p className="text-xs text-gray-400 mt-1">
            {checkedContent.length}/5 verificados
          </p>
        </div>
      </div>
      
      <div className="bg-gray-800 p-6 rounded-xl">
        <h3 className="font-bold text-white mb-4">Trocar Pontos</h3>
        <div className="space-y-3">
          <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
            <div>
              <p className="font-semibold text-white">1GB de Internet</p>
              <p className="text-sm text-gray-400">Válido por 7 dias</p>
            </div>
            <button 
              disabled={userPoints < 100}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              100 pts
            </button>
          </div>
          
          <div className="flex justify-between items-center p-3 bg-gray-700 rounded-lg">
            <div>
              <p className="font-semibold text-white">Cupom Netflix</p>
              <p className="text-sm text-gray-400">1 mês grátis</p>
            </div>
            <button 
              disabled={userPoints < 250}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed text-white px-4 py-2 rounded-lg text-sm font-semibold transition-colors"
            >
              250 pts
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  const HomeSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 rounded-xl text-white">
        <h1 className="text-2xl font-bold mb-2">Olá, {user?.name || 'Jovem Cidadão'}! 👋</h1>
        <p className="opacity-90">Pronto para aprender sobre política e combater fake news?</p>
        
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold">{userPoints}</div>
            <div className="text-xs opacity-75">Pontos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{completedLessons.length}</div>
            <div className="text-xs opacity-75">Aulas</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold">{checkedContent.length}</div>
            <div className="text-xs opacity-75">Verificações</div>
          </div>
        </div>
      </div>
      
      <div>
        <h2 className="text-xl font-bold text-white mb-4">Micro-aulas Populares</h2>
        <div className="space-y-4">
          {lessons.slice(0, 2).map(lesson => (
            <div key={lesson.id} className="bg-gray-800 p-4 rounded-xl">
              <div className="flex gap-4">
                <img 
                  src={lesson.thumbnail} 
                  alt={lesson.title}
                  className="w-20 h-20 rounded-lg object-cover"
                />
                <div className="flex-1">
                  <h3 className="font-semibold text-white mb-1">{lesson.title}</h3>
                  <div className="flex items-center gap-3 text-sm text-gray-400 mb-2">
                    <span className="flex items-center gap-1">
                      <Clock size={14} />
                      {lesson.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <Award size={14} />
                      {lesson.points} pts
                    </span>
                  </div>
                  <button 
                    onClick={() => setCurrentLesson(lesson)}
                    className="bg-purple-600 hover:bg-purple-700 text-white px-3 py-1 rounded-lg text-sm font-semibold transition-colors flex items-center gap-1"
                  >
                    <Play size={14} />
                    {lesson.completed ? 'Revisitar' : 'Assistir'}
                  </button>
                </div>
              </div>
              {lesson.completed && (
                <div className="mt-2 flex items-center gap-1 text-green-400 text-sm">
                  <CheckCircle size={16} />
                  Concluída
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="bg-orange-600 p-4 rounded-xl text-white">
        <h3 className="font-bold mb-2">🔥 Destaque da Semana</h3>
        <p className="text-sm opacity-90">
          "Como identificar deepfakes nas eleições" - Aula especial sobre IA e política
        </p>
        <button className="mt-2 bg-white text-orange-600 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-gray-100 transition-colors">
          Assistir Agora
        </button>
      </div>
    </div>
  );

  const LessonsSection = () => (
    <div className="space-y-6">
      <div className="bg-gradient-to-r from-green-600 to-teal-600 p-6 rounded-xl text-white">
        <h2 className="text-2xl font-bold mb-2">Micro-aulas</h2>
        <p className="opacity-90">Aprenda política em 2-4 minutos</p>
      </div>
      
      <div className="grid gap-4">
        {lessons.map(lesson => (
          <div key={lesson.id} className="bg-gray-800 p-4 rounded-xl">
            <div className="flex gap-4">
              <img 
                src={lesson.thumbnail} 
                alt={lesson.title}
                className="w-24 h-24 rounded-lg object-cover"
              />
              <div className="flex-1">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-white">{lesson.title}</h3>
                  {lesson.completed && (
                    <CheckCircle className="text-green-400" size={20} />
                  )}
                </div>
                
                <span className="inline-block bg-blue-600 text-white px-2 py-1 rounded text-xs mb-2">
                  {lesson.category}
                </span>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-3">
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {lesson.duration}
                  </span>
                  <span className="flex items-center gap-1">
                    <Award size={14} />
                    {lesson.points} pontos
                  </span>
                </div>
                
                <button 
                  onClick={() => setCurrentLesson(lesson)}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all flex items-center gap-2"
                >
                  <Play size={16} />
                  {lesson.completed ? 'Assistir Novamente' : 'Começar'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 sticky top-0 z-40">
        <div className="max-w-md mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">🗳️</span>
              </div>
              <h1 className="font-bold text-lg">PoliGen</h1>
            </div>
            
            <button 
              onClick={() => setMenuOpen(!menuOpen)}
              className="text-gray-400 hover:text-white"
            >
              {menuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
        
        {menuOpen && (
          <div className="bg-gray-800 border-t border-gray-700 px-4 py-3">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-10 h-10 bg-purple-600 rounded-full flex items-center justify-center">
                <span className="text-white font-bold">
                  {user?.name?.charAt(0) || 'U'}
                </span>
              </div>
              <div>
                <p className="font-semibold">{user?.name || 'Usuário'}</p>
                <p className="text-sm text-gray-400">{userPoints} pontos</p>
              </div>
            </div>
            <div className="space-y-2">
              <button className="w-full text-left text-gray-300 hover:text-white py-2">
                Configurações
              </button>
              <button className="w-full text-left text-gray-300 hover:text-white py-2">
                Sobre o App
              </button>
              <button className="w-full text-left text-gray-300 hover:text-white py-2">
                Política de Privacidade
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-md mx-auto px-4 py-6">
        {activeTab === 'home' && <HomeSection />}
        {activeTab === 'lessons' && <LessonsSection />}
        {activeTab === 'verify' && <FactCheckSection />}
        {activeTab === 'rewards' && <GameSection />}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-gray-800 border-t border-gray-700">
        <div className="max-w-md mx-auto px-4">
          <div className="flex justify-around py-2">
            {[
              { id: 'home', icon: Target, label: 'Início' },
              { id: 'lessons', icon: Book, label: 'Aulas' },
              { id: 'verify', icon: Search, label: 'Verificar' },
              { id: 'rewards', icon: Award, label: 'Pontos' }
            ].map(({ id, icon: Icon, label }) => (
              <button
                key={id}
                onClick={() => setActiveTab(id)}
                className={`flex flex-col items-center py-2 px-3 rounded-lg transition-colors ${
                  activeTab === id 
                    ? 'bg-purple-600 text-white' 
                    : 'text-gray-400 hover:text-white'
                }`}
              >
                <Icon size={20} />
                <span className="text-xs mt-1">{label}</span>
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Lesson Modal */}
      {currentLesson && (
        <LessonModal 
          lesson={currentLesson}
          onClose={() => setCurrentLesson(null)}
          onComplete={completeLesson}
        />
      )}

      {/* WhatsApp Integration Button */}
      <button className="fixed bottom-20 right-4 bg-green-600 hover:bg-green-700 text-white p-3 rounded-full shadow-lg transition-colors z-30">
        <MessageSquare size={24} />
      </button>
    </div>
  );
};

export default HubPoliticoGenZ;
