const tmi = require('tmi.js');


const opciones = {

    options: {
        debug: true
    },
    connection: {
        reconnect: true,
        secure: true
    },
    identity: {
        username: process.env.BOT_USERNAME,
        password: process.env.OAUTH_TOKEN
    },
    channels: [process.env.CHANNEL_NAME]
}
const client = new tmi.client(opciones)



client.connect()


client.on('connected', (adr, port) => {
    client.action(opciones.channels[0], 'Bot Funcionando! VoHiYo ')


})



client.on('chat', (target, ctx, message, self) => {
    if(self) return;
    

    
   
    let ping = `@${ctx.username}`
    const commandArgs = message.trim().toLowerCase().split(" ");
    const commandHandler = message.trim().toLowerCase();
    console.log(commandArgs)



    if(commandHandler === '!roll') {

        const num = rollDice();

        if(num >= '255') {

            client.say(target, `Encontraste el numero maximo! Felicidades ${ping}`)
        }

        client.say(target, `Tu numero es: ${num}`)

    } else if (commandHandler === '!redes') {

        client.say(target, `¡Redes Sociales del Streamer!
        Instagram: @_joacomirandaa`)

    } else if (commandHandler === '!info') {

        client.say(target, `Comandos: !info - !redes - !roll - !disc ¡Toda Sugerencia es bienvenida! ¡Gracias por usarme! Más informacion en Github - https://github.com/OTPStrafe`)
        
    } else if (commandHandler === '!disc') {

        client.say(target, `¡Unete a nuestro Discord! https://discord.gg/a4dvVpB `)
    } else if (commandHandler === '!off') {

        if(!ctx.mod) {
            if(ctx.username === 'otpstrafe') {
                client.say(target, 'Nos vemos! GivePLZ')
                client.disconnect();

            } else {
                return;
            }
            return;
        }

    } else if (commandArgs[0] === '!play') {

        var res = commandArgs[1]
        turnPlay(res);

    } else if (commandArgs[0] === '!slow') {

        const args = commandArgs[1]

        if(!ctx.mod){
            if(ctx.username === process.env.HOST){

                slowMode(args)
                return;
            }

            client.say(target, '¡Permisos insuficientes!')

        } else {
            slowMode(args)
        }
   


    } 
})


function rollDice() {
    const max = 255;

    return Math.floor(Math.random() * max) + 1;
}

function turnPlay(res) {


    var userChoice = res

    if(userChoice === undefined) {
        client.say(opciones.channels[0], 'Tienes que elegir entre; Papel, Piedra y Tijeras.')
    }

    var computerChoice = Math.random();
    if(computerChoice < 0.34){ computerChoice = 'piedra'}
    else if(computerChoice <= 0.67) { computerChoice = 'papel'}
    else{computerChoice = 'tijeras'}

    var compare = function (choice1, choice2) {

        if(choice1 === choice2){

            client.say(opciones.channels[0], 'El resultado es un empate!')

        } else {

            if(choice1 === "piedra"){

                if(choice2 === "papel"){
                    client.say(opciones.channels[0], 'El Papel le gana a la Piedra. ¡Yo Gano! Kappa')
                }
                else
                {
                    client.say(opciones.channels[0], 'La Piedra le gana a las Tijeras. ¡Ganaste! GivePLZ ')
                }

            }
            else
            {
                if(choice1 === 'papel')
                {
                    if(choice2 === 'piedra')
                    {
                        client.say(opciones.channels[0], 'El Papel le gana a la Piedra. ¡Ganaste!')
                    
                    }
                    else 
                    {
                    client.say(opciones.channels[0], '¡Te cortaron el mil pedazos y pierdes! Kappa')
                    }
                }
            }
            if(choice1 === 'tijeras')
            {
                if(choice2 === 'piedra')
                {
                    client.say(opciones.channels[0], 'La piedra rompe a la tijera. Yo Gano Kappa')
                }
                else
                {
                    client.say(opciones.channels[0], '¡Cortas a tu oponente y ganas la partida! GivePLZ')
                }
            }
        
        }
    } 
  console.log(userChoice)
  console.log(computerChoice)
  compare(userChoice, computerChoice)
}


function slowMode(args) {

    var time = args;

    if(time == undefined) {
        client.say(opciones.channels[0], '¡Tienes que ingresar el tiempo en segundos! VoHiYo')
        return;

    }
    else if (time === 'stop')
    {
        client.say(opciones.channels[0], `¡Desactivando Slowmode! GivePLZ`)
        client.say(opciones.channels[0], `/slowoff`)

    }
    else {
        client.say(opciones.channels[0], `¡Slowmode de ${time} Segundos Activado! GivePLZ`)
        client.say(opciones.channels[0],  `/slow ${time}`)
    } 


}

