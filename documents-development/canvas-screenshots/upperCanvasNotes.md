<img width="1202" height="376" alt="image" src="https://github.com/user-attachments/assets/72b4a04d-7e7e-46b2-a00f-b13529c0db7f" />

---
# 1. Panorama do Segmento (Público-Alvo)

| **Métrica-chave**                  | **Evidências**                                                                                                                                     | **Síntese**                                  |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- |
| **Faixa etária dominante**         | 16-24 anos respondem por 12% do eleitorado brasileiro e já somam 20,5 milhões de votantes                                                          | Juventude apta ao primeiro voto em massa     |
| **Penetração de IA generativa**    | 70% dos profissionais Gen Z declararam usar GenAI no trabalho; 54% dos brasileiros utilizaram ferramentas de IA em 2024                            | Familiaridade alta com ChatGPT, Gemini, etc. |
| **Vulnerabilidade a fake news**    | 43% dos jovens não sabem checar veracidade de conteúdos online; Gen Z apresentaram pior desempenho em detecção de notícias falsas em teste da OCDE | Carência de literacia crítica                |
| **Ponto de contato digital**       | 71% fazem descoberta de conteúdo via redes sociais e YouTube; uso diário de 7 atividades digitais, principalmente via smartphone                   | Mobile-first, social-first                   |
| **Engajamento político crescente** | Alistamento eleitoral 16-17 anos cresceu 78% entre 2020-2024                                                                                       | Janela de oportunidade cívica                |
---
# Root Cause (Causa Raiz)

| **Raiz**                                              | **Evidência**                                                                                        | **Impacto**                           |
| ----------------------------------------------------- | ---------------------------------------------------------------------------------------------------- | ------------------------------------- |
| **Educação midiática insuficiente no currículo**      | BNCC recomenda, mas escolas carecem de formação docente e materiais                                  | Déficit de habilidades de verificação |
| **Algoritmos de recomendação e eco chambers**         | 80% dos jovens confiam em "likes" e compartilhamentos como métrica de credibilidade                  | Polarização acelerada                 |
| **Ausência de ferramentas cívicas amigáveis a Gen Z** | Apenas 1% dos jovens filiados a partidos; iniciativas parlamentares juvenis impactam poucos milhares | Baixa adesão a canais institucionais  |
| **Regulação tardia de IA em campanhas**               | TSE proibiu deepfake só em 2024                                                                      | Janela para manipulação pré-regra     |
---
# 6. Formato da Solução

| **Elemento**          | **Especificação Short & Direct**                                                                                                        |
| --------------------- | --------------------------------------------------------------------------------------------------------------------------------------- |
| **Plataforma-âncora** | Progressive Web App (PWA) leve + integração WhatsApp Bot                                                                                |
| **Mídia principal**   | Infográfico interativo responsivo + verticais de 60-90 s recicláveis para Reels/TikTok                                                  |
| **Engine**            | LLM fine-tuned em dados do TSE, Senado, Câmara, Politize!, Fiocruz; monitor por API de fact-checking (Comprova, Aos Fatos)              |
| **Design**            | Mobile-first; dark-mode; acessibilidade WCAG 2.1                                                                                        |
| **Métricas-chave**    | T1: Taxa de conclusão de micro-aulas; T2: redução de compartilhamento de fake news autoconsciente; T3: interação com bot de verificação |
| **Escalabilidade**    | Arquitetura serverless (ex.: Firebase) + CDN gratuíta para assets estáticos                                                             |
