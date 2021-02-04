//Acessando o elemento Dino pelo DOM
const dino = document.querySelector('.dino');

//Acessando o elemento Background pelo DOM
const background = document.querySelector('.background');

const bodyBG = document.querySelector('.body');

const rank = document.querySelector('.rank');
let points = 0;

//Define o estado para "No chão"
let isJumping = false;

//Declarando a posição inicial do Dino
let position = 40;

//Função para lidar com o KeyUp quando pressionada a tecla de Espaço(32)
function handleKeyUp(event){
    if (event.keyCode === 32){
        if(!isJumping)
        {
            jump();
        }     
    }
}

//Função responsavel por fazer o personagem pular
function jump(){

    //Define o estado para "Pulando"
    isJumping = true;

    //Função para atualizar a posição do Dino quando subindo
    let upInterval = setInterval(() => {

        //Condição para alcançar a altura máxima
        if(position >= 200){

            //Caso alcance a altura máxima ele zera o contador de intevalo
            clearInterval(upInterval);

            //Função para atualizar a posição do Dino quando descendo
            let downInterval = setInterval(() => {

                //Limitanto para não passar do chão
                if(position <= 40){

                    //Caso alcance o chão, zera o contador de intervalo
                    clearInterval(downInterval);

                    //Define o estado para "No chão"
                    isJumping = false;

                } else{

                    //Decendo e retornando para a posição inicial
                    position -= 20;
                    dino.style.bottom = position + 'px';
                }
            });
        } else{
             //Subindo até a altura máxima
            position += 20;
            dino.style.bottom = position + 'px';
        }
    //Tempo de atualização em milisegundos  
    }, 25)
}

//Função para gerar obstaculos(cactus)
function createCactus(){

    //Cria um elemento div e atribui a "cactus"
    const cactus = document.createElement('div');

    //Posição inicial
    let cactusPosition = 2000;

    //Classe para gerar um tempo randomico em milissegundos
    let randomTime = Math.random() * 6000;

    //O classList possui o metodo 'add' para adicionar classes á tag html de forma induzida
    cactus.classList.add('cactus');

    //Com o style você tem acesso a todos os atributos CSS do objeto
    cactus.style.left = 2000 + 'px';
    cactus.style.bottom = 40 + 'px';

    //AppendChil serve para parentar objetos a outros objetos
    background.appendChild(cactus);

    //Função para atualizar a posição do cactus indo á esquerda
    let leftInterval = setInterval(() => {

        //A cada tick ele subtrai 10 da posição atual
        cactusPosition -= 10;

        //Atualiza vizualmente a posição do cactus
        cactus.style.left = cactusPosition + 'px';

        //Checando se o cactus saiu da tela
        if (cactusPosition < -60)
        {

            //Caso tenha saido, zera o contador de intevalos
            clearInterval(leftInterval);

            //E remove o parent com o background
            background.removeChild(cactus);
            
            points += 1;

            rank.innerHTML = 'Pontuação: ' + points;
          
        } else if(cactusPosition > 0 && cactusPosition < 60 && position < 60){
            clearInterval(leftInterval);

            bodyBG.style.background = "#000000";
            document.body.innerHTML = 
            '<center><img src="img/game-over.png" align="middle"></center> <h1 class="game-over">Aperte F5 para jogar novamente</h1>';

        //Caso ele ainda esteja em tela  
        } else{

            //Continua subtraindo e atualizando a posição na tela
            cactusPosition -= 10;
            cactus.style.left = cactusPosition + 'px';
        };
    }, 20);

    //Função JS para disparar funções apos algum tempo
    setTimeout(createCactus, randomTime);
}

createCactus();
//Captura o evento quando soltamos uma tecla
document.addEventListener('keyup', handleKeyUp);