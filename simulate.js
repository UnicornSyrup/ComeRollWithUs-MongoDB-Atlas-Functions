// This function is the endpoint's request handler.
exports = function({ query, headers, body}, response) {
    const MAX_PLAYERS = 6;

        players = [];

        timesteps = [];
        names = ["Bobulous", "John Fish", "Betty", "Karen", "Gray Bowl", "Craig Chair", "Rita", "Feta Cheese Lady", "Bonnie", "Rock", "Sneddles", "David", "Glavid", "Davis", "Mavis", "Gravis", "Stavis",
        "The Nation of France", "Selena", "Remy", "Boblert", "Janet", "Beefstick", "Alan", "Alan's Mother", "Stephen", "Murphy"]
        for (i = 0; i < MAX_PLAYERS; i++) {
            let playerTemplate = {
                "id": i,
                "name": names.pop(Math.floor(Math.random()*names.length)),
                "stats": {
                    "slippery": 1 + Math.random() * 4,
                    "kick": 1 + Math.random() * 4,
                    "friction": 1 + Math.random() * 4,
                    "water": 1 + Math.random() * 4,
                    "tough": 1 + Math.random() * 4,
                    "mana": 1 + Math.random() * 4,
                    "cunning": 1 + Math.random() * 4,
                    "wit": 1 + Math.random() * 4,
                    "bribery": 1 + Math.random() * 4,
                }
            };
            players.push(playerTemplate);
        }
        
        function baseMovement(stats) {
            move = 3;
            move = move * Math.random()
            speedAvg = (stats.slippery + stats.kick + stats.friction) / 3;
            move += speedAvg;
            return move;
        }
        
        
        function movement(stats) {
            let movement = baseMovement(stats);
            let message = "";
            // crash
            if (Math.random() < ((5 - stats.wit) / 10))
            {
                console.log("crash")
                message = "crash";
                movement = 0;
            } 
            // pass
            else if (Math.random() < (stats.cunning / 5) * 0.05)
            {
                console.log("pass")
                message = "pass";
                movement += 2;
            }
            // out of water
            else if (Math.random() < ((5 - stats.water) / 5) * 0.05)
            {
                console.log("water")
                message = "water";
                movement = 0;
            }
            // injury
            else if (Math.random() < ((5 - stats.tough) / 5) * 0.05)
            {
                console.log("injury")
                message = "injury";
                movement = 0;
            }
        
        
            return [movement, message];
        }
                
        for (t = 0; t < 100; t++)
        {
            let step = {"messages": [], "positions": []};
            for (i = 0; i < MAX_PLAYERS; i++)
            {
                let resp = movement(players[i]["stats"]);
                if (resp[1] != "") {
                    step["messages"].push(resp[1]);
                }
                if (t == 0) {
                  step["positions"].push(resp[0]);
                } else {
                  step["positions"].push(timesteps[t - 1]["positions"][i] + resp[0]);
                }
            }
            timesteps.push(step);
        }
    
    context.services.get("Cluster0").db("Cluster0").collection("races").deleteMany({});
    context.services.get("Cluster0").db("Cluster0").collection("races").insertOne({"players": players, "timesteps": timesteps});
    
    return;
};
