# Componente Timer

Sumário

- [Descrição](#descricao)
- [Execução](#execucao)
- [Debug](#debug)
- [Futuro](#futuro)

Este componente foi feito para estudo próprio e testes de como eu poderia criar um componente em JavaScript sem utilizar ReactJS ou NodeJS.

## Descrição <span id="descricao"></span>

O Timer depende do componente Countdown, e este realiza a função de um contador dos minutos e segundos especificados até zero, apresentando a cada segundo a visualização do tempo na tela. Além do Countdown, ele possui um botão de iniciar/parar, bem como o controle total do comportamento deles.

Ao clicar em `Iniciar`, a execução do Timer se inicia, ao mesmo tempo que a opção `Parar` é disponibilizada para interromper este processo a qualquer momento.

## Execução <span id="execucao"></span>

Como não foi utilizado NodeJS, **para executá-lo é necessário que haja um servidor**, seja localhost ou externo, caso contrário haverá problemas no import por conta do CORS que não permite executar sem o `http` ou `https`.

Este projeto foi realizado com a criação de um servidor local. Para criar um, siga os tutoriais [Lamp Stack - Fedora](docs/servidor/lamp-stack-fedora.md) e [Virtual Hosts](docs/servidor/virtual-hosts.md).

A partir da pasta raiz do projeto, a execução deve ser iniciada em `src/index.html`.

## Debug <span id="debug"></span>

Bugs encontrados são reportados em [Issues](https://github.com/wallacy-sebastian/timer-componente/issues?q=is%3Aopen+is%3Aissue+label%3Abug). Lá você encontra a lista de bugs identificados/resolvidos, bem como o link para cada um destes, contendo a descrição de cada.