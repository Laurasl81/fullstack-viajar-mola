import React, { Component } from 'react'
import TripService from '../../../service/TripService'
import FilesService from '../../../service/FilesService'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import { Container } from 'react-bootstrap';


class NewTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            trip: {
                title: '',
                duration: '0',
                season: '',
                price: '0',
                image: '',
                steps: '',
                informationTitle: '',
                informationGallery: '',
                informationPriceIncludes: '',
                informationDescription: '',
                tripType: '',
                //activities: '',
                //informationCountry: '',
                //destination: ''

            }

        }
        this.TripService = new TripService()
        this.filesService = new FilesService()
    }

    handleInputChange = e => {
        const { name, value } = e.target
        this.setState({ trip: { ...this.state.trip, [name]: value } })
    }


    handleFileUpload = (e, type) => {

        const uploadData = new FormData()
        uploadData.append("imageUrl", e.target.files[0])

        this.filesService.handleUpload(uploadData)
            .then(response => {
                console.log('Subida de archivo finalizada! La URL de Cloudinray es: ', response.data.secure_url)
                if (type === "gallery") {
                    this.setState({ trip: { ...this.state.trip, informationGallery: response.data.secure_url } })
                } else {
                    this.setState({ trip: { ...this.state.trip, image: response.data.secure_url } })
                }
            })
            .catch(err => console.log(err))
    }



    handleFormSubmit = e => {
        //console.log(this.state);
        e.preventDefault()
        this.TripService
            .createTrips(this.state.trip)
            .then(response => {
                this.props.handleToast(true, 'viaje creado')
                this.cleanState()
            })
            .catch(err => {
                this.props.handleToast(true, err.response.data.message)
            })
    }

    //vacia el formulario
    cleanState = () => {
        this.setState({
            trip: {
                title: '',
                duration: '0',
                season: '',
                price: '0',
                image: '',
                steps: '',
                informationTitle: '',
                informationGallery: '',
                informationPriceIncludes: '',
                informationDescription: '',
                tripType: '',
                //activities: '',
                //informationCountry: '',
                //destination: ''

            }
        })
    }

    render() {
        console.log(this.state.trip);

        return (
            <Container>
                <h1>Viaje</h1>

                <Form onSubmit={this.handleFormSubmit}>

                    <Form.Group>
                        <Form.Label>Imagen Viaje</Form.Label>
                        <Form.Control name="image" type="file" onChange={this.handleFileUpload} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Título</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.trip.title} name="title" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Duración</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.trip.duration} name="duration" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Temporada</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.trip.season} name="season" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Precio</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.trip.price} name="price" type="number" />
                    </Form.Group>

                    {/* <Form.Group>
                        <Form.Label>Paradas</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.trip.steps} name="steps" type="text" />
                    </Form.Group> */}

                    <Form.Group>
                        <Form.Label>Titulo información</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.trip.informationTitle} name="informationTitle" type="text" />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Imagen de información</Form.Label>
                        <Form.Control name="informationGallery" type="file" onChange={(e) => this.handleFileUpload(e, 'gallery')} />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>¿Qué incluye el precio?</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.trip.informationPriceIncludes} name="informationPriceIncludes" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Descripción del Viaje</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.trip.informationDescription} name="informationDescription" type="text" />
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Tipo de Viaje</Form.Label>
                        {/* <Form.Control onChange={this.handleInputChange} value={this.state.trip.tripType} name="tripType" type="text" /> */}
                        <Form.Control as="select" onChange={this.handleInputChange} value={this.state.trip.tripType} name="tripType" >
                            <option value="">Selecciona tipo de viaje</option>
                            <option value="single">Single</option>
                            <option value="grupos">Grupos</option>
                            <option value="grupo-reducido">Grupos reducidos</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Destino</Form.Label>
                        {/* <Form.Control onChange={this.handleInputChange} value={this.state.trip.tripType} name="tripType" type="text" /> */}
                        <Form.Control as="select" onChange={this.handleInputChange} value={this.state.trip.destination} name="destination" >
                            <option value="">Selecciona un destino</option>
                            <option value="europa">Europa</option>
                            <option value="asia">Asia</option>
                            <option value="america">America</option>
                        </Form.Control>
                    </Form.Group>


                    {/* <Form.Group>
                        <Form.Label>Actividades Destacadas</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.trip.activities} name="activities" type="text" />
                    </Form.Group> */}

                    {/* <Form.Group>
                        <Form.Label>Informacion del País</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.trip.informationCountry} name="informationCountry" type="text" />
                    </Form.Group> */}

                    {/* <Form.Group>
                        <Form.Label>Destino</Form.Label>
                        <Form.Control onChange={this.handleInputChange} value={this.state.trip.destination} name="destination" type="text" />
                    </Form.Group> */}

                    <Button variant="dark" type="submit">Crear Viaje</Button>
                </Form>
            </Container>

        )
    }
}

export default NewTrip;
