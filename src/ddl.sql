CREATE TABLE acoes (
	id serial primary key,
	nome varchar(100) not null,
	ticker varchar(50) not null unique,
	pm decimal(10,2),
	setor varchar(50) not null,
	quantidade int not null
)

create table fii (
	id serial primary key,
	nome varchar(100) not null,
	ticker varchar(50) not null unique,
	pm decimal(10,2),
	setor varchar(50),
	quantidade int not null
)

create table bdr (
	id serial primary key,
	nome varchar(100) not null,
	ticker varchar(50) not null unique,
	pm decimal(10,2) not null,
	setor varchar(50) not null,
	quantidade int not null
)

create table cripto (
	id serial primary key,
	nome varchar(100) not null,
	ticker varchar(50) not null unique,
	pm decimal (10,2) not null,
	setor varchar(100),
	quantidade decimal(10,2) not null
)

create table selic (
	id serial primary key,
	nome varchar(100) not null,
	pm decimal(10,2) not null,
	vencimento date not null,
	quantidade decimal(10,2) not null default 1,
	taxaJuros decimal(5,2) not null
)

create table ipca (
	id serial primary key,
	nome varchar(100) not null,
	pm decimal(10,2) not null,
	vencimento date not null,
	quantidade decimal(10,2) not null,
	taxaJuros decimal(5,2) not null
)

create table cdi (
	id serial primary key,
	nome varchar(100) not null,
	pm decimal(10,2) not null,
	vencimento date not null,
	quantidade decimal(10,2) not null,
	taxaJuros decimal(5,0) not null
)

// Adicionando a coluna 'valorInvestido' nas tabelas 
ALTER table {nome da tabela}
add column valorInvestido decimal(10,2)

update {nome da tabela}
set valorInvestido = quantidade * pm
