import React,{useState} from 'react'
import "./Row.css";
import { ACTIONS } from '../App';
import { Modal, Image,Header,Button,Icon ,Rating} from 'semantic-ui-react';

function Row({ title, fetchURL, Largeone, dispatch, handler,defaultMovies,setDefaultMovies }) {
    
    const [modal, setModal] = useState(false);
    const [movie, setMovie] = useState({});
    const [rating, setRating] = useState(2);
    const closeModal = () => setModal(false);

    const makeModalOn = (value) => {
        if (JSON.parse(localStorage.getItem('admin')) === 1) {
            
        } else {
            
            setMovie(value);
            setModal(true);
        }
    }

    const submit = () => {
        dispatch({ type: ACTIONS.ADD_RATING, payload: { movie: movie, rating: rating,setDefaultMovies: setDefaultMovies,defaultMovies: defaultMovies } });
        setModal(false);
    }
    const handleRate = (e, { rating }) => {
        setRating(rating);
    }
    return (
        <React.Fragment>
            <div className="row">
                <h2 className="row__title">{title}</h2>
                <div className="row__posters">
                    {
                        fetchURL.map((value, key) => (
                            <img key={key} src={value.image} onClick={() => { makeModalOn(value) }} className={`row__poster ${Largeone && "row__large"}`} alt="" />
                        ))
                    
                    }
                </div>
            </div>
            <Modal basic open={modal} onClose={closeModal}>
                <Modal.Header>Add Rating</Modal.Header>
                <div className="modal__flex">

                    <Modal.Content image>
                        <Image size='small' src={movie.image} wrapped />
                   
                    </Modal.Content>
                    <Modal.Content>
                        <Modal.Description className="modal__description">
                            <Header className="modal__header">{movie.name}</Header>
                            <div>
                                {movie.description}
                            </div>
                            <div>     < Rating icon='star' onRate={handleRate} defaultRating={movie.rating} maxRating={5} /> </div>
                        </Modal.Description>
                    </Modal.Content>
                </div>
                <Modal.Actions>
                    <Button color="green" inverted onClick={() => { submit() }}>
                        <Icon name="checkmark" /> Add
                    </Button>
                    <Button color="red" inverted onClick={closeModal}>
                        <Icon name="remove" /> Cancel
                    </Button>
                </Modal.Actions>
            </Modal>
        </React.Fragment>
    )
}

export default Row
