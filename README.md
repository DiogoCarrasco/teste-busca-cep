# Teste Técnico Front-end - SCCON

Aplicação Angular para busca de CEPs desenvolvida como teste técnico para vaga de desenvolvedor front-end na SCCON.

## 🎯 Requisitos Implementados

### ✅ **Tecnologias Obrigatórias**
- **Angular 6.1.0** com TypeScript 2.9.2
- **HTML5** com tags semânticas (`header`, `nav`, `main`, `section`)
- **SCSS** para estilização com variáveis CSS customizadas
- **ViaCEP API** integrada para busca de endereços

### ✅ **Arquitetura Angular**
- **Lazy Loading**: Módulos Home e CEP carregados sob demanda
- **Reactive Forms**: Implementado no componente de busca de CEP
- **RxJS Observables**: BehaviorSubject para gerenciamento de estado
- **EventEmitter**: Comunicação entre componentes pai-filho
- **Services**: Arquitetura de serviços para separação de responsabilidades

### ✅ **Estrutura de Módulos e Componentes**
```
Módulo Principal
├── Componente Header 
├── Router
    ├── Módulo Home (Lazy Load)
    │   └── Componente Home
    └── Módulo CEP (Lazy Load)
        ├── Componente Busca CEP
        └── Componente Lista Endereços
```

### ✅ **Design System SCCON**
- **Logo SCCON**: Implementado no header da aplicação
- **Menu Background**: Cor #670000 conforme especificação
- **Botões**: Cor #D7DBDD com hover 6% mais escuro
- **Formulários**: Botões com bordas arredondadas
- **Responsividade**: Layout adaptável para mobile e desktop

### ✅ **Funcionalidades Técnicas**
- **Validação com REGEX**: Padrão de CEP (00000-000)
- **Máscara de Input**: Formatação automática do CEP
- **Persistência**: localStorage para histórico de buscas
- **Tratamento de Erros**: Feedback visual para CEPs inválidos

## 🚀 **Diferenciais Implementados**

### **Angular Material**
- Componentes Material Design para formulários
- Tabela responsiva com ordenação e paginação
- Ícones Material para melhor UX
- Animações e transições suaves

### **SCSS Avançado**
- Variáveis CSS para cores e espaçamentos
- Pseudo-elementos para efeitos visuais
- Animações CSS para interações
- Sistema de grid responsivo

### **Performance e UX**
- Lazy loading para otimização
- Debounce no filtro de busca
- Loading states e feedback visual
- Design moderno e acessível

## 🛠️ **Instalação e Execução**

```bash
# Instalar dependências
npm install

# Executar em desenvolvimento
ng serve

## ⚠️ Versão do Node

> **Atenção:**
> Para garantir compatibilidade total com o Angular 6, utilize preferencialmente a versão **Node.js >=8.x e <11.x** (ou seja, qualquer versão entre 8 e 10). Versões mais recentes do Node podem causar incompatibilidades com dependências do Angular CLI 6.x.
>
> - Recomenda-se instalar o [Node Version Manager (nvm)](https://github.com/nvm-sh/nvm) para alternar facilmente entre versões do Node.
> - Exemplo de instalação de versão compatível:
>   ```bash
>   nvm install 10
>   nvm use 10
>   ```

---

## 🎨 Utilização do Bootstrap

- O projeto faz uso do **Bootstrap** para garantir responsividade e estilos modernos.
- Classes utilitárias do Bootstrap são aplicadas em componentes e layouts para facilitar o alinhamento, espaçamento e adaptação a diferentes tamanhos de tela.
- Caso deseje customizar ainda mais o visual, é possível sobrescrever estilos do Bootstrap via SCSS.

## 📱 **Funcionalidades**

1. **Busca de CEP**: Digite um CEP válido para encontrar endereços
2. **Histórico**: Visualize todos os endereços pesquisados
3. **Responsivo**: Interface adaptável para qualquer dispositivo
4. **Navegação**: Menu intuitivo com lazy loading

## 🎨 **Recursos Técnicos Principais**

- **TypeScript**: Tipagem forte e interfaces bem definidas
- **RxJS**: Gerenciamento reativo de estado
- **Angular Material**: Componentes prontos e acessíveis
- **SCSS**: Estilização modular e reutilizável
- **LocalStorage**: Persistência de dados local

## 📦 Serviços Customizados

### PaginationService

- Serviço responsável por gerenciar a lógica de paginação dos dados exibidos na lista de endereços.
- Permite controle de página atual, total de itens, itens por página e navegação entre páginas.
- Facilita a reutilização da lógica de paginação em diferentes componentes da aplicação.

### SnackbarService

- Serviço utilitário para exibir mensagens rápidas (snackbars/toasts) ao usuário.
- Utilizado para feedbacks como sucesso, erro ou alertas, melhorando a experiência do usuário.
- Centraliza a exibição de mensagens, tornando o código mais limpo e padronizado.

---

---

*Desenvolvido como teste técnico para demonstração de habilidades em Angular, TypeScript e desenvolvimento front-end moderno.*
