let widthCanva = 1920;
let heightCanva = 1080;
const canvas = document.getElementById('c');
const ctx = canvas.getContext('2d');
const socket = io();
let autresPos = {}

socket.on('players', function (players) {
    autresPos = {}
    Object.keys(players).forEach(function (id) {
        autresPos[id] = {x: players[id].x, y:players[id].y};
    })
    console.log(autresPos)
})

function updateWindowPosition() {
    socket.emit('getPlayers', socket.id);
    const windowX = window.screenX || window.screenLeft || window.pageXOffset || 0;
    const windowY = window.screenY || window.screenTop || window.pageYOffset || 0;

    const windowPosition = document.getElementById('windowPosition');
    let c = document.querySelector("#c");
    c.style.top = -windowY + "px";
    c.style.left = -windowX + "px";
    

 
    let myCenterX = window.innerWidth/2+windowX;
    let myCenterY = window.innerHeight/2+windowY;
    
    socket.emit('user_info', {id: socket.id, x: myCenterX, y: myCenterY});



    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // Dessiner un point au centre du canvas
    ctx.fillStyle = 'red';
    ctx.beginPath();
    ctx.arc(myCenterX, myCenterY, 5, 0, Math.PI * 2);
    ctx.fill();


    // Dessiner un point au centre du canvas
    ctx.fillStyle = 'blue';
    ctx.beginPath();
    ctx.arc(widthCanva/2, heightCanva/2, 5, 0, Math.PI * 2);
    ctx.fill();

                
    // test autres
    ctx.fillStyle = 'green';
    windowPosition.innerHTML = ""

    if(autresPos){

        Object.keys(autresPos).forEach(function (id) {
            windowPosition.innerHTML = windowPosition.innerHTML + autresPos[id].x + " " + autresPos[id].y + "\n";
            ctx.beginPath();
            ctx.arc(autresPos[id].x, autresPos[id].y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
        
    }

    if (autresPos && Object.keys(autresPos).length > 1) {
        const keys = Object.keys(autresPos);
        
        // Dessiner des points pour chaque joueur
        keys.forEach(function (id) {
            windowPosition.innerHTML = windowPosition.innerHTML + autresPos[id].x + " " + autresPos[id].y + "\n";
            ctx.beginPath();
            ctx.arc(autresPos[id].x, autresPos[id].y, 5, 0, Math.PI * 2);
            ctx.fill();
        });
    
        // Relier les points avec des lignes
        ctx.strokeStyle = 'blue';if (autresPos && Object.keys(autresPos).length > 1) {
            const keys = Object.keys(autresPos);
            
            // Dessiner des points pour chaque joueur
            keys.forEach(function (id) {
                windowPosition.innerHTML = windowPosition.innerHTML + autresPos[id].x + " " + autresPos[id].y + "\n";
                ctx.beginPath();
                ctx.arc(autresPos[id].x, autresPos[id].y, 5, 0, Math.PI * 2);
                ctx.fill();
            });
        
            // Relier les points avec des lignes
            ctx.strokeStyle = 'blue';
            ctx.lineWidth = 2;
        
            for (let i = 0; i < keys.length - 1; i++) {
                const currentPos = autresPos[keys[i]];
                const nextPos = autresPos[keys[i + 1]];
        
                ctx.beginPath();
                ctx.moveTo(currentPos.x, currentPos.y);
                ctx.lineTo(nextPos.x, nextPos.y);
                ctx.stroke();
            }
        
            // Relier le dernier point au premier pour fermer la boucle
            const lastPos = autresPos[keys[keys.length - 1]];
            const firstPos = autresPos[keys[0]];
        
            ctx.beginPath();
            ctx.moveTo(lastPos.x, lastPos.y);
            ctx.lineTo(firstPos.x, firstPos.y);
            ctx.stroke();
        }
        ctx.lineWidth = 2;
    
        for (let i = 0; i < keys.length - 1; i++) {
            const currentPos = autresPos[keys[i]];
            const nextPos = autresPos[keys[i + 1]];
    
            ctx.beginPath();
            ctx.moveTo(currentPos.x, currentPos.y);
            ctx.lineTo(nextPos.x, nextPos.y);
            ctx.stroke();
        }
    
        // Relier le dernier point au premier pour fermer la boucle
        const lastPos = autresPos[keys[keys.length - 1]];
        const firstPos = autresPos[keys[0]];
    
        ctx.beginPath();
        ctx.moveTo(lastPos.x, lastPos.y);
        ctx.lineTo(firstPos.x, firstPos.y);
        ctx.stroke();
    }

}


// Appel initial pour afficher la position initiale de la fenêtre
updateWindowPosition();

setInterval(updateWindowPosition, 1);