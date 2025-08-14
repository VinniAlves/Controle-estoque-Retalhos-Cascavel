# 📦 Controle de Estoque — V2

> Uma evolução do meu projeto anterior de controle de estoque ([Veja o V1 aqui](https://github.com/VinniAlves/Retalhos-Cascavel)).  
> Criado para uso real, mas desenvolvido no meu tempo livre — sem pressa, mas com foco em qualidade.

---

## 🚀 Visão Geral

O **Controle de Estoque V2** é um sistema completo para gestão de produtos e peças, dividido em múltiplas plataformas:

- **🌐 Aplicação Web** — Catálogo público para visitantes encontrarem produtos.
- **🖥 Aplicação Desktop** — Controle interno de entradas e movimentações de peças, com segurança extra para endpoints críticos.
- **🛠 Back-end** — Em fase de definição (possibilidades: **Node.js + MySQL** ou **C# + PostgreSQL**).

Além disso, o projeto conta com planejamento de **infraestrutura modular**, com múltiplas máquinas virtuais dedicadas para cada parte do sistema.

---

## 🖥 Tecnologias Utilizadas

### **Front-end Web**
- HTML, CSS
- React + TypeScript

### **Front-end Desktop**
- React + TypeScript
- Electron (para empacotamento em app desktop)
- [Shadcn/UI](https://ui.shadcn.com/) (componentes UI modernos)
- Integração segura com endpoints restritos

### **Back-end** (em estudo)
- **Opção 1:** Node.js + MySQL
- **Opção 2:** C# + PostgreSQL (aprendizado futuro)

---

## 🏗 Infraestrutura (Planejada)

A arquitetura do sistema será separada em **máquinas virtuais (VMs)** para maior segurança e organização:

1. 🗄 **Banco de Dados** — Servidor exclusivo
2. 🌍 **Hospedagem do Site** — Servidor dedicado
3. 🔌 **Serviços de API**
   - API para o **site**
   - API exclusiva para o **desktop** (com endpoints restritos)
4. (Possível expansão com balanceamento de carga)

---

## 🎨 Design & Prototipagem

- Protótipo inicial do desktop disponível no **Figma**  
  *(Link privado — apenas para visualização do layout desejado)*

---

## 📜 Histórico

Este é o **V2** do projeto, trazendo:
- Nova estrutura modular
- Mais segurança para cadastros
- Melhor separação entre Web e Desktop
- Planejamento para implantação real

🔗 [Acesse o projeto V1 aqui](https://github.com/VinniAlves/Retalhos-Cascavel)

---

## 📅 Status do Projeto

⚠ **Em desenvolvimento**  
Sem prazo final definido. Avanço conforme disponibilidade, priorizando qualidade e aprendizado.

---

## 💡 Objetivo

Este projeto não é apenas um teste — ele será usado em ambiente real, ajudando na organização e no controle de estoque de forma simples e eficiente.
