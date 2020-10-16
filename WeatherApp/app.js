$(document).ready(function () {
    let sum = 0;


    $("#btn").click(function () {
        document.getElementById("ispis").innerHTML = " ";
        let grad = $("#grad").val();
        let jedinica = $("#jedinica").val();
        let input = $("#unesi").val();
        if (input > 7){
            alert("Maksimalni prikaz je 7 dana");
            return;
        }
        let link = "https://api.openweathermap.org/data/2.5/forecast/daily?q=" + grad + "&units=" + jedinica + "&cnt=" + input + "&mode=js on&appid=1b1d0ad1ab386b48e8311d1e61b27554";
        

        $.ajax({
            url: link,
            dataType: 'json',
            success: function (result) {
                console.log(result);

                let prognoza = result.list;

                for (const key in prognoza) {

                    const element = prognoza[key];



                    prikaziPrognozu(element, key);


                    

                }



            }
        })
    })

    function prikaziPrognozu(element, key) {
        
        let ispis = document.getElementById("ispis");

        let div = document.createElement("div");

        div.setAttribute("id", "insidediv" + key);
        div.style.padding = "10px";
        div.style.fontSize = "30px";
        let dan = parseInt(key) + 1;
        let dugme = document.createElement("button");
        dugme.setAttribute("id", "btn" + key);
        dugme.innerHTML = "Min/Max";
        let p = document.createElement("p");
        p.setAttribute("id", "napisi" + key);
        p.style.fontSize = "14px";

        p.style.paddingLeft = "10px";
        p.style.paddingRight = "10px";

        let d = new Date(element.dt * 1000);
        let b = d.getDay();
            if (b == 1) {
             b = "Ponedeljak";
        }
            if (b == 2) {
            b = "Utorak"
            }
            if (b == 3) {
                b = "Sreda";
            }
            if (b == 4) {
                b = "Cetvrtak";
            }
            if (b == 5) {
                b = "Petak";
            }
            if (b == 6) {
                b = "Subota";
            }
            if (b == 0) {
                b = "Nedelja";
            } 

            console.log(d.getDay());
            console.log(d);
            let celsi = "°C";
            let faren = "°F";
            let kelvi = "K"
            if (jedinica.value == "metric"){
                div.innerHTML = b + " - " + element.temp.day + celsi;
            }
            if(jedinica.value == ""){
                div.innerHTML = b + " - " + element.temp.day + kelvi;
            }
            if(jedinica.value == "imperial"){
                div.innerHTML = b + " - " + element.temp.day + faren;
            }
            


            //div.innerHTML = b + " - " + element.temp.day +  + " ";






            div.appendChild(dugme);
            div.appendChild(p);
            ispis.appendChild(div);


            $("#btn" + key).click(function () {
               
                //document.getElementById("napisi" + key).innerHTML = "Minimalna temperatura je " + element.temp.min + " / " + " Maksimalna temperatura je " + element.temp.max;
                if (jedinica.value == "metric"){
                    document.getElementById("napisi" + key).innerHTML = "Minimalna temperatura je " + element.temp.min +celsi+ " / " + " Maksimalna temperatura je " + element.temp.max+celsi;
                }
                if(jedinica.value == ""){
                    document.getElementById("napisi" + key).innerHTML = "Minimalna temperatura je " + element.temp.min +kelvi+ " / " + " Maksimalna temperatura je " + element.temp.max+kelvi;
                }
                if(jedinica.value == "imperial"){
                    document.getElementById("napisi" + key).innerHTML = "Minimalna temperatura je " + element.temp.min +faren+ " / " + " Maksimalna temperatura je " + element.temp.max+faren;
                }
               



            });


        }



    })

