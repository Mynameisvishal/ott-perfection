import React,{useState} from 'react'
import moneyheist from '../images/moneyheist.jpg';
import { Button,Form,Input, Icon, Modal } from 'semantic-ui-react'
import "./Banner.css";

function Banner({defaultMovies,setDefaultMovies}) {
    const [modal, setModal] = useState(false);
    const [movieName, setMovieName] = useState('');
    const [movieDesc, setMovieDesc] = useState('');
    const [movieGenre, setMovieGenre] = useState('');
    const [movieLang, setMovieLang] = useState('');
    const [movieRating, setMovieRating] = useState(0);
    const banner = {
        3: {
          image: moneyheist,
          Title: "Money Heist",
          description: "Money Heist (Spanish: La casa de papel, \"The House of Paper\") is a Spanish heist crime drama television series created by Álex Pina. The series traces two long-prepared heists led by the Professor (Álvaro Morte), one on the Royal Mint of Spain, and one on the Bank of Spain.",
        },
    };
    const closeModal = () => {
        setModal(false);
    }
    const openModal = () => {
        setModal(true);
    }
    const addFile = (event) => {
        const file = event.target.files[0];
        const reader = new FileReader();
        reader.addEventListener('load', () => {
            localStorage.setItem('recentImage', reader.result);
        })
        reader.readAsDataURL(file);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        var date = new Date();
        const image = (localStorage.getItem('recentImage'));
        if (isFormValid(movieName,movieDesc,movieGenre,movieLang)) {
            var subs = [];
            subs.push(movieGenre);
            if (movieRating < 6 && movieRating > 0) {
                const callby = movieName.split(" ").join();
                console.log(callby);
                const adventure = {
                    [callby]: {
                        name: movieName,
                        image: image,
                        callby: callby,
                        description: movieDesc,
                        genre: subs,
                        language: movieLang,
                        addedTime: date.getTime(),
                        rating: movieRating,
                    }
                };
                console.log(adventure);
                setMovieName('');
                setMovieDesc('');
                setMovieGenre('');
                setMovieLang('');
                setMovieRating(0);
                const Movies = { ...defaultMovies, ...adventure };
                setDefaultMovies(Movies);
                setModal(false);
            }
            
        }
    };
  
    const isFormValid = ( MovieName, MovieDetails, Genre, Language ) =>
    MovieName && MovieDetails && Genre && Language;
  
    return (
        <header className="banner">
            <div className="banner__contents">
                <h1 className="banner__title">{banner[3].Title}</h1>
                <div className="banner__buttons">
                    <button className="banner__button">Play</button>
                    <button className="banner__button">My List</button>
                </div>
                <h1 className="banner__description">
                    {banner[3].description}
                </h1>
            </div>
  
            <div className="banner__fade " />
            <div>
                <span className="banner__addback">
                    <Icon className={`banner__add ${JSON.parse(localStorage.getItem('admin')) === 1 ? "banner__visible" : ""}`} size='big' name="add" onClick={openModal} />
                </span>
    
                <Modal basic open={modal} onClose={closeModal}>
                    <Modal.Header>Add Movie</Modal.Header>
                    <Modal.Content>
                        <Form
                            onSubmit={handleSubmit }
                        >
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Movie Name"
                                    name="MovieName"
                                    placeholder="Enter the movie name."
                                    onChange={(e)=>{setMovieName(e.target.value)}}
                                />
                            </Form.Field>
  
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Enter Description"
                                    name="MovieDetails"
                                    placeholder="Enter movie description"
                                    onChange={(e)=>{setMovieDesc(e.target.value)}}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Enter Genre"
                                    name="Genre"
                                    placeholder="Enter Genre[Action Movies,Comedy Movies,Crime Movie,Romantic Movie]"
                                    onChange={(e)=>{setMovieGenre(e.target.value)}}                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Language"
                                    name="Language"
                                    placeholder="Enter language."
                                    onChange={(e)=>{setMovieLang(e.target.value)}}                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Rating"
                                    name="rating"
                                    placeholder="Enter rating between 1-5."
                                    onChange={(e)=>{setMovieRating(e.target.value)}}                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    type="file"
                                    fluid
                                    label="Insert image"
                                    name="Image"
                                    onChange={addFile}                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted
                            onClick={handleSubmit }
                        >
                            <Icon name="checkmark" /> Add
              </Button>
                        <Button color="red" inverted onClick={closeModal}>
                            <Icon name="remove" /> Cancel
              </Button>
                    </Modal.Actions>
                </Modal>
            </div>
        </header>
    );
}

export default Banner
