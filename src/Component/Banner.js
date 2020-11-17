import React from 'react'
import moneyheist from '../images/moneyheist.jpg';
import "./Banner.css";

function Banner() {
    const banner = {
        3: {
          image: moneyheist,
          Title: "Money Heist",
          description: "Money Heist (Spanish: La casa de papel, \"The House of Paper\") is a Spanish heist crime drama television series created by Álex Pina. The series traces two long-prepared heists led by the Professor (Álvaro Morte), one on the Royal Mint of Spain, and one on the Bank of Spain.",
        },
      };
  
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
  
            <div className="banner__fade" />
            {/* <div>
                <span className="banner__addback">
                
                    <Icon className={`banner__add ${JSON.parse(localStorage.getItem('admin')) === 1 ? "banner__visible" : ""}`} size='big' name="add" onClick={this.openModal} />
                </span> */}
    
                {/* <Modal basic open={modal} onClose={this.closeModal}>
                    <Modal.Header>Add Movie</Modal.Header>
                    <Modal.Content>
                        <Form onSubmit={this.handleSubmit} >
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Movie Name"
                                    name="MovieName"
                                    placeholder="Enter the movie name."
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
  
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Enter Description"
                                    name="MovieDetails"
                                    placeholder="Enter movie description"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Enter Genre"
                                    name="Genre"
                                    placeholder="Enter Genre[Action Movies,Comedy Movies,Crime Movie,Romantic Movie]"
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Language"
                                    name="Language"
                                    placeholder="Enter language."
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    fluid
                                    label="Rating"
                                    name="rating"
                                    placeholder="Enter rating between 1-5."
                                    onChange={this.handleChange}
                                />
                            </Form.Field>
                            <Form.Field>
                                <Input
                                    type="file"
                                    fluid
                                    label="Insert image"
                                    name="Image"
                                    onChange={this.addFile}
                                />
                            </Form.Field>
                        </Form>
                    </Modal.Content>
                    <Modal.Actions>
                        <Button color="green" inverted onClick={this.handleSubmit}>
                            <Icon name="checkmark" /> Add
              </Button>
                        <Button color="red" inverted onClick={this.closeModal}>
                            <Icon name="remove" /> Cancel
              </Button>
                    </Modal.Actions>
                </Modal> */}
            {/* </div> */}
        </header>
    );
}

export default Banner
