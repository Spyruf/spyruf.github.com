function time() {


    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!

    var yyyy = today.getFullYear();
    if (dd < 10) {
        dd = '0' + dd
    }
    if (mm < 10) {
        mm = '0' + mm
    }
    var today = mm + '/' + dd + '/' + yyyy;
    document.getElementById("Date").innerHTML = today;

}

var animated = ["Aladdin", "Lion King", "Tangled", "Finding Nemo", "Mulan"];
var musical = ["Hairspray", "Grease", "Annie", "Les Miserables"];
var action = ["Avengers", "Hunger Games", "X-men", "Mission Impossible", "Terminator"];
var comedy = ["21 Jump Street", "The Hangover", "The Internship", "Horrible Bosses"];