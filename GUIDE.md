# Guia de Configuração de Propostas

## 1. Gerador de Links (Novo!) 🚀

A maneira mais fácil de criar uma proposta personalizada é usando o **Gerador Automático**.

1.  Acesse: `http://localhost:8081/gerador`
2.  Preencha o **Nome da Debutante**.
3.  (Opcional) Coloque a data do evento.
4.  **Edite os Preços:** Os pacotes já vêm com os valores padrão. Você pode alterar o preço à vista ou o valor da parcela de qualquer um deles.
5.  Clique em **"Gerar Link Personalizado"**.
6.  Copie o link gerado e mande para a cliente!

**O que acontece?**
O link gerado contém todas as alterações que você fez. Quando a cliente abrir, ela verá exatamente os preços que você definiu, sem que você precise mexer em nenhum código.

---

## 2. Configurações Avançadas (Via Código)

Se preferir fazer alterações permanentes (para todos os clientes) ou manuais:

### Alterar Preços Padrão (Global)
1.  Abra `src/data/proposalData.ts`.
2.  Edite a constante `defaultPackages`.

### Criar Exceções Manuais
1.  Abra `src/data/proposalData.ts`.
2.  Edite `clientOverrides`.

Mas recomendamos usar o **Gerador (`/gerador`)** pela praticidade!
