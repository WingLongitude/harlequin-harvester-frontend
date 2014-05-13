# --- First database schema

# --- !Ups

create table account (
  email                     varchar(255) not null,
  name                      varchar(255),
  password                  varchar(255),
  constraint pk_account primary key (email)
);

insert into account values ('xxxx@prueba.com', 'xxxx', 'xxxx');

# --- !Downs

SET REFERENTIAL_INTEGRITY FALSE;

drop table if exists account;

SET REFERENTIAL_INTEGRITY TRUE;



