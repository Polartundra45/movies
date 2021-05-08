const mongoose = require('mongoose');
const Movie = require('./models/movie')

mongoose.connect(, {
    useNewUrlParser: true, 
    useUnifiedTopology: true, 
    useFindAndModify: false,
    useCreateIndex: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection failed'));
db.once('open', () => {
    console.log('db connected');
});

const newMovies = [
    {
        image: 'https://thefirstruleoffilmclub.files.wordpress.com/2013/03/the-shining.jpg', 
        title: 'The Shining', 
        released: 1980,
        rating: 8.4,
        description: "Jack Torrance (Jack Nicholson) becomes winter caretaker at the isolated Overlook Hotel in Colorado, hoping to cure his writer's block. He settles in along with his wife, Wendy (Shelley Duvall), and his son, Danny (Danny Lloyd), who is plagued by psychic premonitions. As Jack's writing goes nowhere and Danny's visions become more disturbing, Jack discovers the hotel's dark secrets and begins to unravel into a homicidal maniac hell-bent on terrorizing his family."
    }, 
    {
        image: 'https://m.media-amazon.com/images/M/MV5BNGViZWZmM2EtNGYzZi00ZDAyLTk3ODMtNzIyZTBjN2Y1NmM1XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg', 
        title: 'The Thing', 
        released: 1982,
        rating: 8.1, 
        description: "In remote Antarctica, a group of American research scientists are disturbed at their base camp by a helicopter shooting at a sled dog. When they take in the dog, it brutally attacks both human beings and canines in the camp and they discover that the beast can assume the shape of its victims. A resourceful helicopter pilot (Kurt Russell) and the camp doctor (Richard Dysart) lead the camp crew in a desperate, gory battle against the vicious creature before it picks them all off, one by one."
    }, 
    {
        image: "https://upload.wikimedia.org/wikipedia/en/e/e7/Jurassic_Park_poster.jpg",
        title: 'Jurassic Park',
        released: 1993,
        rating: 8.1,
        description: "paleontologists Alan Grant (Sam Neill) and Ellie Sattler (Laura Dern) and mathematician Ian Malcolm (Jeff Goldblum) are among a select group chosen to tour an island theme park populated by dinosaurs created from prehistoric DNA. While the park's mastermind, billionaire John Hammond (Richard Attenborough), assures everyone that the facility is safe, they find out otherwise when various ferocious predators break free and go on the hunt."
    },
    {
        image: 'https://m.media-amazon.com/images/M/MV5BMmVmODY1MzEtYTMwZC00MzNhLWFkNDMtZjAwM2EwODUxZTA5XkEyXkFqcGdeQXVyNTAyODkwOQ@@._V1_.jpg',
        title: 'Jaws',
        released: 1975,
        rating: 8,
        description: "When a young woman is killed by a shark while skinny-dipping near the New England tourist town of Amity Island, police chief Martin Brody (Roy Scheider) wants to close the beaches, but mayor Larry Vaughn (Murray Hamilton) overrules him, fearing that the loss of tourist revenue will cripple the town. Ichthyologist Matt Hooper (Richard Dreyfuss) and grizzled ship captain Quint (Robert Shaw) offer to help Brody capture the killer beast, and the trio engage in an epic battle of man vs. nature."
    }
];

Movie.insertMany(newMovies)
    .then((res) => {
        console.log(res);
    })
    .catch((error) => {
        console.log(error);
    })