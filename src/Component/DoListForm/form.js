import React , {Component}  from "react";
import {Button , Modal, Container , FormControl , FormLabel , Col, FormGroup, FormCheck }  from "react-bootstrap";
import { ToastContainer } from "react-toastify";


// to reflesh page   => window.location.reload

class Form extends Component {

    render() { 
        const { List ,ListType, showForm, handleCloseForm,handleListChange , handleCheckBox , handle_Add_style_form ,  handle_del_style_form, handleSubmit
        } = this.props; 

        const NewList =  {...List};
        return(
            <React.Fragment>
                <Container>
                    <ToastContainer/>
                    <Modal show={showForm} onHide={handleCloseForm} >
                        
                        <Modal.Header closeButton>
                            <Modal.Title> {ListType} </Modal.Title>
                        </Modal.Header>
                        {
                            ListType!=='Notes'
                            ?
                            <Modal.Body>
                                <div className="form" onSubmit={handleSubmit}>
                                    <FormLabel htmlFor="listtype">  List Type :    </FormLabel>
                                    <FormGroup as="row">
                                        <Col md={9} xs="10">
                                            <FormControl type="text" className="mb-4" id="listtype" size="sm" name="Label"
                                                value    = {NewList.Label}
                                                onChange = {handleListChange}
                                                onFocus  = {handle_Add_style_form}
                                                onBlur   = {handle_del_style_form}
                                            /> 
                                        </Col>
                                        
                                    </FormGroup>

                                    <FormLabel htmlFor="subjectList">  Subject Of List:    </FormLabel>
                                    <FormGroup as="row">
                                        <Col md={9} xs="10">
                                            <FormControl as="textarea" rows={3} className="my-2 mb-4" id="subjectList" size="sm" name="Subject"
                                                value={NewList.Subject}
                                                onChange={handleListChange}
                                                onFocus = {handle_Add_style_form}
                                                onBlur = {handle_del_style_form}
                                        /> 
                                        </Col>
                                    </FormGroup>
                                    
                                    <FormLabel>  Level :    </FormLabel>
                                    {
                                        ['High','Medium' , 'Small'].map(item=>(
                                            <FormCheck 
                                                type="checkbox"
                                                id={item}
                                                label={item}
                                                className="mx-3"
                                                name="Level"
                                                value = {NewList.Level}
                                                onChange={handleCheckBox}
                                                key={item}
                                            />
                                        ))

                                        
                                    }
                                    
                                </div>
                                
                            </Modal.Body>
                            :
                            <Modal.Body>
                                <div className="form" onSubmit={handleSubmit} >
                                    <FormLabel>  Subject Of Notes:    </FormLabel>
                                    <FormGroup as="row">
                                        <Col md={9} xs="10">
                                            <FormControl as="textarea" rows={3}
                                                        className="my-2 mb-4" size="sm" onChange={handleListChange}
                                                        name= "NotesText"
                                                        value={NewList.NotesText}
                                                        onFocus = {handle_Add_style_form}
                                                        onBlur = {handle_del_style_form}
                                            /> 
                                        </Col>
                                    </FormGroup>
                                </div>
                            
                            </Modal.Body>
                        }
                        
                        <Modal.Footer>
                            <Button variant="success" onClick={handleSubmit} name={ListType}>
                                Submit
                            </Button>
                            <Button variant="secondary" onClick={handleCloseForm}>
                                Close
                            </Button>
                        </Modal.Footer>
                    </Modal>

                </Container>
            </React.Fragment>
        );
    }
}


export default Form;