# Orbital Trust — Mobile

Aplicativo mobile em React Native para monitoramento ambiental orbital em tempo real. Exibe alertas gerados pelo pipeline IoT/CV do Orbital Trust, com detalhes de evidências orbitais, histórico local persistido e autenticação com sessão via AsyncStorage.

## Integrantes

| Nome | RM |
|---|---|
| Fernando Luiz Silva Antonio | RM555201 |
| Gustavo Ruiz Vieira Paulino | RM554779 |
| Guilherme Abe | RM554743 |
| Thomas Reichmann | RM554812 |
| Victor Dias | RM558017 |

## Como Rodar

```bash
cd mobile
npm install
npx expo start
```

Escaneia o QR code com o app Expo Go (iOS/Android) ou pressiona `w` para abrir no navegador.

## Credenciais de Teste

```
login: fiap@teste.com
senha: 123456
```

## Telas

| Tela | Descrição |
|---|---|
| **Login** | Autenticação com credenciais fixas e persistência de sessão via AsyncStorage |
| **Dashboard** | Lista de alertas ambientais ativos com nível de risco e classe detectada |
| **Detalhes do Alerta** | Métricas completas: risco, confiança CV, classe, change score, qualidade orbital |
| **Histórico** | Log local de alertas visualizados, persistido via AsyncStorage |
| **Configurações** | Modo de dados (API vs Mock), status de integração e logout |
| **Sobre** | Descrição do projeto e do pipeline Orbital Trust |

## Arquitetura

```
mobile/
├── App.tsx                          # Stack navigator com 6 telas
└── src/
    ├── screens/                     # LoginScreen, Dashboard, AlertDetail,
    │                                # History, Settings, About
    ├── services/                    # authService, alertService,
    │                                # historyService, pipelineService
    ├── components/                  # AlertCard, RiskBadge, ConfidenceBadge
    └── types/                       # Tipagem TypeScript dos alertas e navegação
```

## Persistência de Dados

O app usa `@react-native-async-storage/async-storage` em dois contextos:

- **Sessão de login** — chave `@orbital_trust/session`: salva ao autenticar, removida ao fazer logout. No boot do app, verifica a chave para decidir se exibe Login ou Dashboard diretamente.
- **Histórico de alertas** — chave `@orbital_trust/history`: cada alerta visualizado na tela de Detalhes é salvo localmente com deduplicação por `event_id`.

## Modo Mock

O app funciona sem backend. Por padrão (`EXPO_PUBLIC_ALERTS_API_MODE=mock`) os alertas são carregados de dados mockados embutidos no código — ideal para avaliação sem servidor rodando.

Para conectar a uma API local, crie `mobile/.env`:

```bash
EXPO_PUBLIC_ALERTS_API_MODE=api
EXPO_PUBLIC_ALERTS_BASE_URL=http://SEU-IP-LOCAL:8000
```

## Tecnologias

| Tecnologia | Uso |
|---|---|
| React Native + Expo SDK 52 | Runtime mobile multiplataforma |
| TypeScript | Tipagem estática completa |
| React Navigation (Stack) | Navegação entre as 6 telas |
| AsyncStorage | Sessão de login + histórico local |
| Expo Router | Configuração de deep links |