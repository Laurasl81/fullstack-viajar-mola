import React, { Component } from 'react'
import TripService from '../../../service/TripService'
import FilesService from '../../../service/FilesService'
import { Container, Button, Modal, Form } from 'react-bootstrap';



class NewTrip extends Component {
    constructor(props) {
        super(props);
        this.state = {
            showModal: false,
            trip: {
                title: '',
                duration: '0',
                season: '',
                price: '0',
                image: '',
                steps: [],
                informationTitle: '',
                informationGallery: '',
                informationPriceIncludes: '',
                informationDescription: '',
                tripType: '',
                activities: [],
                destination: ''
            },
            inputSteps: '',

            inputActivities: {
                activityPhoto: '',
                activityTitle: '',
                activityDescription: ''
            }


        }
        this.TripService = new TripService()
        this.filesService = new FilesService()
    }

    handleModal = status => this.setState({ showModal: status })

    handleInputChange = e => {
        const { name, value } = e.target
        if (name === "inputSteps") {
            this.setState({ inputSteps: value })
        } else {

            this.setState({ trip: { ...this.state.trip, [name]: value } })
        }

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

    addTripSteps = () => {
        const stepsCopy = [...this.state.trip.steps]
        stepsCopy.push(this.state.inputSteps)
        this.setState({ trip: { ...this.state.trip, steps: stepsCopy } })
        this.setState({
            inputSteps: ''
        })
    }

    deleteStep = idx => {
        const stepsCopy = [...this.state.trip.steps]
        stepsCopy.splice(idx, 1)
        this.setState({ trip: { ...this.state.trip, steps: stepsCopy } })
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
                steps: [],
                informationTitle: '',
                informationGallery: '',
                informationPriceIncludes: '',
                informationDescription: '',
                tripType: '',
                activities: [],
                destination: ''

            }
        })
    }


    render() {
        console.log(this.state);

        return (
            <Container className='my-5'>
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
                        <Form.Control as="select" onChange={this.handleInputChange} value={this.state.trip.tripType} name="tripType" >
                            <option value="">Selecciona tipo de viaje</option>
                            <option value="single">Single</option>
                            <option value="grupos">Grupos</option>
                            <option value="grupo-reducido">Grupos reducidos</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Destino</Form.Label>
                        <Form.Control as="select" onChange={this.handleInputChange} value={this.state.trip.destination} name="destination" >
                            <option value="">Selecciona un destino</option>
                            <option value="europa">Europa</option>
                            <option value="asia">Asia</option>
                            <option value="america">America</option>
                        </Form.Control>
                    </Form.Group>

                    <Form.Group>
                        <Form.Label>Paradas del viaje</Form.Label>
                        <div className="d-flex">
                            <Form.Control onChange={this.handleInputChange} value={this.state.inputSteps} name="inputSteps" type="text" style={{ width: '50%' }} />
                            <Button variant="info" onClick={this.addTripSteps} className='ml-5 w-50' >Añadir parada</Button>
                        </div>
                    </Form.Group>
                    <div>
                        {this.state.trip.steps.map((elm, idx) => <Button variant="outline-secondary" className='mr-3' key={idx} onClick={() => this.deleteStep(idx)}> {elm} </Button>)}
                    </div>

                    <Button className="mb-3 d-block" onClick={() => this.handleModal(true)} variant="dark" size="sm" style={{ marginBottom: '20px' }}>Añadir actividad</Button>


                    <Button variant="dark" className='mt-3' type="submit">Crear Viaje</Button>
                </Form>

                <Modal size="lg" show={this.state.showModal} onHide={() => this.handleModal(false)}>
                    <Modal.Body>
                        <h1>Actividades</h1>
                        <Form.Group>
                            <Form.Label>Título actividad</Form.Label>
                            <Form.Control onChange={this.handleInputChange} value={this.state.inputActivities.activityTitle} name="activityTitle" type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Descripción de la actividad</Form.Label>
                            <Form.Control onChange={this.handleInputChange} value={this.state.inputActivities.activityDescription} name="activityDescription" type="text" />
                        </Form.Group>

                        <Form.Group>
                            <Form.Label>Imagen de la actividad</Form.Label>
                            <Form.Control name="activityPhoto" type="file" onChange={(e) => this.handleFileUpload(e, 'gallery')} />
                        </Form.Group>

                    </Modal.Body>
                </Modal>
            </Container>

        )
    }
}

export default NewTrip;
