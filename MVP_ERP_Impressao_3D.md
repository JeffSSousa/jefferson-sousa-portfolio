# MVP — ERP Impressão 3D

## 1. Objetivo

O MVP tem como objetivo resolver duas necessidades imediatas:

1. Calcular o preço dos produtos.
2. Visualizar os produtos que já foram precificados.

O MVP será pequeno e poderá ser utilizado localmente antes da evolução para os demais módulos do ERP.

---

## 2. Escopo do MVP

O MVP será composto por três módulos:

```text
FILAMENTOS
    ↓
PRECIFICAÇÃO
    ↓
CATÁLOGO
```

### Módulos

- Filamentos
- Precificação
- Catálogo

### Fora do MVP

Os seguintes módulos serão desenvolvidos posteriormente:

- Modelos
- Impressoras
- Produção
- Consumo real de filamento
- Estoque
- Vendas
- Clientes
- Pedidos
- Dashboard
- Relatórios
- Variações de modelos

Durante o MVP, o controle de impressão e consumo real continuará sendo feito em planilha.

---

# 3. Módulo de Filamentos

## Responsabilidade

Cadastrar os filamentos utilizados na operação e calcular o custo por grama.

Como o padrão de compra será sempre de **1.000 g (1 kg)**, o cálculo será baseado diretamente no preço da bobina dividido por 1.000.

## Entidade

```text
Filament
├── id
├── name
├── brand
├── material
├── color
├── weight
├── purchasePrice
├── costPerGram
├── status
├── createdAt
└── updatedAt
```

### Exemplo

```text
Nome: PLA Preto
Marca: XYZ
Material: PLA
Cor: Preto
Peso: 1000g
Preço de compra: R$ 100,00
Custo por grama: R$ 0,10
Status: ACTIVE
```

## Fórmula

```text
costPerGram = purchasePrice / 1000
```

## Custo médio do filamento

Como todos os filamentos terão 1 kg, será utilizada inicialmente a **média simples do custo por grama**.

Exemplo:

```text
PLA Preto     = R$ 0,10/g
PLA Branco    = R$ 0,12/g
PLA Azul      = R$ 0,11/g
PLA Vermelho  = R$ 0,13/g
PLA Verde     = R$ 0,105/g
```

```text
Média =
(0,10 + 0,12 + 0,11 + 0,13 + 0,105) / 5

Média = R$ 0,113/g
```

O sistema poderá trabalhar com o valor calculado ou arredondado conforme a regra definida na implementação.

### Evolução futura

Quando o módulo de estoque estiver implementado, poderá ser utilizado custo médio ponderado baseado nas quantidades reais disponíveis e nas compras.

---

# 4. Endpoints — Filamentos

```http
POST /api/filaments
GET  /api/filaments
GET  /api/filaments/{id}
```

Neste primeiro momento não é necessário implementar todos os endpoints de manutenção. Atualização e exclusão podem ser adicionadas posteriormente.

---

# 5. Módulo de Precificação

## Responsabilidade

Calcular o custo e sugerir o preço de venda de um produto.

O MVP não terá integração direta entre modelo, partes e filamentos.

O cálculo será simplificado.

## Fluxo

```text
Peso do produto
        ↓
Custo médio do filamento/g
        ↓
Custo do material
        ↓
+ Energia
+ Embalagem
+ Outros custos
        ↓
Custo total
        ↓
Margem desejada
        ↓
Preço de venda
```

## Dados de entrada

```text
productName
weight
averageFilamentCost
energyCost
packagingCost
otherCosts
margin
```

## Cálculo do material

```text
materialCost = weight × averageFilamentCost
```

### Exemplo

```text
Peso: 20g
Custo médio: R$ 0,11/g

20 × 0,11 = R$ 2,20
```

## Custo total

```text
totalCost =
    materialCost
  + energyCost
  + packagingCost
  + otherCosts
```

---

# 6. Margem

A margem será tratada como margem sobre o preço de venda.

Fórmula:

```text
salePrice = totalCost / (1 - margin)
```

### Exemplo

```text
Custo total = R$ 3,00
Margem = 50%

3,00 / (1 - 0,50)
= 3,00 / 0,50
= R$ 6,00
```

Isso é diferente de simplesmente adicionar 50% ao custo.

```text
R$ 3,00 + 50% = R$ 4,50
```

Nesse segundo caso temos um acréscimo de 50% sobre o custo, e não uma margem de 50%.

---

# 7. Snapshot da Precificação

A precificação será salva com os valores utilizados no momento do cálculo.

Isso permite saber posteriormente como determinado preço foi formado.

## Entidade

```text
Pricing
├── id
├── productName
├── materialCost
├── energyCost
├── packagingCost
├── otherCosts
├── totalCost
├── margin
├── salePrice
├── createdAt
└── updatedAt
```

O sistema não deve armazenar apenas o preço final.

Deve manter o resultado da composição do custo.

---

# 8. Preços por quantidade

O MVP poderá suportar preços diferentes conforme a quantidade, sem criar inicialmente uma estrutura complexa de variações.

Exemplo:

```text
Batman
1+ unidade  → R$ 5,00
5+ unidades → R$ 4,50
10+ unidades → R$ 4,00
```

Uma possível estrutura:

```text
Pricing
├── productName
├── quantityFrom
├── quantityTo
└── salePrice
```

Essa abordagem será suficiente para o MVP.

Uma estrutura completa de `Variation` ou `PricingTier` poderá ser criada posteriormente se a necessidade aparecer.

---

# 9. Endpoints — Precificação

```http
POST /api/pricing
GET  /api/pricing
GET  /api/pricing/{id}
```

---

# 10. Módulo de Catálogo

## Responsabilidade

Exibir os produtos que já foram precificados e seus respectivos preços comerciais.

Exemplo:

```text
CATÁLOGO

Chaveiro Stitch
R$ 8,99

Batman
R$ 5,00

Batman — 5+ unidades
R$ 4,50

Porta-joias
R$ 29,99
```

## Entidade

No MVP, não será criada uma entidade `Catalog`.

O catálogo será uma visão dos registros de `Pricing`.

```text
Pricing
   ↓
Catalog
```

Isso evita duplicação de dados.

---

# 11. Endpoints — Catálogo

```http
GET /api/catalog
GET /api/catalog/{id}
```

---

# 12. Arquitetura Backend

## Stack inicial

```text
Java
Spring Boot
Spring Web
Spring Data JPA
PostgreSQL
Bean Validation
Swagger / OpenAPI
Lombok
MapStruct
```

Segurança, Docker, CI/CD e deploy poderão ser adicionados posteriormente.

---

# 13. Estrutura inicial

```text
com.jeffssousa.erp
│
├── config
│
├── controller
│
├── dto
│   ├── filament
│   ├── pricing
│   └── catalog
│
├── entity
│   ├── Filament
│   └── Pricing
│
├── enums
│   └── Status
│
├── exception
│   ├── handler
│   └── business
│
├── mapper
│
├── repository
│   ├── FilamentRepository
│   └── PricingRepository
│
└── service
    ├── FilamentService
    ├── PricingService
    └── CatalogService
```

---

# 14. Fluxo de utilização

## 14.1 Cadastro de filamentos

```text
Cadastrar filamentos
        ↓
Calcular custo por grama
        ↓
Calcular custo médio
```

Exemplo:

```text
PLA Preto    → R$ 0,10/g
PLA Branco   → R$ 0,12/g
PLA Azul     → R$ 0,11/g

Custo médio  → R$ 0,11/g
```

## 14.2 Precificação

```text
Novo produto
        ↓
Informar nome
        ↓
Informar peso
        ↓
Calcular material
        ↓
Adicionar energia
        ↓
Adicionar embalagem
        ↓
Adicionar outros custos
        ↓
Calcular custo total
        ↓
Aplicar margem
        ↓
Gerar preço
        ↓
Salvar
```

## 14.3 Catálogo

```text
Produtos precificados
        ↓
Visualizar
        ↓
Nome + quantidade + preço
```

---

# 15. Roadmap de evolução

## V1 — MVP

```text
Filamentos
    ↓
Precificação
    ↓
Catálogo
```

Objetivo: sair da planilha para o cadastro e precificação dos produtos.

## V2 — Operação

```text
Modelos
    ↓
Produção
    ↓
Consumo real
    ↓
Estoque
```

Nesta etapa o ERP poderá calcular o consumo real de filamento e utilizar essas informações na precificação.

## V3 — Comercial

```text
Vendas
Pedidos
Clientes
```

## V4 — Gestão

```text
Dashboard
Relatórios
Indicadores
Análises
```

---

# 16. Princípios do MVP

1. **Resolver o problema atual antes de construir o ERP completo.**
2. **Evitar overengineering.**
3. **Não criar entidades que ainda não possuem necessidade real.**
4. **Manter a arquitetura preparada para evolução.**
5. **Salvar o histórico da composição da precificação.**
6. **Usar custo médio do filamento como estimativa no MVP.**
7. **Não vincular produto diretamente a uma cor específica de filamento.**
8. **Permitir que o mesmo produto tenha preços diferentes por quantidade.**
9. **Evoluir para consumo e custo real somente quando o módulo de produção/estoque existir.**

---

# 17. Resultado esperado

Ao final do MVP, o sistema deverá permitir:

```text
Cadastrar filamentos
        ↓
Obter custo médio por grama
        ↓
Cadastrar uma precificação
        ↓
Calcular custo do produto
        ↓
Definir margem
        ↓
Gerar preço de venda
        ↓
Salvar precificação
        ↓
Visualizar no catálogo
```

O MVP estará funcional mesmo sem os módulos de produção, estoque e vendas.

A prioridade é colocar essa primeira versão em uso e, posteriormente, substituir gradualmente as estimativas por dados reais da operação.
