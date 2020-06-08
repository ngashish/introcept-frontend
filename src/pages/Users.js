import React from 'react';
import { connect } from 'react-redux';
import { Row, Form, Container, Button, Modal, InputGroup } from 'react-bootstrap';
import './Pokemon.css';
import { userAction } from '../action';
import ReactTable from 'react-table';
import './datatable.css';
import { FaUserEdit, FaTrash, FaUserPlus } from 'react-icons/fa';

class Users extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            columns: [{
                Header: "Name",
                accessor: "Name"
            }, {
                Header: "Gender",
                accessor: "Gender"
            }, {
                Header: "Phone",
                accessor: "Phone"
            }, {
                Header: "Email",
                accessor: 'Email'
            }, {
                Header: "Nationality",
                accessor: "Nationality"
            }, {
                Header: "Date_of_birth",
                accessor: "Date_of_birth"
            }, {
                Header: "Education_background",
                accessor: "Education_background"
            }, {
                Header: "Preferred_mode_of_contact",
                accessor: "Preferred_mode_of_contact"
            }, {
                Header: "Action",
                Cell: props => <div style={{ paddingLeft: '30px' }}>
                    <FaUserEdit style={{ marginRight: '10px ' }} onClick={this.editUser.bind(this, props)} />
                    <FaTrash onClick={this.deleteUser.bind(this, props)} />
                </div>
            }],
            users: [],
            filteredUsers: [],
            loading: false,
            showModal: false,
            formData: {
                name: '',
                gender: '',
                email: '',
                phone: '',
                nationality: '',
                dob: new Date(),
                educationBackground: '',
                prefferdModeOfContact: ''
            },
            modalName: '',
            isEditOn: false
        }
    }
    componentDidMount = () => {
        this.getUserList();
    }
    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.userList !== undefined) {
            if (prevState.users.toString() !== nextProps.userList.toString()) {
                return {
                    users: nextProps.userList,
                    filteredUsers: nextProps.userList
                }
            } else {
                return {
                    users: nextProps.userList,
                    filteredUsers: nextProps.userList
                }
            }
        }
        return {
            loading: false,
            users: prevState.users
        }
    }
    modifyObject = (user) => {
        return {
            name: user.Name,
            gender: user.Gender,
            email: user.Email,
            phone: user.Phone,
            nationality: user.Nationality,
            dob: user.Date_of_birth,
            educationBackground: user.Education_background,
            prefferdModeOfContact: user.Preferred_mode_of_contact
        }
    }
    getUserList = () => {
        this.props.getUserList();
    }
    editUser = (user) => {
        let { formData } = this.state;
        formData = this.modifyObject(user.original);
        this.setState({
            showModal: true,
            formData,
            modalName: "Edit",
            isEditOn: true,
        }, () => { console.log(this.state.formData) });

    }
    deleteUser = (user) => {
        console.log('delete :', user);
        this.props.deleteUser(user.index + 1);
        this.getUserList();
    }
    addUser = () => {
        this.setState({
            showModal: true,
            modalName: 'Add',
        });
    }
    closeModal = () => {
        this.setState({
            showModal: false
        });
    }
    handleChange = (value, formattedValue) => {
        this.setState({
            date: value,
        });
    }
    onInputchange = (e) => {
        const { formData } = this.state;
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value
        this.setState({ formData });
    }
    onRadiochange = (e) => {
        console.log(e.target.name, e.target.checked, e.target.value);
        const { formData } = this.state;
        const key = e.target.name;
        const value = e.target.value;
        formData[key] = value;
        this.setState({ formData });
    }
    checkValidation = ({ formData }) => {
        let invalidFlag = false
        console.log(formData)
        for (let key in formData) {
            if (formData[key] === '' || formData[key] === null) {
                invalidFlag = true;
                break;
            }
        }
        return invalidFlag;
    }
    submit = () => {
        const formFlag = this.checkValidation(this.state);
        if (formFlag) {
            alert("All fields are required");
        } else {
            const { formData } = this.state;
            if (this.state.isEditOn) {
                this.props.updateUser(formData)
                this.setState({
                    showModal: false,
                    isEditOn: false
                }, () => {
                    this.getUserList();
                });
            } else {
                this.props.addUser(formData);
                this.setState({
                    showModal: false,
                    isEditOn: false
                }, () => {
                    this.getUserList();
                });
            }
        }
    }
    render() {
        return <div className="list-page">
            <Container >
                <Row>
                    <h1>Pokedex.org</h1>
                    <br></br>
                </Row>
                <Row className="button-row">
                    <Button variant="primary" onClick={this.addUser}>
                        <FaUserPlus></FaUserPlus> Add User
                            </Button>
                </Row>
                {this.state.users && this.state.users.length > 0 ? (
                    <React.Fragment>
                        <Row>
                            <ReactTable
                                data={this.state.users}
                                columns={this.state.columns}
                                defaultPageSize={5}
                                resizable={false}
                            />
                        </Row>
                    </React.Fragment>
                ) : (
                        <Row style={{ textAlign: 'center' }}>
                            Data not Available
                        </Row>
                    )}
                <Row>
                </Row>
                <Modal
                    size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered
                    show={this.state.showModal}
                >
                    <Modal.Header>
                        <Modal.Title id="contained-modal-title-vcenter">
                            {this.state.modalName}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Name  </Form.Label>
                                <Form.Control
                                    name='name'
                                    value={this.state.formData.name}
                                    onChange={this.onInputchange}
                                    type="text" placeholder="Name"
                                    required
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Email  </Form.Label>
                                <Form.Control
                                    name='email'
                                    value={this.state.formData.email}
                                    onChange={this.onInputchange}
                                    type="email" placeholder="email"
                                    required
                                    disabled={this.state.isEditOn ? true : false}
                                />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Gender  </Form.Label>
                                <Form.Check
                                    type={'radio'}
                                    label={'Male'}
                                    name={'gender'}
                                    value={this.state.isEditOn === false ? 'male' : this.state.formData.gender}
                                    id={`disabled-default-radio`}
                                    required={true}
                                    checked={this.state.formData.gender === 'male' ? true : false}
                                    onChange={this.onInputchange}
                                />
                                <Form.Check
                                    type={'radio'}
                                    label={'Female'}
                                    name={'gender'}
                                    value={this.state.isEditOn === false ? 'female' : this.state.formData.gender}
                                    id={`disabled-default-radio`}
                                    required={true}
                                    checked={this.state.formData.gender === 'female' ? true : false}
                                    onChange={this.onInputchange}
                                />
                            </Form.Group>
                            <label htmlFor="basic-url">Phone </label>
                            <InputGroup className="mb-3">
                                <InputGroup.Prepend>
                                    <InputGroup.Text id="basic-addon3">
                                        +91
                                    </InputGroup.Text>
                                </InputGroup.Prepend>
                                <Form.Control
                                    type='text'
                                    name='phone'
                                    value={this.state.formData.phone}
                                    maxLength="10" id="basic-url" aria-describedby="basic-addon3"
                                    required={true}
                                    onChange={this.onInputchange} />
                            </InputGroup>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Nationality  </Form.Label>
                                <Form.Control type="text"
                                    name='nationality'
                                    value={this.state.formData.nationality}
                                    placeholder="Nationality"
                                    required={true}
                                    onChange={this.onInputchange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Date of Birth  </Form.Label>
                                <Form.Control
                                    type="date"
                                    name='dob'
                                    onChange={this.onInputchange}
                                    value={this.state.formData.dob} required={true} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Educational Background  </Form.Label>
                                <Form.Control type="text"
                                    name='educationBackground'
                                    value={this.state.formData.educationBackground}
                                    placeholder="Educational Background"
                                    required={true}
                                    onChange={this.onInputchange} />
                            </Form.Group>
                            <Form.Group controlId="formBasicEmail">
                                <Form.Label>Preffered  </Form.Label>
                                <Form.Check
                                    type={'radio'}
                                    label={'Email'}
                                    name={'prefferdModeOfContact'}
                                    value={this.state.isEditOn === false ? 'email' : this.state.formData.prefferdModeOfContact}
                                    id={`disabled-default-radio`}
                                    checked={this.state.formData.prefferdModeOfContact === 'email' ? true : false}
                                    onChange={this.onInputchange}
                                />
                                <Form.Check
                                    type={'radio'}
                                    label={'Phone'}
                                    name={'prefferdModeOfContact'}
                                    value={this.state.isEditOn === false ? 'phone' : this.state.formData.prefferdModeOfContact}
                                    id={`disabled-default-radio`}
                                    required={true}
                                    checked={this.state.formData.prefferdModeOfContact === 'phone' ? true : false}
                                    onChange={this.onInputchange}
                                />
                                <Form.Check
                                    type={'radio'}
                                    label={'None'}
                                    name={'prefferdModeOfContact'}
                                    value={this.state.isEditOn === false ? 'none' : this.state.formData.prefferdModeOfContact}
                                    id={`disabled-default-radio`}
                                    checked={this.state.formData.prefferdModeOfContact === 'none' ? true : false}
                                    required={true}
                                    onChange={this.onInputchange}
                                />
                            </Form.Group>
                            <Row style={{ display: 'flex', flexDirection: 'row-reverse' }}>
                                <Button onClick={this.closeModal} style={{ marginRight: '15px' }}>Close</Button>
                                <Button variant="primary" type="button" style={{ marginRight: '5px' }} onClick={this.submit}>
                                    Submit
                                </Button>
                            </Row>
                        </Form>
                    </Modal.Body>
                </Modal>
            </Container>
        </div>
    }
}

function mapState(state) {
    console.log('state :', state)
    const { users: { userList, userAdd, userUpdate, userDelete } } = state;
    return { userList, userAdd, userUpdate, userDelete };
}

const actionCreator = {
    getUserList: userAction.listUser,
    addUser: userAction.addUser,
    updateUser: userAction.updateUser,
    deleteUser: userAction.deleteUser
}

const connectedPage = connect(mapState, actionCreator)(Users);

export { connectedPage as Users };
