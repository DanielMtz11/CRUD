const http = require("http");
const fs = require("fs/promises");
const path = require("path");


// obtener, crear, actulizar y eliminar usuarios dentro de un JSON

//si la ruta es diferente de users respondemos: "recurso no disponible"
const app = http.createServer(async(request, response)=>{
    const methodo = request.method;
    const url = request.url;
    // const path = path.resolve()
    
    const usersPath = path.resolve("./files/users.json");
    console.log(methodo);
    
    if(url === "/users")
    {
        if(methodo === "GET" )
        {
            response.write("GET en user");
            const users = await fs.readFile(usersPath, "utf-8");
            response.write(users);
        }

        if(methodo === "POST")//actualizar
        {
            //todo 1.- Leer el archivo ------------------------------> fs.ReadFile()
            //todo 2.- Convertir el archivo JSON en un array --------> JSON.parse()
            //todo 3.- Push al array (la informacion que nos envian desde el front) ()
            //todo 4.- Convertir el array en JSON  ------------------> JSON.stringlyfy()
            //todo 5.- Escribir el JSON en el archivo //fs. ---------> fs.writeFile()

            // 1.-
            const dataJSON = await fs.readFile(usersPath, "utf-8");

            //2.-
            const arrUsers = JSON.parse(dataJSON);

            //leer el body de la peticion -----> event.emitter// similar a addEventListener()
            //*estamos escuchando un evento "data" que realmente es la informacion que viene en el body de la peticion
            request.on("data", (data) => {
            //2.-
                const user = JSON.parse(data);

            //3
                arrUsers.push(user);

            //4
                const newUser = JSON.stringify(arrUsers);

            //5
                fs.writeFile(usersPath, newUser);
                // console.log(users);
        });
        }
        

        if(methodo === "DELETE"){

            const JSONdata = await fs.readFile(usersPath, "utf-8");
            const Users = JSON.parse(JSONdata);
            console.log(Users);

            
            request.on("data", (data)=>{
                const userData = JSON.parse(data);
                // console.log(userData?.name);
                // console.log(userData?.age);
                // console.log(userData?.country);


                console.log(Users);

                Users.forEach((user) => {
                    // console.log(`${user.name} ${user.age} ${user.country}`);


                    if(user.name !== userData.name && user.age !== userData.age && user.country !== userData.country){
                        console.log(...JSONdata);
                    }


                });


                // console.log( Users.includes(userData));

                

                
                                        // userData.forEach(data =>{
                                        //     console.log(data);
                                        // });
            })
        }
    }
    else{
        response.write("recurso no disponible");
    }
    response.end();
});

const PORT = 3000;
app.listen(PORT);
console.log("readding server");