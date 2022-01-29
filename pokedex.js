
// Evento para ejecutar cuando se cargue el html
window.addEventListener('load', () => {   
    const list = document.getElementById('pokedex');

    const promises = [];

    for (let i=1; i <= 150; i++){
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then(res => res.json()));
        
    }
   
   
   Promise.all(promises).then(results =>{ 
       //mapeamos el contenido que queremos de los valores obtenidos con el fetch
       const pokemon = results.map(result =>({
           name:result.name,
        //    image: result.sprites['front_default'],
            image: result.sprites.other.dream_world.front_default,
           type: result.types.map(type => type.type.name).join(','),
           id: result.id,
           abilities: result.abilities.map (ability => ability.ability.name).join(', '),
           height: result.height,
           stats: result.stats
       }));

       console.log(results[0]);

       displayPokemon(pokemon);
       return pokemon;
    })

    // recibe el valor de la funcion anterior 'pokemon' en 'results'
    .then ((results) =>{
        
        //selecciona todos los div class='box'
        const boxes = document.querySelectorAll('.box');
        
        //a cada 'box' se le añade un evento 'mouseenter' para girar el objeto y que aparezca la parte de atras
        boxes.forEach(box => box.addEventListener('mouseenter', (e) => {console.log('hover');
        console.log(e.target);

        //selecciona los objetos 'box-back', 'box-front' y 'card-title' del elemento que ha generado el evento
        const divBack = e.target.querySelector('.box-back');
        const divFront = e.target.querySelector('.box-front');
        const name = divFront.querySelector('.card-title').innerText;

        //busca el pokemon del elemento que ha generado el evento mediante la variable name
        const pokemon = results.find(result => result.name == name.toLowerCase());
        console.log(pokemon);
        
        //crea las filas de la tabla de estadisticas
        const  rows = pokemon.stats.map(stat =>`<tr><td>${stat.stat.name}</td><td>${stat.base_stat}</td><td>${stat.effort}</td></tr>`).join('');
     
        //rellena el divBack
        divBack.innerHTML = `<li class='card-back'>
        <div>
        <p class='card=subtitle'>Abilities: ${pokemon.abilities}</p>
        <p class='card=subtitle'>Height: ${pokemon.height}</p>
        </div>
        <div>
        <table>
            <thead>
                <tr>
                    <th>Nombre</th>
                    <th>Base</th>
                    <th>Effort</th>
                </tr>
            </thead>
            <tbody>
                ${rows}
            </tbody>
        </table>
        </dvi>
        </li>`

        
       }));
       
    });

    const displayPokemon = (pokemon) => {
        const myPokemon = pokemon.map( poke =>
            `
            <div class='box'>
            <div class="box-inner">
            <div class="box-front">
            <li class='card'><h2 class='card-title'>${poke.name}</h2>
            <img class='card-image' src='${poke.image}'/>
            <p class='card=subtitle'>${poke.type}</p>
            <p class='card=subtitle'>${poke.id}</p>
            </li>
            </div>
            <div class="box-back">back face</div>
            </div>
            </div> 
            `
        ).join('');

        list.innerHTML = myPokemon;
                
    }
   
});