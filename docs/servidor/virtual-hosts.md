# Como criar subdomínios no serviço httpd - Fedora 34

Por conveniência, ao criarmos nosso servidor e acessarmos os projetos armazenados, podemos criar hosts virtuais de forma que, mesmo estando no localhost, seja possível visualizar o projeto a partir de um diretório raiz, diretório este que seria referente a um servidor externo com domínio.

Este projeto se refere ao componente Timer, o qual possuirá o subdomínio `timer.localhost` (ou seja, poderemos acessar diretamente o diretório `src` pelo navegador somente digitando esta URL).

## Hosts

Para criar este subdomínio, primeiro é necessário adicioná-lo na última linha do arquivo `/etc/hosts`, da seguinte forma:

```
127.0.0.1   localhost localhost.localdomain localhost4 localhost4.localdomain4
::1         localhost localhost.localdomain localhost6 localhost6.localdomain6
127.0.0.1   timer.localhost
```

Realizando esta ação, identificamos que a URL `timer.localhost` se refere ao servidor local, como acontece com o `localhost`.

## Virtual Hosts

Para que esta URL acesse diretamente o diretório `src` do projeto, iremos incluir um host virtual no arquivo `/etc/httpd/conf.d/vhost.conf` (caso não exista, crie com `$ sudo touch vhost.conf`).

Ao fim do arquivo, adicione:

```
# Configurações do servidor Timer
<VirtualHost *:80>
    ServerName timer.localhost
    DocumentRoot "/var/www/html/Timer/src/"
</VirtualHost>
```

onde quem identifica `timer.localhost` é `ServerName`, e quem identifica a pasta raiz do projeto é `DocumentRoot`.

Este arquivo, entre muitos que estão no mesmo diretório, é incluído ao final do arquivo padrão de configuração (`/etc/httpd/conf/httpd.conf`) do serviço `httpd`, como é mostrado abaixo:

```
...
# Supplemental configuration
#
# Load config files in the "/etc/httpd/conf.d" directory, if any.
IncludeOptional conf.d/*.conf
```

## Teste

Ao finalizar a inserção, reinicie o serviço:

```
$ sudo systemctl restart httpd
```

> Caso `timer.localhost` redirecione para `localhost`, há a possibilidade do diretório em `DocumentRoot` estar incorreto, então confira-o antes.

Neste momento você já poderá visualizar o projeto em execução através do subdomínio.